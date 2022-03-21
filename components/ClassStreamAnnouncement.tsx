import { doc, getDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Announcement } from '../typings'

function ClassStreamAnnouncement({
  announcement,
}: {
  announcement: Announcement
}) {
  const [poster, setposter] = useState<any>()

  const getUser = async () => {
    console.log(announcement.publisherId)

    let postee = await getDoc(doc(db, 'users', announcement.publisherId))
    console.log(postee.data())

    setposter(postee.data())
  }

  useEffect(() => {
    announcement.publisherId && getUser()
  }, [announcement])

  return (
      <div className="relative shadow rounded shadow-white">
    <div className="flex h-16 w-full appearance-none items-center rounded border-2 border-gray-200 bg-gray-100 px-4 pl-14 text-left text-sm font-semibold leading-tight text-gray-700 ">
      <p><span className='font-bold'>{poster?.name}</span> says {announcement.message}</p>
      <img
        src={poster?.image}
        alt=""
        className="absolute top-3 left-2 h-10 w-10 rounded-full"
      />
    </div>
    </div>
  )
}

export default ClassStreamAnnouncement
