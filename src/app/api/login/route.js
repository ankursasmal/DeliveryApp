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
 let {email,password }= await req.json();
  let user=await userDetail.findOne({email:email});
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