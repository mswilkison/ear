var uploader = new Slingshot.Upload("cessionDocumentUploads");

Template.cessionUpdate.created = function() {
  Session.set('cessionUpdateErrors', {});
};
Template.cessionUpdate.helpers({
  errorMessage: function(field) {
    return Session.get('cessionUpdateErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('cessionUpdateErrors')[field] ? 'has-error' : '';
  },
  isSelected: function(value) {
    if (value === this.cessionStatus) {
      return "selected";
    }
  }
});

Template.cessionUpdate.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentCessionId = this._id;

    var cessionProperties = {
      cessionId: currentCessionId,
      cessionStatus: $(e.target).find('[name=cessionStatus]').val(),
      inputFile: $(e.target).find('[name=inputFile]')[0].files[0],
      updateDescription: $(e.target).find('[name=updateDescription]').val()
    };

    var errors = validateCession(cessionProperties);
    if (errors.cessionStatus || errors.updateDescription) {
      return Session.set('cessionUpdateErrors', errors);
    }

    Meteor.call('cessionUpdate', cessionProperties, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }
      if (cessionProperties.inputFile) {
        uploader.send(cessionProperties.inputFile, function(error, downloadUrl) {
          console.log(error);
          Cessions.update(result._id, {$push: {"inputFile": downloadUrl}});
        });
      }

      Router.go('cessionPage', {_id: result._id});
    });

    // Cessions.update(currentCessionId, {$set: cessionProperties}, function(error) {
    //   if (error) {
    //     throwError(error.reason);
    //   } else {
    //     Router.go('cessionPage', {_id: currentCessionId});
    //   }
    // });
  }
});



