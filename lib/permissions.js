// check that user owns the document
ownsDocument = function(userId, doc) {
  return doc && doc.organization === Meteor.users.findOne(userId).profile.organization;
};
