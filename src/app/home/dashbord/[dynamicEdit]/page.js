"use client" 
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// id props through recive
function EditPage(props) {
    // from FoodItemShow page edit button to get
    console.log(props.params.dynamicEdit)
   let route=useRouter();
   let [editValue,setEditval]=useState([])

// get api thorugh dynamic rout for fill the data privoiously in the form
let foodEditApiData=async()=>{
try{
       let res=await fetch(`http://localhost:3000/api/home/food/edit/${props.params.dynamicEdit}`);
    let data=await res.json();
     setEditval(data.data);
   
}
catch(e){
    console.log('data not come ',e.message)
}
}
// console.log('data to edit',editValue)  

useEffect(()=>{
    foodEditApiData();

},[]);


let name,value;
let foodData=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setEditval({...editValue,[name]:value})
}

 
// put request for edit

 let HandelEdit= async()=>{
try{
    let editId=props.params.dynamicEdit;
    // console.log(editId);
 if(editValue.name==""||editValue.price==""|| editValue.path==""|| editValue.Description==""){
 console.log('fill the form');
 throw new Error('data not fill');
 }
console.log('ankur')
let res=await fetch(`http://localhost:3000/api/home/food/edit/${editId}`,{
        method:"PUT",
       headers:{
         'Content-Type':'application/json'
       },
       body:JSON.stringify({
         name:editValue.name,
         price:editValue.price,
         path:editValue.path,
         Description:editValue.Description,
        // restro_id remain same restro_id thia get or show added items  // 
       })
     })
      
     let data=await res.json();
     console.log(data);
if(data.success){
   console.log('food items add');
   alert('food item  edit');
  //  all work properly but 
    route.push('/home/dashbord')
}
     
}
catch(e){
   console.log('food not items edit',e.message);
   alert('food  not item eidt')
}
}

 return (
   <center className='flex flex-col justify-center items-center'>
      <h1 className="text-[3.5vw] font-semibold text-center self-center">Update food Items</h1>
      <form onSubmit={HandelEdit}   className='flex flex-col p-2 shadow-xl w-[60vw] md:w-[50vw] lg:w-[30vw]'>
      <label htmlFor="name"  className='text-start'>Name</label>
     <input className='border-[1px] border-black' type="text" id="name" name="name" value={editValue.name}  onChange={foodData}  />
     
     <label htmlFor="email" className='text-start'>price</label>
     <input className='border-[1px] py-3 border-black' type="text" id="price" name="price"  value={editValue.price}  onChange={foodData} />

      
     <label htmlFor="city" className='text-start'>Path</label>
     <input className='border-[1px]  border-black' id="path" name="path" type="text" onChange={foodData} value={editValue.path} />
     
     <label htmlFor="resturent" className='text-start'>Description</label>
     <input className='border-[1px] py-3 border-black' type="text" id="Description" name="Description" onChange={foodData}  value={editValue.Description}  />
     
      
       <div className='flex items-center justify-center text-center   pt-2'>
       <button type='submit' className='rounded-lg px-2 py-[2px] border-[1px] border-black mb-3' >Add food Items</button>

     </div>
   </form> 
   
         <button  className='rounded-lg px-2 py-[2px] border-[1px] border-black' onClick={()=> route.push('/home/dashbord')}>Back to Food Items Page</button>

   </center>
 )
}

export default EditPage
