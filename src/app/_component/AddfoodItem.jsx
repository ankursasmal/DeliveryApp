"use client" 
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function AddfoodItem() {
    let route=useRouter();
    let [food,setfood]=useState({name:"",price:"",path:"",Description:""})
let name,value;
let foodData=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setfood({...food,[name]:value})
}
 // console.log(food)
let handelFoodItem= async()=>{
try{
  if(food.name==""||food.price==""|| food.path==""|| food.Description==""){
  console.log('fill the form');
  throw new Error('data not fill')
  }
     let user=JSON.parse(localStorage.getItem('userDetail'));
     let userId;
     if(user){
      userId=user._id;
     }
    // we get use as json formet
    // let userData=JSON.parse(user);
    // console.log(userData.id);

    // under user we get auth user detail
 let res=await fetch("http://localhost:3000/api/home/food",{
         method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name:food.name,
          price:food.price,
          path:food.path,
          Description:food.Description,
  restro_id:userId
          
        })
      })
      
      let data=await res.json();
      console.log(data);
if(data.status==201){
    console.log('food items add');
    alert('food item add');
    // setfood({...food,name:"",price:"",path:"",Description:""});
    route.push('/home/dashbord')
}
      
}
catch(e){
    console.log('food not items add',e.message);
    alert('food  not item add')
}
}

  return (
    <center>
       <h1 className="text-[3.5vw] font-semibold text-center self-center">Add food Items</h1>
       <form  onSubmit={handelFoodItem} className='flex flex-col p-2 shadow-xl w-[60vw] md:w-[50vw] lg:w-[30vw]'>
       <label htmlFor="name"  className='text-start'>Name</label>
      <input className='border-[1px] border-black' type="text" id="name" name="name" value={food.name}  onChange={foodData}  />
      
      <label htmlFor="email" className='text-start'>price</label>
      <input className='border-[1px] py-3 border-black' type="text" id="price" name="price"  value={food.price}  onChange={foodData} />

       
      <label htmlFor="city" className='text-start'>Path</label>
      <input className='border-[1px]  border-black' id="path" name="path" type="text" onChange={foodData} value={food.path} />
      
      <label htmlFor="resturent" className='text-start'>Description</label>
      <input className='border-[1px] py-3 border-black' type="text" id="Description" name="Description" onChange={foodData}  value={food.Description}  />
      
       
        <div className='flex items-center justify-center text-center pt-2'>
        <button type='submit' className='rounded-lg px-2 py-[2px] border-[1px] border-black' >Add food Items</button>
 
      </div>
    </form>
    </center>
  )
}

export default AddfoodItem
