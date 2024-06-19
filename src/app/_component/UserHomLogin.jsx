
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
  let res=await fetch('/api/homeLogin',{
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

 localStorage.setItem('signUpuser',JSON.stringify(user));
     window.alert('login succes')
  rout.push('/');

}
else{
  window.alert('login not succes')

}
}
  catch(e){
    window.alert('login not succes')
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
    <button className="mt-4 px-4 py-2 text-blue-500" onClick={()=>rout.push('/signup')}> Do not Have a Acccount? Signup</button>
     </div>
  )
}

export default Login
