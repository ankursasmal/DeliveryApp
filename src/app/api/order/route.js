import connection from "@/app/lib/db/connection";
import userDetail from "@/app/lib/model/usermodel";
import OrderDetailModel from "@/app/lib/orderDetail/orderDetailsModel";
 import { NextResponse } from "next/server";
import signUpModel from "@/app/lib/signUpModel/signup";
import { redirect } from "next/dist/server/api-utils";
import foodmodel from "@/app/lib/foodmodel/foodmodel";

 export async function POST(req){
    try{
let data=await req.json();
let userOrder= new OrderDetailModel(data);

let orders=await userOrder.save();
if(orders){
    return NextResponse.json({
        mess:'order detail success',
        status:201,
        success:true,
        orders:orders
    })
}
    }
    catch{
        return NextResponse.json({
            mess:'order detail not get success',
            status:401,
            success:false,
e:e.message      
  })
    }
 }
 

//   /api/oredr?id=val user myprofile data take
 export async function GET(req){
    try{
//     /api/oredr?id=val -->ai route  ar janno chalba  main /api/oredr route;
 let id=req.nextUrl.searchParams.get('id');
//  console.log(id);

 let myprofile=await OrderDetailModel.find({user_id:id});
 //  all data  order by a user in (myprofile)
//  console.log(myprofile)
 if(myprofile){
    let result= await Promise.all(
        myprofile.map(async(val)=>{
    let restoInfo={};
        restoInfo.data=await foodmodel.findOne({restro_id:val.resto_id}); //val.resto_id myprofile to 
    restoInfo.ammount=val.ammount;
    restoInfo.status=val.status;
    return restoInfo;
  } )
    )
// extra field add hoa ?id= url a [ass hoba]
myprofile=result;
// console.log(myprofile)
    return NextResponse.json({
        mess:'profile  detail show success',
        status:200,
        success:true,
        myprofile:myprofile
    })
}
    }
    catch(e){
        return NextResponse.json({
            mess:'profile  detail not show success',
            status:404,
            success:false,
e:e.message        })
    }
 }
 