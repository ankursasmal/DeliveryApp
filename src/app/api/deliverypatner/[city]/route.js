import { NextResponse } from "next/server";
import connection from "@/app/lib/db/connection";
import deliveryBoymodel from "@/app/lib/deliveryPatner/deliverymanModel";

export async function GET(req,{params}){
   try{
    let city=params.city;
   //  console.log(city);
    // direct {city:city} thia find korla hota but name collision issue

    let filter = { city: { $regex: new RegExp(city, 'i') } };
   //  find a {city:filter} jagai only filer because regex ar jann filter a condition acha
    const deliveryBoy=await deliveryBoymodel.find(filter)
      return NextResponse.json({mess:'data come',status:200,deliveryBoy:deliveryBoy})
//  await user.save();

   }
   catch(e){
       console.log('data not come')
       return NextResponse.json({mess:'data not come',status:401,e:e.message})
   }
}