Template.cessionSubmit.rendered = function() {
  $('#cessionDate').datepicker();
};

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

    var errors = validateCession(cession);
    if (errors.regNumber || errors.assetClass || errors.cessionType ||
        errors.cessionDate || errors.amountAgainst) {
      return Session.set('cessionSubmitErrors', errors);
    }

    Meteor.call('cessionInsert', cession, function(error, result) {
      if (error) {
        return throwError(error.reason);
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
