if (Cessions.find().count() === 0) {

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
      userId: '1',
      author: 'MacLane Wilkison', 
      organization: 'Contractual',
      submitted: new Date()
    });
  }

    
}
