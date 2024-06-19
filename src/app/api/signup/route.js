import connection from "@/app/lib/db/connection";
import userDetail from "@/app/lib/model/usermodel";
import signUpModel from "@/app/lib/signUpModel/signup";
import { NextResponse } from "next/server";
 
 

export async function POST(req){
    try{
 let {name,email,password,cpassword,resturent,phone,city}= await req.json();
 console.log(name,email);
 let data=await signUpModel.findOne({email:email});
 if(data){
    throw new Error('data already present in db');
 }
 let user=new signUpModel({
    name:name,
    email:email,
    password:password,
    cpassword:cpassword,
    city:city,
    resturent:resturent,
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