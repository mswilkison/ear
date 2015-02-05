Template.cessionUpdate.created = function() {
  Session.set('cessionUpdateErrors', {});
};
Template.cessionUpdate.helpers({
  errorMessage: function(field) {
    return Session.get('cessionUpdateErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('cessionUpdateErrors')[field] ? 'has-error' : '';
  }
});

Template.cessionUpdate.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentCessionId = this._id;

    var cessionProperties = {
      cessionStatus: $(e.target).find('[name=statusRadios]:checked').val(),
      updateDescription: $(e.target).find('[name=updateDescription]').val()
    };

    var errors = validateCession(cessionProperties);
    if (errors.cessionStatus || errors.updateDescription) {
      return Session.set('cessionUpdateErrors', errors);
    }

    Cessions.update(currentCessionId, {$set: cessionProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('cessionPage', {_id: currentCessionId});
      }
    });
  }
});



