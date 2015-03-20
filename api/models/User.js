/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    // Model attributes
    createdAt: {
      type: 'datetime',
      defaultsTo: function (){ return new Date(); }
    },

    // Primitive attributes
    id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    firstName: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 15
    },
    lastName: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 15
    },
    email: {
      type: 'string',
      required: true,
      index: true
    },
    encryptedPassword: {
      type: 'string',
      required: true,
      password: true
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    // Attribute methods
    getFullName: function (){
      return this.firstName + '' + this.lastName;
    },

    beforeValidation: function (values, next) {
      if (typeof values.admin !== 'undefined') {
        if (values.admin === 'unchecked') {
          values.admin = false;
        } else  if (values.admin[1] === 'on') {
          values.admin = true;
        }
      }
      next();
    },

    beforeCreate: function (values, next) {

    if (!values.password || values.password != values.confirmation) {
      return next({err: ["Password doesn't match password confirmation."]});
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }

  }
};
