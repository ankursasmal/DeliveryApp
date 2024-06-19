"use client" 

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function FoodItemShow() {
 let [foodList,setFoodlist]=useState([]);
 let route=useRouter();

// get api
let foodDataApi=async()=>{
try{

    let dataLocalStorage=JSON.parse(localStorage.getItem('userDetail'));

    console.log(dataLocalStorage._id);

      let res=await fetch(`http://localhost:3000/api/home/food/${dataLocalStorage._id}`);

    let data=await res.json();
  setFoodlist(data.allData);
   
}
catch(e){
    console.log('data not come ',e.message)
}
}
 
useEffect(()=>{
    foodDataApi();

},[]);



// delete api ** get and delete same no data pass form frontend

let handelDelete=async(id)=>{
    try{
 let res=await fetch(`http://localhost:3000/api/home/food/${id}`,{
    method:"DELETE",
    headers:{
      'Content-Type':'application/json'
    },

           });
        let data=await res.json();
if(data.success){
    console.log('success full remove');
}
    }
    catch(e){
        console.log('delete not occure ',e.message)
    }
    }
 

 
  return (


    <center>
      <h1 className='font-semibold text-[3vw] my-3'>food Items</h1>
      <table className='border-[2px] border-collapse mb-4'>
        <thead className='border-[2px] border-collapse'>
            <tr className='border-[2px] '>
                <td>SN</td>
                                <td>name</td>
                                <td>Price</td>
                                <td>Desctiption</td>
                                <td>Image</td>
                                <td>Operation</td>
                              
            </tr>
        </thead>
        
       
        <tbody className='border-[2px] border-collapse'>
           {foodList && foodList.map((val,i)=>{
       return (
 <tr key={i}>
            <td >{i}</td>
                                <td>{val.name}</td>
                                <td>{val.price}</td>
                                <td>{val.Description}</td>
                                <td><img src={val.path} alt="" className='w-6vw' /></td>
                                <td><button className='px-1 py-[2.5px] bg-red-400 text-white rounded-lg mr-2' onClick={()=>{handelDelete(val._id)}}>Delete</button>
                                {/* dashbord rout a achi so route.push('dashbord/'+val._id)  dashbord rout thaka */}
                                <button className='px-1 py-[2.5px] bg-gray-400 text-white rounded-lg' onClick={()=>route.push('dashbord/'+val._id)} >Edit</button></td>
                              
            </tr>
         )     
        })} 
               </tbody>

      </table>
    </center>
  )
}

export default FoodItemShow
