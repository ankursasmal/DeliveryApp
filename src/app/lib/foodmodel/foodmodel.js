import mongoose from "mongoose";
import validator from "validator";
let foodSchema= new mongoose.Schema({
   name:{
    type:String,
    required:true,
   } ,
   
   price:{
    type:Number,
    required:true,
   } 
    
   ,path:{
    type:String,
    required:true,

    }, 
    Description:{
    type:String,
    required:true,

    } ,
    restro_id:mongoose.Schema.Types.ObjectId

});

let foodmodel= mongoose.models.foodmodel || mongoose.model('foodmodel',foodSchema)

export default foodmodel;