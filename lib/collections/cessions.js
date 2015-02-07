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

Cessions.deny({
  update: function(userId, cession, fieldNames, modifier) {
    var errors = validateCession(modifier.$set);
    return errors.cessionStatus || errors.updateDescription;
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
      assetDescription: String,
      cessionStatus: String
    });

    var errors = validateCession(cessionAttributes);
    if (errors.regNumber || errors.assetClass || errors.cessionType ||
        errors.cessionDate || errors.amountAgainst) {
      throw new Meteor.Error('invalid-cession', "You must fill in the required fields to create a new cession");
    }

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

validateCession = function(cession) {
  var errors = {};
  if (!cession.regNumber)
    errors.regNumber = "Please fill in a registration number";
  if (!cession.assetClass)
    errors.assetClass = "Please select an asset class";
  if (!cession.cessionType)
    errors.cessionType = "Please select a cession type";
  if (!cession.cessionDate)
    errors.cessionDate = "Please select the date the cession was created";
  if (!cession.amountAgainst)
    errors.amountAgainst = "Please fill in the amount against the cession";
  if (!cession.cessionStatus)
    errors.cessionStatus = "Please set the cession's status";
  if (!cession.updateDescription)
    errors.updateDescription = "Please describe the reason for the cession update";
  return errors;
};
