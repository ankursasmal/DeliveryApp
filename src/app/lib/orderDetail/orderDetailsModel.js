import mongoose from "mongoose";
import validator from "validator";
let orderSchema= new mongoose.Schema({
   user_id:{
    type:mongoose.Schema.Types.ObjectId,
    } ,
   foodItem:{
    type:String,

   } ,
   resto_id:{
    type:String,
    } 
   ,deliveryBoy:{
    type:String,
    } 
   ,status:{
    type:String,
    }, 
    ammount:{
    type:Number,
    }  

});

let OrderDetailModel= mongoose.models.OrderDetailModel || mongoose.model('OrderDetailModel',orderSchema)

export default OrderDetailModel;