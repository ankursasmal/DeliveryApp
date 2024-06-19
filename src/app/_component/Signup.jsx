"use client" 

import { useRouter } from "next/navigation";
 import React, { useState } from "react"
function Signup() {
  let router=useRouter();
let [user,setuser]=useState({name:"",email:"",password:"",city:"",cpassword:"",resturent:"",phone:""});
 

  let handelpost= async(e)=>{
 try{
  e.preventDefault();

    if(user.name==""||user.email==""|| user.password==""|| user.cpassword==""|| user.city==""||user.resturent=="" || user.phone==""){
    throw new Error('fill properly in frontend signup')
  }
  if(user.password !== user.cpassword){
    throw new Error('pass and cpasss not match in frontend signup')

  }
 let res=await fetch("http://localhost:3000/api/home",{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    name:user.name,
    email:user.email,
    password:user.password,
    cpassword:user.cpassword,
    city:user.city,
    resturent:user.resturent,
    phone:user.phone
  })
})

let data=await res.json();

 if(data.status==200){
    // user come fron return Nextresponce.json({user:user})

    let {user}=data;
  delete user.password;
  delete user.cpassword;
  // local storage a jodi obj store kori sa casa JSON.stringify(user) kora save korta hoba
   localStorage.setItem('userDetail',JSON.stringify(user));
  window.alert('data store')
  router.push('/home/dashbord')
 }
 else{
  window.alert('data not store');
  throw new Error('already exit')
 }
 
}
catch(e){
console.log('signup not confirm ',e.message)
}
  }

let name,value;
  let postData=(e)=>{
  name=e.target.name;
  value=e.target.value;
  setuser({...user,[name]:value})
  }
  
 

  return (
    <div>
      <h1 className="text-[3.5vw] font-semibold text-center self-center">SignUp</h1>
       <form onSubmit={handelpost} className='flex flex-col p-2 shadow-xl w-[60vw] md:w-[50vw] lg:w-[30vw]'>
       <label htmlFor="name">Name</label>
      <input className='border-[1px] border-black' type="text" id="name" name="name" value={user.name}  onChange={postData}  />
      
      <label htmlFor="email">Email</label>
      <input className='border-[1px] py-3 border-black' type="email" id="email" name="email"  value={user.email}  onChange={postData} />

       <label htmlFor="password">Password</label>
      <input className='border-[1px]   border-black' id="password" name="password" type="password" value={user.password} onChange={postData} />
      
      <label htmlFor="cpassword">Confirm Password</label>
      <input className='border-[1px] py-3 border-black' id="cpassword" name="cpassword" type="password" value={user.cpassword} onChange={postData} />
      
      <label htmlFor="city">City</label>
      <input className='border-[1px]  border-black' id="city" name="city" type="text" onChange={postData} value={user.city} />
      
      <label htmlFor="resturent">Resturent</label>
      <input className='border-[1px] py-3 border-black' type="text" id="resturent" name="resturent" onChange={postData}  value={user.resturent}  />
      
      <label htmlFor="phone">phone</label>
      <input className='border-[1px] border-black' type="text" id="phone" name="phone"   onChange={postData}  value={user.phone}/>
      
        <div className='flex items-center justify-center text-center pt-2'>
        <button type='submit' className='rounded-lg px-2 py-[2px] border-[1px] border-black' >Submit</button>
        <button type='text'  className='rounded-lg px-2 py-[2px] border-[1px] border-black' >reset</button>

      </div>
    </form>
     </div>
  )
}

export default Signup
