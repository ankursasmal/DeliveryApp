"use client" 
import React, { useEffect, useState } from 'react'
import CustomerHeader from '@/app/_component/CustomerHeader';
function page(props) {
let [restruentInfo,setRestruentInfo]=useState([]);
let [foods,setFood]=useState([]);
let [cart,setcart]=useState('');
let [removecartId,setremovecartId]=useState(undefined);
let [cartStore,setCartStore ]=useState(JSON.parse(localStorage.getItem('cart')) || [])

//  console.log(cartStore) it is all cart items array
let [ cartId,setcartId]=useState(()=>{
 return cartStore? cartStore.map((val)=>{
    return val._id;
  }):[]
})
// console.log(cartId) //*** array of add cat id data

  // props for dynamic route name get
  let name=props.params.name;

//  ******** for recive id (?) ks searchParams bola hoi ************
// console.log(props)
let id=props.searchParams.id;
// console.log(id);

const loadRestruentDetail=async()=>{
  try{
    
    let res= await fetch(`http://localhost:3000/api/customer/${id}`);
  let data=await res.json();
  if(data.success){
setRestruentInfo(data.userInfo);
setFood(data.foodDetail);
console.log('data come');
  }
}
catch(e){
  console.log('dtat not come')
}
}

useEffect(()=>{
  loadRestruentDetail();
},[])

// on click cart add
let AddtoCart=(val)=>{
setcart(val);
// onclick instant button change
 let localCartId=[...cartId,val._id];
//  setcartId ta add new id now new cartId with extra data
 setcartId(localCartId);

 //add cart casa setremovecartId();
setremovecartId();
 }

//  onclick remove cart data
let RemoveCart=(val)=>{
 setremovecartId(val._id);
// console.log(removecartId);
let localCartId= cartId.filter((id)=>{
  return id!==val._id;
})
// setcartIs is Ids array
setcartId(localCartId);

 //remove cart casa setcart();
setcart();

 }


// console.log(restruentInfo,foods)

  return (
    <div>
      <CustomerHeader cartData={cart}  removecartId={removecartId}/>
      {/* use for only name not extra char */}
      <h1 className='absolute top-[8vw] left-[39vw] text-[5vw] font-bold text-white'>{decodeURI(name)}</h1>
      <img className="w-[100vw] h-[24vw]  " src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg"  alt="" />
     
    
     <div className='flex items-center justify-center flex-col '>
      <h1 className='text-[4vw] font-bold py-3'>Restruent Details and Food items</h1>
{restruentInfo.map((val,i)=>{
return (
  <div key={i} className='flex flex-col py-3 px-[20vw] rounded-xl  shadow-xl bg-green-200'>
<h1 className='text-[3vw]'>{val.name}</h1>
<a className='py-1'>{val.email}</a>
<a>{val.phone}</a>
<a className='py-1'>{val.city}</a>
<a>{val.resturent}</a>
 
  </div>
)
})

}
</div>

<div className='flex items-center justify-center flex-col '>
      <h1 className='text-[4vw] font-bold py-3'>Food menus</h1>
{ foods.length==0 ?
<h1 className='text-[2.5vw] text-red-400'>Food Items are Not avilable </h1>: 
foods.map((val,i)=>{
return (
  <div key={i} className='flex flex-col py-3 pl-[4vw] rounded-xl m-3  shadow-xl w-[40%] flex-wrap  bg-violet-300'>
<h1 >{val.name}</h1>
<a className='py-1'>{val.price}</a>
 <a className='py-1'>{val.path}</a>
<a>{val.Description}</a>

{  cartId.includes(val._id)?<button className='text-white px-[6px] self-center bg-blue-600 py-[3px] hover:bg-red-500 rounded-lg mt-2' onClick={()=>{RemoveCart(val)}}>Remove from Cart</button>:
<button className='text-white px-[6px] self-center bg-blue-600 py-[3px] hover:bg-red-500 rounded-lg mt-2' onClick={()=>{AddtoCart(val)}}>Add to Cart</button>
 
 }

  </div>
)
})

}
     </div>
     
     
      </div>
  )
}

export default page

