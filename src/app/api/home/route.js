import connection from "@/app/lib/db/connection";
import userDetail from "@/app/lib/model/usermodel";
import { NextResponse } from "next/server";
export async function GET(){
    try{
        console.log('ok')
        return NextResponse.json({mess:'data come',status:200})

    }
    catch(e){
        console.log('data not come')
        return NextResponse.json({mess:'data not come',status:401})
    }
}


export async function POST(req){
    try{
 let {name,email,password,cpassword,resturent,phone,city}= await req.json();
 console.log(name,email);
 let data=await userDetail.findOne({email:email});
 if(data){
    throw new Error('data already present in db');
 }
 let user=new userDetail({
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