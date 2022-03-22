import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ClassQuickDisplay from '../components/ClassQuickDisplay'
import Header from '../components/Header'
import { db } from '../firebase'
import { Class } from '../typings'

function MyClasses() {
  const [user, setuser] = useState({
    name: '',
    email: '',
    school: '',
    role: '',
  })
  const [myclasses, setmyclasses] = useState<[Class, { id: string }]>()

  const { data: session } = useSession()

  const getUser = async () => {
    //@ts-ignore
    //@ts-ignore
    let docRef = doc(db, 'users', session?.user?.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      let info: any = docSnap.data()
      console.log(info)

      let usercop: any = {
        name: info.name,
        email: info.email,
        school: info.school,
        role: info.role,
        //@ts-ignore
        uid: session?.user?.uid,
      }
      console.log(info.role)

      setuser(usercop)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  const getMyClasses = async () => {
    let docs = await getDocs(
      query(
        collection(db, 'classes'),
        //@ts-ignore
        where('teacherId', '==', session?.user?.uid)
      )
    )
    let classlist: any = []
    docs.forEach((doc) => {
      classlist.push({ ...doc.data(), id: doc.id })
    })
    setmyclasses(classlist)
  }

  useEffect(() => {
    if (session) {
      getUser()
      getMyClasses()
    }
  }, [session])

  return (
    <div>
      <Header selectedlink="myclasses" />
      <div className="min-h-screen bg-black text-white">
        <div className="mx-10 max-w-4xl pt-12 md:mx-auto xl:max-w-6xl">
          {user.role === 'teacher' && session ? (
            <div className="">
              <h1 className="text-4xl text-yellow-500">
                <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 bg-clip-text text-transparent ">
                  {session?.user?.name}
                </span>
                &apos;s classes
              </h1>
              <hr className='bg-white mb-5 mt-2 py-[1px]'/>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {myclasses?.map((Class) => (
                  //@ts-ignore
                  <ClassQuickDisplay {...Class} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="pt-20 text-white">
                Restricted page - you do not have access
              </p>
              <Link href={'/'} replace>
                <p className="text-yellow-500 transition-all hover:text-yellow-400 hover:underline">
                  Back Home
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyClasses
