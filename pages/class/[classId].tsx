import { doc, getDoc } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ClassHeader from '../../components/ClassHeader'
import Footer from '../../components/Footer'
import { db } from '../../firebase'
import { Class } from '../../typings'

interface Props {
  classData: Class
}

function Class({ classData }: Props) {
  const [teacher, setteacher] = useState({
    name: '',
    email: '',
    school: '',
    image: '',
  })
  const [selectedl, setselectedl] = useState('stream')
  const [openannounce, setopenannounce] = useState(false)

  const { data: session } = useSession()

  const getTeach = async () => {
    let teach: any = await getDoc(doc(db, 'users', classData.teacherId))
    teach = teach.data()
    setteacher({
      name: teach.name,
      email: teach.email,
      school: teach.school,
      image: teach.image,
    })
  }

  useEffect(() => {
    classData && getTeach()
  }, [db, classData])

  return (
    <div>
      <ClassHeader
        teacherID={classData.teacherId}
        selectedlink={selectedl}
        setselectedl={setselectedl}
      />

      <div className="min-h-screen bg-black text-white">
        <div className="mx-10 pt-16 md:mx-auto md:max-w-3xl xl:max-w-6xl">
          {/* STREAM */}
          {selectedl === 'stream' && (
            <div className="">
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
                  <div className="relative mt-3">
                    <button
                      onClick={() => setopenannounce(true)}
                      className="h-16 w-full appearance-none rounded border-2 hover:bg-gray-300 border-gray-200 bg-gray-100 px-4 pl-14 text-left text-sm leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
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
                ) : <div className="pb-10">
                 <div className="bg-gray-50 p-5 rounded-lg mt-3 text-black">
                    <textarea className='w-full h-full bg-gray-100 placeholder:text-sm p-2 focus:outline-none rounded-lg focus:placeholder:text-xs transition-all' placeholder='Announce something to your class' rows={6}></textarea>
                    <hr />
                    <div className="flex text-sm justify-end mt-3 space-x-5">
                    <button onClick={()=>setopenannounce(false)}>Cancel</button>
                    <button className='bg-yellow-500 p-2 rounded-lg px-7 hover:bg-purple-300 transition-all'>Post</button>
                    </div>
                    </div>
                    </div>}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const docRef = doc(db, 'classes', ctx.query.classId)
  const docSnap = await getDoc(docRef)
  const data = Object.assign({ id: docSnap.id }, docSnap.data())
  if (!data) return { notFound: true }
  return { props: { classData: JSON.parse(JSON.stringify(data)) } }
}

export default Class
