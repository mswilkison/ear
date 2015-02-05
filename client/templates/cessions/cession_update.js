Template.cessionUpdate.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentCessionId = this._id;

    var cessionProperties = {
      cessionStatus: $(e.target).find('[name=statusRadios]').val(),
      updateDescription: $(e.target).find('[name=updateDescription]').val()
    };

    Cessions.update(currentCessionId, {$set: cessionProperties}, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go('cessionPage', {_id: currentCessionId});
      }
    });
  }
});



