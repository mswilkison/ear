var uploader = new Slingshot.Upload("profilePictureUploads");

Template.profileEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var profilePicture = $(e.target).find('[name=profilePicture]')[0].files[0];
    var fullName = $(e.target).find('[name=fullName]').val();
    var organization = $(e.target).find('[name=organization]').val();

    if (profilePicture) {
      uploader.send(profilePicture, function(error, downloadUrl) {
        Meteor.users.update(Meteor.userId(), {$set: {"profile.picture": downloadUrl}});
      });
    }

    Meteor.users.update(Meteor.userId(), {$set: {"profile.fullName": fullName,
                                                 "profile.organization": organization}});
    Router.go('dashboard');
  }
});
