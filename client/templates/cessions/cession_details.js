Template.cessionDetails.helpers({
  ownCession: function() {
    return this.organization === Meteor.user().profile.organization;
  },

  cessionStatusColor: function() {
    if (this.cessionStatus === "Active") {
      return "label-primary";
    } else if (this.cessionStatus === "Cancelled") {
      return "label-danger";
    }
  },

  elideTxid: function(txid) {
    return txid.substr(0, 6) + '...';
  }
});
