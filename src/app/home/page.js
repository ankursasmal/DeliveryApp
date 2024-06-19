"use client" 
import React, { useState } from "react"
import Login from "../_component/login"
import Signup from "../_component/signup"
function page() {
let [see,setsee]=useState(true);
  return (
    <div className="flex items-center justify-center flex-col">
        {see?<Signup/>:<Login/>}

<button className="pt-4 text-blue-600" onClick={()=>setsee(see?false:true)}>{see?"already account?Login":'Do not have account?Signup'}</button> 


 </div>
  )
}

export default page
