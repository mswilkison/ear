Template.cessionDetails.helpers({
  ownCession: function() {
    return this.userId === Meteor.userId();
  },

  cessionStatusColor: function() {
    if (this.cessionStatus === "Active") {
      return "label-success";
    } else if (this.cessionStatus === "Cancelled") {
      return "label-danger";
    }
  },

  elideTxid: function(txid) {
    return txid.substr(0, 6) + '...';
  }
});
