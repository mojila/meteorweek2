import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  yakInsert: function(yak) {
    var postId = Yaks.insert({
      yak : yak, 
      score : 1,
      submitted : new Date()
    });
  }
});