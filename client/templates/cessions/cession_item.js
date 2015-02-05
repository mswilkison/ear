Template.cessionItem.helpers({
  ownCession: function() {
    return this.userId === Meteor.userId();
  }
});
