import { NextResponse } from "next/server";
import connection from "@/app/lib/db/connection";
import foodmodel from "@/app/lib/foodmodel/foodmodel.js";
export async function GET(req,{params}){
    try{
        let id=params.dynamicId;
        
        //  ********* not require *****************

        // console.log(id)
        // // jako ake food ar id
        // let data=await foodmodel.findOne({_id:id});
        // console.log(data);
        // //ai data dia single restruent ar all data paojaba
        // if(!data){
        //     throw new Error('data not get from api db')
        // }
     //ai data dia single restruent ar all data paojaba {restro_id:data.restro_id}
//  ********* not require *****************

 let allData=await foodmodel.find({restro_id:id})
        return NextResponse.json({
            mess:'data get',
            success:true,
            allData:allData,
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


export async function DELETE(req,{params}){
    try{
        let id=params.dynamicId;
        // console.log(id)
    let data=await foodmodel.deleteOne({_id:id})
 
        return NextResponse.json({
            mess:'data delete',
            success:true,
            data:data,
            status:201
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