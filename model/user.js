const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment'); 
const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    userType:{
      type:String,
      required:true
    },
    gender:{
      type:String,
      required:true
    },
    age:{
      type:String,
      required:true
    },
    contact:{
      type:String,
      required:true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });

  autoIncrement.initialize(mongoose.connection);

  UserSchema.plugin(autoIncrement.plugin,{
    model: "post", // collection or table name in which you want to apply auto increment
    field: "_id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
  });
  
  // export model user with UserSchema
  module.exports = mongoose.model("user", UserSchema);