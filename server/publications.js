Meteor.publish('cessions', function() {
  return Cessions.find();
});
