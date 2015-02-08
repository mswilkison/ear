var uploader = new Slingshot.Upload("cessionDocumentUploads");

Template.cessionSubmit.rendered = function() {
  $('#cessionDate').pickadate({
    format: 'mm/dd/yyyy'
  });
};

Template.cessionSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var cession = {
      title: $(e.target).find('[name=title]').val(),
      assetClass: $(e.target).find('[name=assetClass]').val(),
      cessionType: $(e.target).find('[name=cessionType]').val(),
      cessionDate: $(e.target).find('[name=cessionDate]').val(),
      amountAgainst: $(e.target).find('[name=amountAgainst]').val(),
      inputFile: $(e.target).find('[name=inputFile]')[0].files[0],
      assetDescription: $(e.target).find('[name=assetDescription]').val(),
      cessionStatus: "Active"
    };

    var errors = validateCession(cession);
    if (errors.title || errors.assetClass || errors.cessionType ||
        errors.cessionDate || errors.amountAgainst) {
      return Session.set('cessionSubmitErrors', errors);
    }

    Meteor.call('cessionInsert', cession, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }
      if (cession.inputFile) {
        uploader.send(cession.inputFile, function(error, downloadUrl) {
          console.log(error);
          Cessions.update(result._id, {$set: {"inputFile": downloadUrl}});
        });
      }

      Router.go('cessionPage', {_id: result._id});
    });
  }
});

Template.cessionSubmit.created = function() {
  Session.set('cessionSubmitErrors', {});
};

Template.cessionSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('cessionSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('cessionSubmitErrors')[field] ? 'has-error' : '';
  }
});
