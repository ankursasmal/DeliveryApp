import connection from "@/app/lib/db/connection";
import foodmodel from "@/app/lib/foodmodel/foodmodel";
import { NextResponse } from "next/server";

export async function POST(req){
 try{
   let success=false;
const payload=await req.json();
let food=new foodmodel(payload);
const result=await food.save();
console.log('dats store success')
return NextResponse.json({mess:'data store',success:true,status:201,result})
 }  
 catch(e){
 
    console.log('food not store')
    return NextResponse.json({mess:'data not store',success:false,status:401,e:e.message})

 } 
}

 