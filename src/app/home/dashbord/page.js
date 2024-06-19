"use client" 
import AddfoodItem from "@/app/_component/AddfoodItem"
import FoodItemShow from "@/app/_component/FoodItemShow";
import { useState } from "react"

 
function page() {
  let [additem,setitem]=useState(false);
  return (
    <center>
      <button onClick={()=>setitem(true)} className="px-4 py-2 bg-blue-400 text-white rounded-lg mr-5 mt-4 ">Add food Items</button>
      <button onClick={()=>setitem(false)}  className="px-2 py-2 bg-red-400 text-white rounded-lg mt-4">DashBord</button>
{additem?
<AddfoodItem /> :<FoodItemShow/>}

  </center>
  )
}

export default page
