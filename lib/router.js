Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('cessions'); }

});

Router.route('/', {name: 'cessionsList'});

Router.route('/cessions/:_id', {
  name: 'cessionPage',
  data: function() { return Cessions.findOne(this.params._id); }
});

Router.route('/submit', {name: 'cessionSubmit'});

Router.onBeforeAction('dataNotFound', {only: 'cessionPage'});
