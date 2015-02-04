Template.cessionSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var cession = {
      regNumber: $(e.target).find('[name=regNumber]').val(),
      assetClass: $(e.target).find('[name=assetClass]').val(),
      cessionType: $(e.target).find('[name=cessionType]').val(),
      cessionDate: $(e.target).find('[name=cessionDate]').val(),
      amountAgainst: $(e.target).find('[name=amountAgainst]').val(),
      inputFile: $(e.target).find('[name=inputFile]').val(),
      assetDescription: $(e.target).find('[name=assetDescription]').val()
    };

    cession._id = Cessions.insert(cession);
    Router.go('cessionPage', cession);
  }
});