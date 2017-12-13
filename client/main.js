import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.yaksList.helpers({
  yaks: function() {
    return Yaks.find();
  }
});

Template.yaksSubmit.events({
  'submit .yaksSubmitForm': function(event) {

    event.preventDefault();
    var yak = event.target.yak.value; // get yak value

    // check if the value is empty
    if (yak == "") {
      alert("You can’t insert empty yak. Try to write something funny instead.");
    } else {
      Meteor.call('yakInsert', yak);
      Router.go('yaksList');
    }
  }
});

Template.yakItem.events({
  'click a.yes':function(event) {
    var yakId = this._id;
    if(Meteor.user()) {
      var postId = Yaks.findOne({_id: this._id})
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        return "Voted";
      } else {
        Yaks.update(yakId, {$inc: {'score': 1 }});
        Yaks.update(yakId, {$addToSet: {voted : Meteor.userId()}});
      } 
   }
  },
  'click a.no':function(event) {
    var yakId = this._id;
    if (Meteor.user()) {
      var postId = Yaks.findOne({_id:this._id})
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        return "Ok";
      } else {
        Yaks.update(yakId, {$inc: {'score': -1 }});
        Yaks.update(yakId, {$addToSet: {voted : Meteor.userId()}});
        if (postId.score <= -3) {
          Yaks.remove({_id:this._id})
        }
      }
    }
  }
});

Template.yaksList.helpers({
  yaks: function() {
  return Yaks.find({}, {sort : {score: -1}});
  }
});

Template.yakPage.helpers({
  comments: function() {
    return Comments.find({postId:this._id});
  }
});

Template.yakItem.helpers({
  commentsCount: function() {
    return Comments.find({postId:this._id}).count();
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id,
      submitted: new Date()
    };

    var commentBody = e.target.body.value;
    // Check if the comment is not empty
    if (commentBody == "") {
      alert("You can’t insert empty comment. Try to comment something nice instead.")
    } else {
      Meteor.call('commentInsert', comment);
    }

    // clear input field
    e.target.body.value = "";
  }
});