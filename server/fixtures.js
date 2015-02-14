if (Cessions.find().count() === 0) {
  var tempId = Meteor.users.insert({
    profile: { fullName: 'MacLane Wilkison',
               organization: 'Contractual'}

  });

  var tempUser = Meteor.users.findOne(tempId);

  for (var i = 0; i < 30; i++) {
    Cessions.insert({
      title: 'Cession #' + i,
      assetClass: 'Inventory',
      cessionType: 'Pledge',
      cessionDate: '02/12/2015',
      amountAgainst: '100',
      inputFile: null,
      assetDescription: 'Lorem ipsum...',
      cessionStatus: 'Active',
      userId: tempUser._id,
      author: tempUser.profile.fullName,
      organization: tempUser.profile.organization,
      submitted: new Date()
    });
  }

    
}
