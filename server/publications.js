Meteor.publish('cessions', function(cessionCursor) {
  return Cessions.find({}, {limit: 20, skip: cessionCursor});
});
