const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment'); 
const SlotSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    slotFrom:{
        type:String,
        required:true
    },
    slotTo:{
        type:String,
        required:true
    },
    booked:{
        type:Boolean,
        required:true
    },
    slotDate:{
        type:String,
        required:true
    },
    bookedBy:{
        type:Object,
        default:""
    },
    period:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

autoIncrement.initialize(mongoose.connection);

SlotSchema.plugin(autoIncrement.plugin,{
    model: "post", // collection or table name in which you want to apply auto increment
    field: "_id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
  });

  module.exports=mongoose.model("slot",SlotSchema)