Session.setDefault('cessionCursor', 0);
Meteor.autorun(function() {
  Meteor.subscribe("cessions", Session.get('cessionCursor'));
});

Template.cessionsList.helpers({
  cessions: function() {
    return Cessions.find({}, {sort: {submitted: -1}});
  }
});
