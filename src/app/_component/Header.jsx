"use client" 
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
// import logo from './logo.pn/g'
function Header() {
  let [detail,setdetail]=useState();
  let pathname=usePathname();
let roter=useRouter();
  useEffect(()=>{
    let data=localStorage.getItem('userDetail');
    // jaha tu JSON.stringfy or json foret a locla store hoa chilo so JSON.parse(data) kora use
     if(!data && pathname=='/home/dashbord'){
      roter.push('/home');
    }
    else if(data && pathname=='/home'){
      roter.push('/home/dashbord')
    }
    else{
setdetail(JSON.parse(data));
    }
  },[]);


let handelLogout=()=>{
  localStorage.removeItem('userDetail');
   roter.push('/home')
}

  return (
    <div className='flex px-2 items-center justify-between bg-[#63d0ff] w-[100vw]'>
      {/* <img className='w-[5vw]' src="logo.png" alt="" /> */}
    <div className='flex items-center'>
<Link href='/'>Resturent</Link>

{detail ?
<>
<Link href='/home/dashbord' className='px-[2vw]'>Profile</Link>
  <Link href='/home' className='pr-[2vw]' > <button onClick={handelLogout}>Logout</button></Link>
   </>:
 <Link href='/home' className='px-[2vw]'>Login/SignUp</Link>
}
    </div>
    </div>
  )
}

export default Header
