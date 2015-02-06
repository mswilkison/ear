var uploader = new Slingshot.Upload("profilePictureUploads");

Template.profileEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var profilePicture = $(e.target).find('[name=profilePicture]')[0].files[0];
    var firstName = $(e.target).find('[name=firstName]').val();
    var surname = $(e.target).find('[name=surname]').val();
    var organization = $(e.target).find('[name=organization]').val();

    if (profilePicture) {
      uploader.send(profilePicture, function(error, downloadUrl) {
        Meteor.users.update(Meteor.userId(), {$set: {"profile.picture": downloadUrl}});
      });
    }

    Meteor.users.update(Meteor.userId(), {$set: {"profile.firstName": firstName,
                                                 "profile.surname": surname,
                                                 "profile.organization": organization}});
  }
});
