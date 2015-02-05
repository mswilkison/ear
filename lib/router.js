Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('cessions'); }

});


Router.route('/registry', {name: 'cessionsList'});

Router.route('/cessions/:_id', {
  name: 'cessionPage',
  data: function() { return Cessions.findOne(this.params._id); }
});

Router.route('/cessions/:_id/update', {
  name: 'cessionUpdate',
  data: function() { return Cessions.findOne(this.params._id); }
});

Router.route('/create', {name: 'cessionSubmit'});

Router.route('/dashboard', {name: 'dashboard'});

Router.route('/profile', {name: 'profile'});

var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'cessionPage'});
Router.onBeforeAction(requireLogin, {only: 'cessionSubmit'});
