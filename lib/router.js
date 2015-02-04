Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('cessions'); }

});

Router.route('/', {name: 'cessionsList'});
Router.route('/cessions/:_id', {
  name: 'cessionPage',
  data: function() { return Cessions.findOne(this.params._id); }
});
