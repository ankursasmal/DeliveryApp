"use client" 
import React, { useEffect, useState } from 'react'
import Footer from '../_component/Footer'
import CustomerHeader from '../_component/CustomerHeader'

function MyProfile() {
let [orderlist,setorderlist]=useState([]);
let [authUser,setauthUser]=useState(JSON.parse(localStorage.getItem('signUpuser'))) ;
let AllorderInfo=async ()=>{
    try{
let res=await fetch(`http://localhost:3000/api/order?id=${authUser._id}`)
let result=await res.json();
if(result){
    setorderlist(result.myprofile);
    console.log('data come succesfully')
}
    }
    catch(e){
        console.log('data not come succesfully')

    }
}

useEffect(()=>{
AllorderInfo();
},[])

// console.log(orderlist)
  return (
    <div>
        <CustomerHeader/>
<div className='flex flex-col justify-center items-center'>
    <h1 className='text-blue-500 font-bold'>All Privious order details From this restruent</h1>
    <div className='flex justify-center flex-col w-[40vw] p-4'>
        {orderlist.map((val,i)=>{
            return(
                    <div key={i} className='flex flex-col w-[40vw] p-4 shadow-xl'>
<a>name:{val.data.name}</a>
<a className='py-1'>Amount:{val.ammount}</a>
<a >Address:{val.restro_id}</a>
<a className='py-1'>status:{val.status}</a>
 </div>
)
        })}

    </div>
    </div>
    <Footer/>
    </div>
  )
}

export default MyProfile
