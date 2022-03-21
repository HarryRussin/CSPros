import {
  doc,
  getDoc,
} from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ClassHeader from '../../components/ClassHeader'
import ClassStream from '../../components/classStream'
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
  }, [db,classData])

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
              <ClassStream classData={classData} teacher={teacher}/>
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
