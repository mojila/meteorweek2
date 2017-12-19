import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.problemsAll.helpers({
  problems: function() {
    return Problems.find();
  }
});

Template.submitProblem.helpers({
  problem: function() {
    return Session.get("problem");
  },
  why1: function() {
    return Session.get("why1");
  },
  why2: function() {
    return Session.get("why2");
  },
  why3: function() {
    return Session.get("why3");
  },
  why4: function() {
    return Session.get("why4");
  },
  why5: function() {
    return Session.get("why5");
  }
});

Template.submitProblem.events({
  'submit form':function(event) {
    event.preventDefault();
    
    var post = {
      postProblem: $(event.target).find('[name=problem]').val(),
      postWhy1: $(event.target).find('[name=why1]').val(),
      postWhy2: $(event.target).find('[name=why2]').val(),
      postWhy3: $(event.target).find('[name=why3]').val(),
      postWhy4: $(event.target).find('[name=why4]').val(),
      postWhy5: $(event.target).find('[name=why5]').val(),
      postSolution:$(event.target).find('[name=solution]').val(),
      submitted: new Date()
    };
    
    var solutionValue = event.target.solution.value;
    if (solutionValue != '') {
      Meteor.call('insertProblem', post, function(error,result) {
        // Only when we don't get empty object 
        if(!error){
          Router.go('problemPage', result);
        }
      });
    }
  },
  'keyup input#problem':function(event) {
    Session.set("problem", event.target.value);
  },
  'keyup input#why1':function(event) {
    Session.set("why1", event.target.value);
  },
  'keyup input#why2':function(event) {
    Session.set("why2", event.target.value);
  },
  'keyup input#why3':function(event) {
    Session.set("why3", event.target.value);
  },
  'keyup input#why4':function(event) {
    Session.set("why4", event.target.value);
  },
  'keyup input#why5':function(event) {
    Session.set("why5", event.target.value);
   },
  'click .route':function() {
    if (problem.value != '') { 
      //magic effect
      $('.part2').addClass('magictime swashIn');
      //show/hide items with removeClass()/addClass() 
      $('#submit-problem').addClass('hidden');
      $('#submit-why1').removeClass('hidden');
    } else {
      alert("You need to enter problem");
    }
  },

  'click .answer1':function() {
    if (why1.value != '') { 
      //magic effect
      $('.part3').addClass('magictime swashIn');
      //show/hide items with removeClass()/addClass()
      $('#submit-why1').addClass('hidden');
      $('#submit-why2').removeClass('hidden');
    } else {
      alert("You need to answer why is it problem");
    }
  },

  'click .answer2':function() {
    if (why2.value != '') {
      $('.part4').addClass('magictime swashIn');
      //show/hide items with removeClass()/addClass()
      $('#submit-why2').addClass('hidden');
      $('#submit-why3').removeClass('hidden');
    } else {
      alert("You need to answer why is it problem");
    }
  },

  'click .answer3':function() {
    if (why3.value != '') {
      $('.part5').addClass('magictime swashIn');
      //show/hide items with removeClass()/addClass()
      $('#submit-why3').addClass('hidden');
      $('#submit-why4').removeClass('hidden');
    } else {
      alert("You need to answer why is it problem");
    }
  },

  'click .answer4':function() {
    if (why4.value != '') {
      $('.part6').addClass('magictime swashIn');
      //show/hide items with removeClass()/addClass()
      $('#submit-why4').addClass('hidden');
      $('#submit-why5').removeClass('hidden');
    } else {
      alert("You need to answer why is it problem");
    }
  },

  'click .answer5':function() {
    if (why5.value != '') {
      $('.part7').addClass('magictime swashIn');
      //show/hide items with removeClass()/addClass()
      $('#submit-why5').addClass('hidden');
      $('#submit-solution').removeClass('hidden');
    } else {
      alert("You need to answer why is it problem");
    }
  }
});