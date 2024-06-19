import mongoose from "mongoose";
import validator from "validator";
let deliveryBoySchema= new mongoose.Schema({
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
        address:{
        type:String,
        } ,
       phone:{
        type:Number,
        }
    
});

let deliveryBoymodel= mongoose.models.deliveryBoymodel || mongoose.model('deliveryBoymodel',deliveryBoySchema)

export default deliveryBoymodel;