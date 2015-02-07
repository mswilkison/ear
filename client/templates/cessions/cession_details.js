Template.cessionDetails.helpers({
  ownCession: function() {
    return this.userId === Meteor.userId();
  },

  cessionStatusColor: function() {
    if (this.cessionStatus === "Active") {
      return "label-success";
    } else if (this.cessionStatus === "Late") {
      return "label-warning";
    } else if (this.cessionStatus === "Default") {
      return "label-danger";
    } else {
      return "label-default";
    }
  },

  elideTxid: function(txid) {
    return txid.substr(0, 6) + '...';
  }
});
