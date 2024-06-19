'use client'
import React, { useEffect, useState } from 'react'
import DeliveryPatnerHeader from '../_component/DeliveryPatnerHeader'
import Footer from '../_component/Footer'
import { useRouter } from 'next/navigation'
function DeliveryDashbord() {
 let router=useRouter();
 let [deliveryBoyData,setdeliveryBoyData]=useState([]);

    let DeliveryBoyAllOrder=async()=>{
       try{
         let deliveryData=JSON.parse(localStorage.getItem('delivery'));
        //  console.log(deliveryData._id)
    
         let res=await fetch(`http://localhost:3000/api/deliveryBoyOrders/${deliveryData._id}`)
          let data=await res.json();
  // console.log(data)
if(data.success){
  setdeliveryBoyData(data.deliveryDetail);
 }
       }
      catch(e){
        console.log('no data found')
      }
    }
// console.log(deliveryBoyData)
 

    // if  login try to go deliverypatner   page means login page 
useEffect(()=>{
  DeliveryBoyAllOrder();
    let deliveryExist=JSON.parse(localStorage.getItem('delivery')) && JSON.parse(localStorage.getItem('delivery'));
    if(!deliveryExist){
        router.push('/deliveryPatner')
    }
    },[]);


  return (
    <div>
      <DeliveryPatnerHeader/>
      <h1 className='text-[3vw] my-3 text-center font-bold text-blue-300 '>Delivery Dash bordPage</h1>

<div className='flex justify-center  items-center flex-col'>
  {Array.isArray(deliveryBoyData)? deliveryBoyData?.map((val,i)=>{
  return (
    <div key={i} className='flex items-start m-3  flex-col w-[50vw] p-4 shadow-lg bg-yellow-400'>
  <h1>{val.data.name}</h1> 
<a  >{val.data.restro_id}</a>
<a>{val.ammount}</a>
<a  >{val.status}</a>

      </div>
  )
 }):<h1>No Delivery Data Found</h1>
}

</div>
      <Footer/>
    </div>
  )
}

export default DeliveryDashbord
