import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { db } from '../firebase'
import { Class } from '../typings'

function ClassQuickDisplay(props: Class, ) {
  const { data: session } = useSession()
  const history = useRouter()

  const [joined, setjoined] = useState(false)

  const leaveClass = async ()=>{
    await setDoc(
      doc(db, 'classes', props.id),
      {
        //@ts-ignore
        students: arrayRemove(session?.user?.uid),
        //@ts-ignore
        requests:arrayRemove(session?.user?.uid)
      },
      { merge: true }
    )
      history.reload()
  }

  const requestClass = async ()=>{
    await setDoc(
      doc(db, 'classes', props.id),
      {
        //@ts-ignore
        requests: arrayUnion(session?.user?.uid),
      },
      { merge: true }
    )
  }

  return (
    <div className="flex w-full h-40 space-x-2 rounded bg-yellow-500 p-2">
      <div className="w-[70%] rounded bg-yellow-300 p-2 text-black">
        <p className="text-wrap overflow-hidden overflow-ellipsis text-lg font-semibold">
          {props.className[0].toUpperCase() + props.className.substring(1)}
        </p>
        <p className="overflow-hidden overflow-ellipsis text-xs text-gray-800">
          {props.classID}
        </p>
      </div>
      <div className={`flex w-[30%] flex-col space-y-2 rounded bg-yellow-300 p-2`}>
        <Link href={`/class/${props.id}`}>
          <div className="w-full h-full text-center flex items-center justify-center rounded bg-green-400 p-2 text-black transition-all hover:bg-green-500">
            <p className="text-center font-bold">See Class</p>
          </div>
        </Link>
        
        {
          //@ts-ignore
        session?.user?.uid !== props.teacherId && (
          <> 
          {//@ts-ignore
          props.students.includes(session?.user?.uid) || props.requests.includes(session?.user?.uid)?
          <div onClick={leaveClass} className="w-full hover:bg-red-500 rounded active:bg-red-300 bg-red-400 p-2 text-black">
          <p className="text-center font-bold">Leave Class</p>
        </div>
          :
          <>
          {joined?
          <div className="w-full hover:bg-green-500 rounded active:bg-green-300 bg-green-400 p-2 text-black">
            <p className="text-center font-bold">Joined</p>
          </div>
          :
          <div onClick={()=>{requestClass();setjoined(true)}} className="w-full hover:bg-blue-500 rounded active:bg-blue-300 bg-blue-400 p-2 text-black">
          <p className="text-center font-bold">Request to join</p>
        </div>
}
          </>
}
          </>
        )}
      </div>
    </div>
  )
}

export default ClassQuickDisplay
