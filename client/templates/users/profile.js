var uploader = new Slingshot.Upload("profilePictureUploads");

Template.profile.events({
  'submit form': function(e) {
    e.preventDefault();

    var profilePicture = $(e.target).find('[name=profilePicture]')[0].files[0];

    uploader.send(profilePicture, function(error, downloadUrl) {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.picture": downloadUrl}});
    });
  }
});

Template.myPicture.helpers({
  url: function() {
    return this.uploader.url(true);
  }
});
