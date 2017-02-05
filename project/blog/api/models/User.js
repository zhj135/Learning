/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
module.exports = {
  attributes: {
  	userName:{
  		type: 'string',
  		unique: true,
  		require: true,
  		minLength: 1,
  		maxLength: 20
  	},
  	password:{
  		type: 'string',
  		require: true,
  	},
  	isAdmin: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  beforeCreate:function(value,cb){
  	bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        if(err) return cb(err);
        values.password = hash;
        // 执行用户定义回调
        cb();
      });
    });
  }
};

