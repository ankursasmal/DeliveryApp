 import connection from "@/app/lib/db/connection";
import deliveryBoymodel from "@/app/lib/deliveryPatner/deliverymanModel";
import { NextResponse } from "next/server";
 
export async function POST(req){
    try{
 let {name,email,password,cpassword,address,phone,city}= await req.json();
//  console.log(name,email);
 let data=await deliveryBoymodel.findOne({email:email});
 if(data){
    throw new Error('data already present in db');
 }
 let user=new deliveryBoymodel({
    name:name,
    email:email,
    password:password,
    cpassword:cpassword,
    city:city,
    address:address,
    phone:phone
 });

 await user.save();
console.log(user)
         return NextResponse.json({mess:'data come',status:200,user:user})

    }
    catch(e){
        console.log('data not come')
        return NextResponse.json({mess:'data not come',status:401,e:e.message})
    }
}