// Problems
Problems = new Meteor.Collection("problems");

// Router
Router.configure({
    layoutTemplate: 'layout'
});
   
Router.route('/', {name: 'submitProblem'});

Router.route('/problems', {name: 'problemsAll'});

Router.route('/problems/:_id', {
    name: 'problemPage',
    data: function() { return Problems.findOne(this.params._id); }
  });