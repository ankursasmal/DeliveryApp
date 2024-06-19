"use client" 
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_component/CustomerHeader'
import Footer from '../_component/Footer'
import { Delivery_Charge, Tax } from './constant'
import { useRouter } from 'next/navigation'

     function Cart() {
      let [noOfItem,setnoOfItem]=useState(1);
      let router=useRouter();
        let [cartStorage, setCartStorage] = useState([]);
        let [price, setPrice] = useState(0);
      
        useEffect(() => {
          if (typeof window !== 'undefined') {
            const storedCart = JSON.parse(localStorage.getItem('cart'))   ;
            setCartStorage(storedCart);
            const totalPrice = storedCart?.length === 1
            ? storedCart[0].price*noOfItem
            : Array.isArray(storedCart) 
              ? storedCart?.reduce((accumulator, item) => {
                return accumulator + (item.price)*noOfItem;
              }, 0) 
              : 0;
             setPrice(totalPrice);
          }

 // dependency in [noOfItem] so ***current change reflect** useEffect last movmet work
// else increment a no price change hocha but not reflect      // 
}, [noOfItem]);
        // console.log(price)
 

// order now button
let orderNow=()=>{
  if(JSON.parse(localStorage.getItem('signUpuser'))){
  router.push('/order')
  }
  else{
    // query dia chi mana /signup route a props ar madhama query korta hoba
    router.push('/signup')
  }

}


    return (
    <div>
          <CustomerHeader/>

            {cartStorage?.length>0?
<>     
<div className='flex items-center justify-center flex-wrap'>
   
    {cartStorage?.length>0?
        cartStorage.map((val,i)=>{
            return (
                <div key={i} className='flex flex-col py-3 pl-[4vw] rounded-xl m-3  shadow-xl w-[40%] flex-wrap  bg-violet-300'>
              <h1 >Food Name:{val.name}</h1>
              <a className='py-1'>Price:{val.price}</a>
               <a className='py-1'>image:{val.path}</a>
              <a>Description:{val.Description}</a>
              
           
           {/* cart a problmd 1 single single kora + - hoba */}
                <div className='flex items-end justify-end mr-3'>
                <a onClick={()=>setnoOfItem((val)=>val+1)}>+</a> <a className='px-2'>{noOfItem}</a> <a onClick={()=>{noOfItem>0?setnoOfItem(val=>val-1):setnoOfItem(0)}}>-</a>
                </div> 
               
              
                </div>
              )
        }):<h1>No food Items add for tshi restruent</h1>

    }

</div>
<div className='flex items-center justify-around mx-4  mb-10 rounded-lg shadow-lg w-[80vw]'>
<div className='flex flex-col foodCart   mt-4   p-4 '>
    <div className='flex margin-left: 10px;
  items-center'> 
<a > Food Charges=</a> <a>{price}</a>
</div>
<div className='flex margin-left: 10px;
  items-center'> 
<a>Tax:</a>
<a className='text-end'>{price*Tax/100} </a>
</div>
<div className='flex margin-left: 10px;
 items-center'> 
<a>Delivery chrges:</a>
<a>{Delivery_Charge}</a>
</div>
<div className='flex margin-left: 10px;
 items-center'> 
<a>Total Ammount:</a>
<a>{price+Delivery_Charge+(price*Tax/100)}</a>
</div>
<div className='ml-6'>

</div>
</div>
 <button className='text-white px-[6px] self-center bg-blue-600 py-[3px] hover:bg-red-500 rounded-lg mt-2' onClick={orderNow} >Order Now</button>
</div>
 </>
 :<h1 className='text-center text-[3vw] text-red-400 mt-4'>No items add to the cart</h1>
  }
<Footer/>
    </div>
  )
}

export default Cart
