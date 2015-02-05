Cessions = new Mongo.Collection('cessions');

Cessions.allow({
  update: function(userId, cession) { return ownsDocument(userId, cession); }
});

Cessions.deny({
  update: function(userId, cession, fieldNames) {
    // prohibit edits to fields other than `cessionStatus` and `updateDescription`
    return(_.without(fieldNames, 'cessionStatus', 'updateDescription').length > 0);
  }
});

Meteor.methods({
  cessionInsert: function(cessionAttributes) {
    check(Meteor.userId(), String);
    check(cessionAttributes, {
      regNumber: String,
      assetClass: String,
      cessionType: String,
      cessionDate: String,
      amountAgainst: String,
      inputFile: Match.Any,
      assetDescription: String
    });

    var user = Meteor.user();
    var cession = _.extend(cessionAttributes, {
      userId: user._id,
      author: user.emails[0].address,
      submitted: new Date()
    });
    var cessionId = Cessions.insert(cession);
    return {
      _id: cessionId
    };
  }
});
