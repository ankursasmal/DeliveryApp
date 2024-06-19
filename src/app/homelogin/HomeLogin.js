"use client" 

import { useRouter } from "next/navigation";
 import React, { useState } from "react";
 import CustomerHeader from '../_component/CustomerHeader'
import Footer from '../_component/Footer'
import UserHomLogin from '../_component/UserHomLogin'

function HomeLogin() {

  let router=useRouter();
 

  return (
    <center>
                <CustomerHeader/>

         <UserHomLogin/>
    <Footer/>
     </center>
  )
}

export default HomeLogin
