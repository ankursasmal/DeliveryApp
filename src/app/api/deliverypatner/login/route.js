  import { NextResponse } from "next/server";
 import connection from "@/app/lib/db/connection";
import deliveryBoymodel from "@/app/lib/deliveryPatner/deliverymanModel";

export async function POST(req){
    try{
 let {email,password }= await req.json();
  let user=await deliveryBoymodel.findOne({email:email});
 if(user.password==password){
    console.log('ankur')
console.log('login succes')
      return NextResponse.json({mess:'data come',status:200,user:user})
}
 
  

//  await user.save();

    }
    catch(e){
        console.log('data not come')
        return NextResponse.json({mess:'data not come',status:401,e:e.message})
    }
}