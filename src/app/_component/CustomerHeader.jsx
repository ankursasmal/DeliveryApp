"use client" 
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function CushrefmerHeader(props) {

// let UserSignUpData=JSON.parse(localStorage.getItem('signUpuser')) && JSON.parse(localStorage.getItem('signUpuser'))   ;
let router=useRouter();
// console.log(UserSignUpData)


  // Initialize cart from localStorage or default to an empty array
  let initialCart=[];
  let [cartItems, setCartItems] = useState(initialCart);
  let [cartNo, setCartNo] = useState(initialCart?.length || 0);
let [userSignup,setUserSignup]=useState(null)

useEffect(()=>{
    initialCart = JSON.parse(localStorage.getItem('cart')) || [];

},[initialCart])

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
    <div className='flex items-center justify-between flex-wrap py-2.5  bg-slate-500 text-white px-2'>
      <Link href="/" className='text-2vw md:text-1.6vw font-bold'>Home</Link>
 {userSignup?<> 
      <Link href='/myprofile' className='text-orange-400 text-1.3vw md:text-1.4vw'> {userSignup.name}</Link>

      <button  type='button' className='text-red-300 text-1.3vw md:text-1.4vw' onClick={handelLogout} >LogOut</button>
</>:
<>
<Link href="/homelogin" className=' text-1.3vw md:text-1.3vw'>Login</Link>
      <Link href="/signup" className='text-1.3vw md:text-1.4vw'>SignUp</Link>
</>

}
      
      <Link href={cartNo?"/cart":"#"} className='text-1.3vw md:text-1.4vw'>Cart({cartNo ? cartNo : 0})</Link>
      <Link href="/home" className='text-1.3vw md:text-1.4vw'>Add restruent</Link>
      <Link href='/deliveryPatner' className='text-1.3vw md:text-1.4vw'>Delivery Patner</Link>

    </div>
  )
}

export default CushrefmerHeader
