import { UserCircleIcon } from '@heroicons/react/outline'
import { doc, getDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function ClassHeader({teacherID,selectedlink,setselectedl}:{teacherID:string,selectedlink:string,setselectedl:any}) {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 z-10 flex w-full bg-yellow-500 py-4 px-4 text-black md:justify-center">
      <div className="flex w-full justify-between space-x-10  md:max-w-4xl md:items-center">
        <Link href={'/'}>
          <div className="flex items-center ">
            {/* <img
              className="w-13 h-11"
              src="https://static.wixstatic.com/media/fb2250_a5792a2065054afab6a87f0dc33b2fa5~mv2.png/v1/crop/x_0,y_0,w_1684,h_1377/fill/w_93,h_75,al_c,usm_0.66_1.00_0.01,enc_auto/Black%20on%20Transparent.png"
              alt=""
            /> */}
            <p className="text-[1.9rem] font-bold">PseudoBlox</p>
          </div>
        </Link>

        {//@ts-ignore
        session?.user?.uid === teacherID ? (
          <div className="hidden space-x-4 rounded-md overflow-hidden md:flex ">
            <p onClick={()=>setselectedl('stream')} className={`classlink ${selectedlink==='stream'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>Stream</p>
            <p onClick={()=>setselectedl('classwork')} className={`classlink ${selectedlink==='classwork'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>Classwork</p>
            <p onClick={()=>setselectedl('people')} className={`classlink ${selectedlink==='people'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>People</p>
            <p onClick={()=>setselectedl('manage')} className={`classlink ${selectedlink==='manage'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>Manage Class</p>
          </div>
        ) : (
          <div className="hidden space-x-4 md:flex ">
            <p onClick={()=>setselectedl('stream')} className={`classlink ${selectedlink==='stream'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>Stream</p>
            <p onClick={()=>setselectedl('classwork')} className={`classlink ${selectedlink==='classwork'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>Classwork</p>
            <p onClick={()=>setselectedl('people')} className={`classlink ${selectedlink==='people'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>People</p>
          </div>
        )}
        <Link href={`/${session ? 'accountdetails' : 'auth/signin'}`}>
          {session ? (
            //@ts-ignore
            <img
            //@ts-ignore
              src={session?.user?.image}
              className="h-10 w-10 rounded-full"
              //@ts-ignore
              alt={session?.user?.name}
            />
          ) : (
            <UserCircleIcon className="h-10 w-10" />
          )}
        </Link>
      </div>
    </div>
  )
}

export default ClassHeader
