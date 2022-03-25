import { doc, getDoc } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ClassHeader from '../../components/ClassHeader'
import ClassManage from '../../components/ClassManage'
import ClassStream from '../../components/classStream'
import Footer from '../../components/Footer'
import { db } from '../../firebase'
import { Class } from '../../typings'

interface Props {
  classdata: Class
}

function Class({ classdata}: Props) {
  const [teacher, setteacher] = useState({
    name: '',
    email: '',
    school: '',
    image: '',
  })
  const [selectedl, setselectedl] = useState('stream')
  const [classData, setclassData] = useState(classdata)

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

  const getData = async () => {
    const docRef = doc(db, 'classes', classData.id)
    const docSnap = await getDoc(docRef)
    const data:any = Object.assign({ id: docSnap.id }, docSnap.data())
    setclassData(data)
  }

  useEffect(() => {
    classData.className && getTeach()
  }, [db, classData])

  return (
    <div>
      <ClassHeader
        teacherID={classData.teacherId}
        selectedlink={selectedl}
        setselectedl={setselectedl}
      />

      <div className="min-h-screen bg-black text-white">
        {classData.className? (
          <div className="mx-10 pt-16 md:mx-auto md:max-w-3xl xl:max-w-6xl">
            {/* STREAM */}
            {selectedl === 'stream' && (
              <ClassStream classData={classData} teacher={teacher} />
            )}
            {selectedl === 'manage' && (
              <ClassManage classData={classData} getNewData={getData} teacher={teacher} />
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="pt-40 text-white">No class with that id</p>
            <p className="text-yellow-500">
              <Link href={'/'} replace>
                <span className="transition-all hover:text-yellow-400 hover:underline">
                  Go Home
                </span>
              </Link>
            </p>
          </div>
        )}
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
  return { props: { classdata: JSON.parse(JSON.stringify(data))} }
}

export default Class
