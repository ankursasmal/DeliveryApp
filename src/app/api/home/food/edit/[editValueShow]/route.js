import { NextResponse } from "next/server";
import connection from "@/app/lib/db/connection";
import foodmodel from "@/app/lib/foodmodel/foodmodel.js";

// edit page to id through data gat
export async function GET(req,{params}){
   
  try{
    let id=params.editValueShow;

      let data=await foodmodel.findOne({_id:id})
    return NextResponse.json({
        mess:'data get',
        success:true,
        data:data,
        status:200
    })

}
catch(e){
    return NextResponse.json({
        mess:'data not get',
        success:false,
        status:404,
        e:e.message
    })
}
}



export async function PUT(req,{params}){
    try{

         let id=params.editValueShow;
        //  console.log(id);
      let success=false;
   const data=await req.json();
    let result =await foodmodel.findByIdAndUpdate({_id:id},data,{new:true} )
    //  console.log('data store success',result);
    // save() not need
    return NextResponse.json({mess:'data edit success',success:true,status:201,result:result})
    }  
    catch(e){
    
       console.log('food not store')
       return NextResponse.json({mess:'data not store',success:false,status:401,e:e.message})
   
    } 
   }
   