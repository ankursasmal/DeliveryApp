import { NextResponse } from "next/server";
import connection from "@/app/lib/db/connection";
import userDetail from "@/app/lib/model/usermodel";


// a rout add->> /api/customer  ->>> extra /api/customer/?location=cityname
export async function GET(request){
    try{
        //1. quiry params for get data in whitch basic  ?por ja search korbo ta asba
        let queryParams=request.nextUrl.searchParams;
        //   console.log(queryParams.get('location'))
        let filterLocation={};

if(queryParams.get('location')){
let city=queryParams.get('location');
// after geting ciy name use reg 'i' means case insencitive
  filterLocation={city:{$regex:new RegExp(city,'i')}} 
}
else if(queryParams.get('resturent')){
    let name=queryParams.get('resturent');
    // after geting ciy name use reg 'i' means case insencitive
      filterLocation={name:{$regex:new RegExp(name,'i')}} 
    }

//2. using RegExp
let placess=await userDetail.find(filterLocation);



//1. with out regex
// let placess=await userDetail.find(filterLocation);
  
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
