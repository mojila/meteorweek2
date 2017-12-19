import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

// Method
Meteor.methods({
  insertProblem: function(post) {
    var postId = Problems.insert(post);

    return {
      _id: postId
    };
  }
});