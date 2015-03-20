/**
* Email.js
*
* @description :: Model for sending emails via <chosen api>
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // Connection to mandrill
  connections: ['my favorite mandrill account'],

  attributes: {
  //Model attributes
  createdAt: {
    type: 'datetime',
    defaultsTo: function (){ return new Date(); }
  },

  // Primitive attributes
  id: {
    type: 'integer',
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  firstName:{
    type: 'string',
    required: true
  },
  lastName: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  },

  // Lifecycle Callbacks
  beforeCreate: function(values, next) {
    next();
  },

  }
};
