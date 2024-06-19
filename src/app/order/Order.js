"use client" 
 import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_component/CustomerHeader'
import Footer from '../_component/Footer'
import { Delivery_Charge, Tax } from '../cart/constant'
import { useRouter } from 'next/navigation'

     function Order() {
        let router=useRouter();
        let [userAuthStorage,setuserAuthStorage]=useState(JSON.parse(localStorage.getItem('signUpuser')) && JSON.parse(localStorage.getItem('signUpuser')));
    let [removeCartData,setremoveCartData]=useState(false)
        let [cartStorage, setCartStorage] = useState([]);
        let [price, setPrice] = useState(0);
      
        useEffect(() => {
          if (typeof window !== 'undefined') {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartStorage(storedCart);
           
            const totalPrice = storedCart.length === 1
            ? storedCart[0].price
            : Array.isArray(storedCart) 
              ? storedCart.reduce((accumulator, item) => {
                return accumulator + item.price;
              }, 0) 
              : 0;
            setPrice(totalPrice);
          }
        }, []);


let placeOrder=async()=>{
    let user_id=userAuthStorage._id;
let resto_id=cartStorage[0].restro_id;
let foodItem=cartStorage.map((val)=>{ return val._id}).toString();

// for delivery boy id
let deliveryBoyResponce=await fetch(`http://localhost:3000/api/deliverypatner/${userAuthStorage.city}`);
  deliveryBoyResponce=await deliveryBoyResponce.json();
  // present city ta delivery boys detail get
// console.log(deliveryBoyResponce);

let DeliveryBoyIdArray=deliveryBoyResponce.deliveryBoy?.map((val)=>{
  return val._id;
});

// console.log(DeliveryBoyIdArray)

 // delivery boy arrray thaka randomly jako akta delivery patner ka choose
// 1st isempty check
 var rendomDeliveryBoy;
if(!DeliveryBoyIdArray){
  window.alert('delivery patner not available');
  return false;
}
// 2st  not isempty check
else{
  // random delivery patner allot
  rendomDeliveryBoy = DeliveryBoyIdArray[(Math.floor(Math.random() * DeliveryBoyIdArray.length))];
// console.log(rendomDeliveryBoy);
}
 

// object which post req
 let collection={
    user_id:user_id,
    resto_id:resto_id,
    foodItem:foodItem,
    deliveryBoy:rendomDeliveryBoy ,
    status:'confirm',
    ammount:price+Delivery_Charge+(price*Tax/100),
}

// console.log(collection)

try{
    let res=await fetch('http://localhost:3000/api/order',{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(collection)

    })  
      let data=await res.json();

if(data.success){
    alert('oredr success');
setremoveCartData(true);
router.push('/myprofile');
}
}
catch(e){
    alert('oredr fail')

}

}

    return (
    <div>
          <CustomerHeader  removeCartData={removeCartData}/>
 <div>
 <button button className='text-white absolute top-[8vw] right-4 px-[6px] bg-blue-600 py-[3px] hover:bg-red-500 rounded-lg mt-2' onClick={placeOrder} >Place your Order Now</button>

 </div>
          <div className='flex items-center justify-around mx-4  mb-10 rounded-lg shadow-lg w-[80vw]'>
<div className='flex flex-col foodCart   mt-4   p-4 '>
   <h1 className='text-[3vw] mt-20'>User Details</h1>
    <div className='flex margin-left: 10px;
  items-center'> 
<a > Name:</a> <a>{userAuthStorage.name}</a>
</div>
<div className='flex margin-left: 10px;
  items-center'> 
<a>Address:</a>
<a className='text-end'>{userAuthStorage.city} </a>
</div>
<div className='flex margin-left: 10px;
 items-center'> 
<a>Phone No.:</a>
<a>{userAuthStorage.phone}</a>
</div>
 
<div className='ml-6'>

</div>
</div>
 </div>
<h1 className='text-[3vw] mt-3'>Order Ammount Detail</h1> 
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
 </div>

<h1 className='text-[3vw] mt-3'>Payment Method</h1> 
<div className='flex ml-[14vw]  '> 
 <h1>Case on Delivery:</h1>
 <div className='flex flex-col '> 
<a>Total Ammount:</a>
<a>{price+Delivery_Charge+(price*Tax/100)}</a>
</div>
</div>
 
<Footer/>
    </div>
  )
}

export default Order
