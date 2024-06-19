import connection from "@/app/lib/db/connection";
import userDetail from "@/app/lib/model/usermodel";
import OrderDetailModel from "@/app/lib/orderDetail/orderDetailsModel";
 import { NextResponse } from "next/server";
import signUpModel from "@/app/lib/signUpModel/signup";
import { redirect } from "next/dist/server/api-utils";
import foodmodel from "@/app/lib/foodmodel/foodmodel";
 import deliveryBoymodel from "@/app/lib/deliveryPatner/deliverymanModel";

//   /api/oredr/id=val user deliveryDetail data take
 export async function GET(req,{params}){
    try{
//     /api/oredr?id=val -->ai route  ar janno chalba  main /api/oredr route;
 let id=params.id;
//   console.log(id);

 let deliveryDetail=await OrderDetailModel.find({deliveryBoy:id});
 //  all data  order by a user in (deliveryDetail)
//    console.log(deliveryDetail)

 if(deliveryDetail){
    let result= await Promise.all(
        deliveryDetail.map(async(val)=>{
    let restoInfo={};
        restoInfo.data=await  foodmodel.findOne({restro_id:val.resto_id}); //val.resto_id myprofile to 
    restoInfo.ammount=val.ammount;
    restoInfo.status=val.status;
    return restoInfo;
  } )
    )
// extra field add hoa ?id= url a [ass hoba]
deliveryDetail=result;
//  console.log(deliveryDetail);

    return NextResponse.json({
        mess:'profile  detail show success',
        status:200,
        success:true,
        deliveryDetail:deliveryDetail
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
 