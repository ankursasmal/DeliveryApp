'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function DeliveryPatner() {
    let router=useRouter();
     let [loginuser,setloginuser]=useState({email:"",password:""});
    let [user,setuser]=useState({name:"",email:"",password:"",city:"",cpassword:"",address:"",phone:""});

    let name,value;
    let postData=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setuser({...user,[name]:value})
    }

    let handelpost= async(e)=>{
        try{
         e.preventDefault();
       
           if(user.name==""||user.email==""|| user.password==""|| user.cpassword==""|| user.city==""||user.address=="" || user.phone==""){
           throw new Error('fill properly in frontend signup')
         }
         if(user.password !== user.cpassword){
           throw new Error('pass and cpasss not match in frontend signup')
       
         }
         let res=await fetch("http://localhost:3000/api/deliverypatner/signup",{
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
           address:user.address,
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
          localStorage.setItem('delivery',JSON.stringify(user));
         window.alert('data store');

         router.push('/deliveryDashbord')
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


// login

let handelLogin= async(e)=>{
    try{
      e.preventDefault();
     if(loginuser.email=="" || loginuser.password==""){
      throw new Error('fill form properly');
    }
    let res=await fetch('http://localhost:3000/api/deliverypatner/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
  email:loginuser.email,
  password:loginuser.password
      })
       
    })
 
    let data=await res.json();
    if(data.status==200){
    // data come fron return Nextresponce.json({data:data})
  let {user}=data;
  // console.log(user)
  delete user.password;
  delete user.cpassword;
    localStorage.setItem('delivery',JSON.stringify(user));
       window.alert('login succes')
       router.push('/deliveryDashbord')
  
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
  
 // if login deliverypatner new page a joar try kora
// useEffect(()=>{
//     let deliveryExist=JSON.parse(localStorage.getItem('delivery'));
//     if(deliveryExist){
//         router.push('/deliveryDashbord')
//     }
//     },[])


  return (
    <div>
        <h1  className='flex text-[3vw] my-3 font-bold'>Delivery Patener Detail</h1>
     <div className='flex justify-around'>

          {/* Login */}
        <div>
      <h1 className="text-[3.8vw] font-semibold text-center self-center ">Login</h1>
       <form onSubmit={handelLogin} className='flex flex-col p-2 shadow-xl w-[30vw] md:w-[40vw] lg:w-[40vw]'>
       <label htmlFor="email">Email</label>
      <input className='border-[1px] border-black' id="email" name="email"  value={loginuser.email} onChange={(e)=>{setloginuser({...loginuser,email:e.target.value})}} />
      
      <label htmlFor="password">Password</label>
      <input className='border-[1px] py-3 border-black' id="password" name="password" type="password" value={loginuser.password} onChange={(e)=>{setloginuser({...loginuser,password:e.target.value})}} />
      
        <div className='flex items-center justify-center text-center pt-2'>
        <button type='submit' className='rounded-lg px-2 py-[2px] border-[1px] border-black'>Submit</button>
        <button  className='rounded-lg px-2 py-[2px] border-[1px] border-black' >reset</button>

      </div>
    </form>
     </div>

      {/* Signup */}
      <div>
      <h1 className="text-[3.5vw] font-semibold text-center self-center">SignUp</h1>
       <form onSubmit={handelpost} className='flex flex-col p-2 shadow-xl w-[40vw] md:w-[40vw] lg:w-[30vw]'>
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
      
      <label htmlFor="resturent">address</label>
      <input className='border-[1px] py-3 border-black' type="text" id="address" name="address" onChange={postData}  value={user.address}  />
      
      <label htmlFor="phone">phone</label>
      <input className='border-[1px] border-black' type="text" id="phone" name="phone"   onChange={postData}  value={user.phone}/>
      
        <div className='flex items-center justify-center text-center pt-2'>
        <button type='submit' className='rounded-lg px-2 py-[2px] border-[1px] border-black' >Submit</button>
        <button type='text'  className='rounded-lg px-2 py-[2px] border-[1px] border-black' >reset</button>

      </div>
    </form>
     </div>
    </div>
    </div>
  )
}
export default DeliveryPatner
