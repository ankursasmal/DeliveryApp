import { NextResponse } from "next/server";
import connection from "@/app/lib/db/connection";
import userDetail from "@/app/lib/model/usermodel";
export async function GET(req){
    try{
          
 let data=await userDetail.find();
 let placess=data.map((data)=>{
    // each ne frirt letter +other letter add
   return  data.city.charAt(0).toUpperCase()+data.city.slice(1);
 })
// remove duplicat city name
 placess=[...new Set(placess)];
        return NextResponse.json({
            mess:'data get',
            success:true,
            placess:placess,
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
