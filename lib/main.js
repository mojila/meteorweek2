import { Mongo } from 'meteor/mongo';
import { Router } from 'meteor/iron:router';

Yaks = new Mongo.Collection('yaks');

Router.route('/', {name: 'yaksList'});
Router.route('/submit', {name: 'yaksSubmit'});
Router.route('/login', {name: 'accounts'});