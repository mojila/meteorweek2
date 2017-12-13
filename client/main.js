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
    Yaks.update(yakId, {$inc: {'score': 1 }}); 
  },

  'click a.no':function(event) {
    var yakId = this._id;
    Yaks.update(yakId, {$inc: {'score': -1 }});
    var postId = Yaks.findOne({_id:this._id});
    if (postId.score <= -3) {
      Yaks.remove({_id:this._id})
    }
  }
});