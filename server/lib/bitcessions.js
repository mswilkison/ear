btc_config = {
    compressed: true,
    network_type: "testnet",
    insight_api: "test-insight.bitpay.com",
    addr: "n1yg6TMcnxetzkpfFbbpPcUoBmBTMEoRSz",
    private_key: "ef9e018449bd4997932dd6e0ceb899cad5611132d67d1fd28c8f2a8d1f95db5c2c01"  // Test! It should be private or someone will steal our  precious testnet coins XXX
}

var bitcore = Npm.require('bitcore');
var Buffer = bitcore.deps.Buffer;
var sha256 = bitcore.crypto.Hash.sha256;

var getUtxo = function getUtxo(addr) {
    var url = "https://" + btc_config.insight_api + "/api/addr/" + addr + "/utxo";
    var result = HTTP.get(url);
    if (result.statusCode == 200) {
        return JSON.parse(result.content);
    } else {
        throw new Meteor.Error("Cannot get data from insight API");
    }
}

pushBitcoinTx = function pushBitcoinTx(tx) {
    var url = "https://" + btc_config.insight_api + "/api/tx/send"
    var result = HTTP.post(url, {data: {
        rawtx: tx
    }});
    if (result.statusCode == 200) {
        var data = JSON.parse(result.content);
        if (data.txid) {
            return data.txid;
        } else {
            throw new Meteor.Error("Undefined response from insight API");
        }
    } else {
        throw new Meteor.Error("Cannot get data from insight API");
    }
}

// Cessions to be recorded on blockchain
BitCession = function BitCession(cession) {
    this.cession = cession;
    this.fee = 0.0001;
}

BitCession.prototype.encode = function() {
    var signature = new Buffer("xEAR");   // 4 bytes
    var b_id = new Buffer(this.cession._id);
    var hash = sha256(new Buffer(JSON.stringify(this.cession))); // hash 32 bytes
    this.pending_data = Buffer.concat([signature, b_id, hash]);
}

BitCession.prototype.encode_update = function() {
    var signature = new Buffer("xEAR");   // 4 bytes
    var b_id = new Buffer(this.cession.cessionId);
    var hash = sha256(new Buffer(JSON.stringify(this.cession.updateDescription))); // hash 32 bytes
    this.pending_data = Buffer.concat([signature, b_id, hash]);
}

BitCession.prototype.prepare_tx = function(raw_json) {
    var utxos = getUtxo(btc_config.addr);
    var total = 0;
    for (var i=0; i<utxos.length; i++) {
        total += Math.round(utxos[i].amount * 1e8);
    }
    if (total < this.fee * 1e8) {
        throw new Meteor.Error("Not enough money");
    }
    var tx = new bitcore.Transaction()
      .from(utxos, btc_config.addr)
      .to(btc_config.addr, total - this.fee*1e8)
      .addData(this.pending_data)
      .sign(new Buffer(btc_config.private_key, "hex")).uncheckedSerialize();
    return tx;
}
