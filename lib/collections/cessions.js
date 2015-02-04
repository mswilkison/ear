Cessions = new Mongo.Collection('cessions');

Cessions.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});
