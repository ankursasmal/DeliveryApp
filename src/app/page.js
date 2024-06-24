"use client" 
import { useEffect, useState } from "react"
import CustomerHeader from "./_component/CustomerHeader"
import Footer from "./_component/Footer"
import { useRouter } from "next/navigation"
  
  
 function page() {
  let router=useRouter();
  let [place,setplace]=useState([]);
  let [shoplace,setShowplace]=useState(false);
  let [placeValue,setplacsValue]=useState('');
  let [restruentDetail,setrestruentDetail]=useState([]);
  
  // to get location name
  let PlacessInfo=async()=>{
    try{
      let res=await fetch('http://localhost:3000/api/customer/location');
      let data=await res.json();
      if(data.success){
        setplace(data.placess);
        console.log('data come')
      
      }

    }
    catch(e){
      console.log('data not come',e.message)

    }
  }

// to get all existing restrurent name
let AllRestruentInfo=async(params)=>{
  try{
    let url='http://localhost:3000/api/customer'
    // undefine hola error throw korba na ? dila
    if(params?.location){
url=url+'?location='+params.location
    }
   else if(params?.resturent){
    url=url+'?location='+params.resturent

    }  
    
    let res=await fetch(url);
    let data=await res.json();
    if(data.success){
      setrestruentDetail(data.placess);
      console.log('data come')
    }

  }
  catch(e){
    console.log('data not come',e.message)

  }
}
// console.log( restruentDetail);

//** to set location input value and params passs under AllRestruentInfo({location:val}) funtion
let HandelPlaceFind=(place)=>{
setplacsValue(place);

// ata holo params {location:place} pass for ?location=place value roout add on route
AllRestruentInfo({location:place})
}


useEffect(()=>{
  PlacessInfo();
  AllRestruentInfo();
},[])

   return (
     <div>
       
      <CustomerHeader/>
      <img className="w-[100vw] h-[27vw] " src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg"  alt="" />
      <div className="absolute top-12 left-[24vw]"> 
       <center className="flex flex-col  justify-center  ">
       <h1 className="text-center text-[3.2vw] left-[37vw] font-bold text-white">Food Delivery App </h1>
<div className="flex items-center  mt-4 justify-center"> 
 <input type="search" className="border-none cursor-pointer w-[20vw] outline-none py-2 pl-2" placeholder="search Placess"  value={placeValue} onClick={()=>setShowplace(shoplace==true?false:true)} />
 <input type="search" className="border-none w-[40vw] outline-none py-2" placeholder="search food or restruent name"  onChange={(e)=>{AllRestruentInfo({resturent:e.target.value})}} />

</div>
{shoplace?<ul className="px-5 py-2 shadow-lg bg-white absolute top-[8vw]  ">
  {
    place?.map((val,i)=>{
      return <li key={i} className="list-none text-black border-[1.3px] cursor-pointer px-5 py-2 "   onClick={()=>{ HandelPlaceFind(val); }}>{val}</li>
    })
  }
</ul>:null}
       </center>
       </div>

<div className="my-[2vw] px-6 flex items-center justify-center flex-wrap">
{restruentDetail?.map((val,i)=>{
  return (
    // and id pass and also routing both together
    <div key={i} className="flex flex-col p-2 bg-blue-500 text-white m-4 w-[44%] cursor-pointer rounded-lg" onClick={()=>{router.push('restruentDetail/'+val.name+"?id="+val._id)}}>
<h1>{val.name}</h1>
<a className="py-1">{val.email}</a>
<a>{val.city}</a>
<a className="pt-1 pb-2">{val.phone}</a>
 </div>
  )
})


}
</div>

        <Footer/>
     </div>
   )
 }
 
 export default page
 