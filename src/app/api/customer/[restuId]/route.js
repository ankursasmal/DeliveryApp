import { NextResponse } from "next/server";
import connection from "@/app/lib/db/connection";
import foodmodel from "@/app/lib/foodmodel/foodmodel.js";
import userDetail from "@/app/lib/model/usermodel";
export async function GET(req,{params}){
    try{
   let WonnerId=params.restuId;
   console.log(WonnerId);
let userInfo=await userDetail.find({_id:WonnerId});
let foodDetail=await foodmodel.find({restro_id:WonnerId});

    console.log('data come');
    return NextResponse.json({mess:'data come ',success:true,status:200,foodDetail:foodDetail,userInfo:userInfo})


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

 