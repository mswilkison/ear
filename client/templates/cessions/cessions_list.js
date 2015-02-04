Template.cessionsList.helpers({
  cessions: function() {
    return Cessions.find({}, {sort: {submitted: -1}});
  }
});
