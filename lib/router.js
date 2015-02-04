Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('cessions'); }

});

Router.route('/', {name: 'cessionsList'});
