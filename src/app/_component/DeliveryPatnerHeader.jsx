'use client'
 import Link from 'next/link'
import { useRouter } from 'next/navigation';
 
function CushrefmerHeader(props) {
 let router=useRouter();

//  logout
 let handelLogout=()=>{
localStorage.removeItem('delivery');
router.push('/deliveryPatner')
 }

  return (
    <div className='flex items-center justify-between py-2 bg-slate-500 text-white'>
      <Link href='/'>Home</Link>
      <Link href="/deliveryDashbord">DeliveryBoy Home</Link>
      <button onClick={handelLogout}>LogOut</button>


    </div>
  )
}

export default CushrefmerHeader
