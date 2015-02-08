Cessions = new Mongo.Collection('cessions');

Cessions.allow({
  update: function(userId, cession) { return ownsDocument(userId, cession); }
});

Cessions.deny({
  update: function(userId, cession, fieldNames) {
    // prohibit edits to fields other than `inputFile`
    return(_.without(fieldNames, 'inputFile').length > 0);
  }
});

Meteor.methods({
  cessionInsert: function(cessionAttributes) {
    check(Meteor.userId(), String);
    check(cessionAttributes, {
      title: String,
      assetClass: String,
      cessionType: String,
      cessionDate: String,
      amountAgainst: String,
      inputFile: Match.Any,
      assetDescription: String,
      cessionStatus: String
    });

    var errors = validateCession(cessionAttributes);
    if (errors.title || errors.assetClass || errors.cessionType ||
        errors.cessionDate || errors.amountAgainst) {
      throw new Meteor.Error('invalid-cession', "You must fill in the required fields to create a new cession");
    }

    var user = Meteor.user();
    var cession = _.extend(cessionAttributes, {
      userId: user._id,
      author: user.emails[0].address,
      organization: user.profile.organization,
      submitted: new Date()
    });

    var cessionId = Cessions.insert(cession);
    cession = Cessions.findOne(cessionId);

    // this.unblock();
    var bit_cession = new BitCession(cession);
    bit_cession.encode();
    var tx = bit_cession.prepare_tx();
    var txid = pushBitcoinTx(tx);

    Cessions.update(cessionId, {$push: {txid: txid}});

    return {
      _id: cessionId
    };
  },

  cessionUpdate: function(cessionAttributes) {
    check(cessionAttributes, {
      cessionStatus: String,
      inputFile: Match.Any,
      updateDescription: String,
      cessionId: String
    });

    var user = Meteor.user();
    var cessionUpdate = _.extend(cessionAttributes, {
      userId: user._id,
      submitted: new Date()
    });

    Cessions.update(cessionAttributes.cessionId, {$push: {updates: cessionUpdate}});

    var bit_cession = new BitCession(cessionUpdate);
    bit_cession.encode_update();
    var tx = bit_cession.prepare_tx();
    var txid = pushBitcoinTx(tx);

    Cessions.update(cessionAttributes.cessionId, {$push: {txid: txid}});

    return {
      _id: cessionAttributes.cessionId
    };
  }
});

validateCession = function(cession) {
  var errors = {};
  if (!cession.title)
    errors.title = "Please fill in a title";
  if (!cession.assetClass)
    errors.assetClass = "Please select an asset class";
  if (!cession.cessionType)
    errors.cessionType = "Please select a cession type";
  if (!cession.cessionDate)
    errors.cessionDate = "Please select the date the cession was created";
  if (!cession.amountAgainst)
    errors.amountAgainst = "Please fill in the amount against the cession";
  if (!cession.cessionStatus)
    errors.cessionStatus = "Please set the cession's status";
  if (!cession.updateDescription)
    errors.updateDescription = "Please describe the reason for the cession update";
  return errors;
};
