Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('cessions'); }
});

Router.route('/', {name: 'home'});

Router.route('/registry', {name: 'cessionsList'});

Router.route('/registry/:_id', {
  name: 'cessionPage',
  data: function() { 
    console.log(this.params._id);
    console.log(Cessions.findOne(this.params._id));
    return Cessions.findOne(this.params._id); }
});

Router.route('/registry/:_id/update', {
  name: 'cessionUpdate',
  data: function() { return Cessions.findOne(this.params._id); }
});

Router.route('/create', {name: 'cessionSubmit'});

Router.route('/dashboard', {name: 'dashboard'});

Router.route('/profile', {name: 'profileEdit'});

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

// Router.onBeforeAction('dataNotFound', {only: 'cessionPage'});
Router.onBeforeAction(requireLogin, {only: 'cessionSubmit'});
