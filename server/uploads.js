Slingshot.createDirective("profilePictureUploads", Slingshot.S3Storage, {
  bucket: "electronic-asset-registry",

  acl: "public-read",

  authorize: function() {
    // Deny upload if user is not logged in
    if (!this.userId) {
      var message = "Please login before uploading files";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },

  key: function(file) {
    // Store file into a directory by the user's id
    return this.userId + "/" + file.name;
  }
});
