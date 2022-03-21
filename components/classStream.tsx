import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Announcement, Class } from '../typings'
import ClassStreamAnnouncement from './ClassStreamAnnouncement'

function ClassStream({
  classData,
  teacher,
}: {
  classData: Class
  teacher: { name: string; email: string; school: string; image: string }
}) {
  const [openannounce, setopenannounce] = useState(false)
  const [announcement, setannouncement] = useState('')
  const [announcements, setannouncements] = useState<any>([])

  const { data: session } = useSession()

  const addAnnouncementToStream = async () => {
    if (announcement) {
      let docsnap = await addDoc(collection(db, 'stream_announcements'), {
        message: announcement,
        //@ts-ignore
        publisherId: session?.user?.uid,
        timestamp: serverTimestamp(),
        classId: classData.id,
      })
      if (docsnap) {
        console.log('announcement added with id ' + docsnap.id)
        //@ts-ignore
        let announcementcop = JSON.parse(JSON.stringify(announcements))
        //@ts-ignore
        console.log([{message:announcement,publisherId:session?.user?.uid},...announcementcop]);
        
        //@ts-ignore
        setannouncements([{message:announcement,publisherId:session?.user?.uid},...announcementcop])
        setannouncement('')
      }
      setopenannounce(false)
    }
  }

  const getAllStreamAnnouncements = async () => {
    let docsnap = await getDocs(
      query(
        collection(db, 'stream_announcements'),
        where('classId', '==', classData.id),
        orderBy('timestamp')
      )
    )
    let docs: any = []
    docsnap.forEach((doc) => {
      docs.push(doc.data())
    })
    setannouncements(docs)
    console.log(docs)
  }

  useEffect(() => {
    classData && getAllStreamAnnouncements()
  }, [db, classData])

  return (
    <div className="pb-10">
      {/* BANNER */}
      <div className="flex h-[200px] flex-col justify-between rounded-lg bg-gradient-to-tr from-gray-500 to-gray-400 p-5">
        <div className="flex items-center justify-end space-x-4 text-xl">
          <p>{teacher.name}</p>
          <img
            className="h-10 w-10 rounded-full shadow-xl"
            //@ts-ignore
            src={teacher.image}
            alt=""
          />
        </div>

        <p className="text-2xl font-bold text-yellow-500">
          {classData.className}
        </p>
      </div>
      {/* ADD CLASS */}
      <div className="">
        {!openannounce ? (
          <div className="relative mt-3 mb-5 shadow rounded shadow-white">
            <button
              onClick={() => setopenannounce(true)}
              className="h-16 w-full appearance-none rounded border-2 border-gray-200 bg-gray-100 px-4 pl-14 text-left text-sm leading-tight text-gray-700 hover:bg-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none"
            >
              Announce something to your class
            </button>
            {session && (
              <img
                className="absolute top-3 left-2 h-10 w-10 rounded-full"
                //@ts-ignore
                src={session?.user?.image}
                alt=""
              />
            )}
          </div>
        ) : (
          <div className="pb-10">
            <div className="mt-3 rounded-lg bg-gray-50 p-5 text-black">
              <textarea
                onChange={(e) => setannouncement(e.target.value)}
                className="h-full w-full rounded-lg bg-gray-100 p-2 transition-all placeholder:text-sm focus:outline-none focus:placeholder:text-xs"
                placeholder="Announce something to your class"
                rows={6}
              ></textarea>
              <hr />
              <div className="mt-3 flex justify-end space-x-5 text-sm">
                <button onClick={() => setopenannounce(false)}>Cancel</button>
                <button
                  onClick={addAnnouncementToStream}
                  className="rounded-lg bg-yellow-500 p-2 px-7 transition-all hover:bg-purple-300"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* SHOW ANNOUNCEMENTS */}
      <div className="flex  flex-col space-y-3 scrollbar-thumb-slate-300 scrollbar overflow-auto max-h-[500px] scrollbar-thin">
        {announcements.map((announcement:Announcement) => (
          <ClassStreamAnnouncement announcement={announcement} />
        ))}
      </div>
    </div>
  )
}

export default ClassStream
