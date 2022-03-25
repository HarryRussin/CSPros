import { XIcon } from '@heroicons/react/outline'
import { arrayRemove, doc, getDoc, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'

function StudentProfile({
  studentId,
  removeUser,
  teacherId,
}: {
  studentId: string
  removeUser: any
  teacherId: string
}) {
  const [user, setuser] = useState<any>()
  const {data:session} = useSession()

  const getuser = async () => {
    let student = await getDoc(doc(db, 'users', studentId))
    let info = Object.assign({ id: student.id }, student.data())
    setuser(info)
  }

  useEffect(() => {
    getuser()
  }, [])

  return (
    <div className="w-full p-2 hover:bg-gray-200">
      {user ? (
        <div className="flex items-center space-x-2">
          <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
          <div className="flex-1">
            <p>{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
          {
            //@ts-ignore
            teacherId === session?.user?.uid && (
              <XIcon
                onClick={() => removeUser(studentId)}
                className="h-8 w-8 rounded-full text-red-500 shadow-xl hover:bg-red-100 hover:text-red-600"
              />
            )
          }
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default StudentProfile
