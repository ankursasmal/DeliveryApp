"use client" 
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function CushrefmerHeader(props) {

// let UserSignUpData=JSON.parse(localStorage.getItem('signUpuser')) && JSON.parse(localStorage.getItem('signUpuser'))   ;
let router=useRouter();
// console.log(UserSignUpData)


  // Initialize cart from localStorage or default to an empty array
  let initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  let [cartItems, setCartItems] = useState(initialCart);
  let [cartNo, setCartNo] = useState(initialCart.length);
let [userSignup,setUserSignup]=useState(null)

useEffect(() => {
  const storedUserSignup = JSON.parse(localStorage.getItem('signUpuser'));
  setUserSignup(storedUserSignup);
}, []); 

  // for add cart items
  useEffect(() => {
    if (props.cartData) {
      let newCartItems;
      if (cartNo > 0) {
        // If there are items in the cart, add the new item
        newCartItems = [...cartItems, props.cartData];
      } else {
        // If the cart is empty, initialize it with the new item
        newCartItems = [props.cartData];
        setCartNo(1);  
      }

      // Update state and localStorage
      setCartItems(newCartItems);
      localStorage.setItem('cart', JSON.stringify(newCartItems));
    }
  }, [props.cartData]); 
  // Ensure props.cartData is inside an array


// ** for remove cart items
useEffect(() => {
  if (props.removecartId) {
    let localCartItems = cartItems.filter(item => item._id !== props.removecartId);
    
    // Update state with the filtered cart items
    setCartItems(localCartItems);
    setCartNo(localCartItems.length);

    if (localCartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(localCartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }
}, [props.removecartId]);


// remove cart data after orderpalce
useEffect(()=>{
  if(props.removeCartData){
    setCartItems([]);
    setCartNo(0);
    localStorage.removeItem('cart');

  }
},[props.removeCartData])






// for 
const handelLogout=()=>{
  localStorage.removeItem('signUpuser');
  router.push('/signup')
}

  return (
    <div className='flex items-center justify-between flex-wrap fixed top-0 left-0 py-[1vw]  bg-slate-500 text-white px-2 w-[100%]'>
      <Link href="/" className='text-2vw md:text-1.6vw font-bold'>Home</Link>
 <div> 
 {userSignup?<> 
      <Link href='/myprofile' className='text-orange-400 text-1.3vw md:text-1.4vw ml-[2vw] h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center '> {userSignup.name[0].toUpperCase()}</Link>

      <button  type='button' className='text-red-300 text-1.3vw md:text-1. ml-[2vw]' onClick={handelLogout} >LogOut</button>
</>:
<>
       <Link href="/signup" className='text-1.3vw md:text-1.4vw ml-[2vw]'>SignUp</Link>
</>

}
      
{userSignup ?<Link href={cartNo?"/cart":"#"} className='text-1.3vw md:text-1.4vw ml-[2vw]'>Cart({cartNo ? cartNo : 0})</Link>:null}
      <Link href="/home" className='text-1.3vw md:text-1.4vw ml-[2vw]'>Add restruent</Link>
      <Link href='/deliveryPatner' className='text-1.3vw md:text-1.4vw ml-[2vw]'>Delivery Patner</Link>
</div>
    </div>
  )
}

export default CushrefmerHeader
