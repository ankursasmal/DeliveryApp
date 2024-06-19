"use client" 
import { useRouter } from "next/navigation";
import React, { useState } from "react"
function Login() {
  let [user,setuser]=useState({email:"",password:""});
let rout=useRouter();

let handelLogin= async(e)=>{
  try{
    e.preventDefault();
  if(user.email=="" || user.password==""){
    throw new Error('fill form properly');
  }
  let res=await fetch('http://localhost:3000/api/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
email:user.email,
password:user.password
    })
     
  })
  let data=await res.json();
  if(data.status==200){
  // data come fron return Nextresponce.json({data:data})
let {user}=data;
// console.log(user)
delete user.password;
delete user.cpassword;

 localStorage.setItem('userDetail',JSON.stringify(user));
      alert('login succes')
  rout.push('/home/dashbord');

}
else{
 alert('login not succes')

}
}
  catch(e){
    alert('login not succes')
    console.log('login not succes',e.message)
  }
}

  return (
    <div>
      <h1 className="text-[3.8vw] font-semibold text-center self-center ">Login</h1>
       <form onSubmit={handelLogin} className='flex flex-col p-2 shadow-xl w-[60vw] md:w-[50vw] lg:w-[30vw]'>
       <label htmlFor="email">Email</label>
      <input className='border-[1px] border-black' id="email" name="email"  value={user.email} onChange={(e)=>{setuser({...user,email:e.target.value})}} />
      
      <label htmlFor="password">Password</label>
      <input className='border-[1px] py-3 border-black' id="password" name="password" type="password" value={user.password} onChange={(e)=>{setuser({...user,password:e.target.value})}} />
      
        <div className='flex items-center justify-center text-center pt-2'>
        <button type='submit' className='rounded-lg px-2 py-[2px] border-[1px] border-black'>Submit</button>
        <button  className='rounded-lg px-2 py-[2px] border-[1px] border-black' >reset</button>

      </div>
    </form>
     </div>
  )
}

export default Login
