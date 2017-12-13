import { Mongo } from 'meteor/mongo';
import { Router } from 'meteor/iron:router';

Yaks = new Mongo.Collection('yaks');
Comments = new Mongo.Collection("comments");

Router.route('/', {name: 'yaksList'});
Router.route('/submit', {name: 'yaksSubmit'});
Router.route('/login', {name: 'accounts'});
Router.route('/yaks/:_id', {
    name: 'yakPage',
    data: function() {
        return Yaks.findOne(this.params._id);
    }
});