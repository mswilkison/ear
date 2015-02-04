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
