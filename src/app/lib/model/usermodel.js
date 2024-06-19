import mongoose from "mongoose";
import validator from "validator";
let userSchema= new mongoose.Schema({
   name:{
    type:String,
    required:true,
   } ,
   email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new error('email not valid');
        }
    }
   } ,
   password:{
    type:String,
    required:true,
   } 
   ,cpassword:{
    type:String,
    required:true,
   } 
   ,city:{
    type:String,
    }, 
    resturent:{
    type:String,
    } ,
   phone:{
    type:Number,
    }

});

let userDetail= mongoose.models.userDetail || mongoose.model('userDetail',userSchema)

export default userDetail;