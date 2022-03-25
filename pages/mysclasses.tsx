import {
    arrayRemove,
    arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ClassQuickDisplay from '../components/ClassQuickDisplay'
import ClassRequests from '../components/ClassRequests'
import Header from '../components/Header'
import { db } from '../firebase'
import { Class } from '../typings'

function MysClasses() {
  const [user, setuser] = useState({
    name: '',
    email: '',
    school: '',
    role: '',
  })
  const [myclasses, setmyclasses] = useState<[Class, { id: string }]>()
  const [myclassreq, setmyclassreq] = useState<[Class, { id: string }]>()

  const { data: session } = useSession()

  const getUser = async () => {
    //@ts-ignore
    //@ts-ignore
    let docRef = doc(db, 'users', session?.user?.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      let info: any = docSnap.data()
      console.log(info.role)

      setuser(info)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  const getMyClasses = async () => {
    try {
      let docs = await getDocs(
        query(
          collection(db, 'classes'),
          //@ts-ignore
          where('students', 'array-contains', session?.user?.uid)
        )
      )
      let classlist: any = []
      docs.forEach((doc) => {
        classlist.push({ ...doc.data(), id: doc.id })
      })
      setmyclasses(classlist)
    } catch (error) {
      console.log(error)
    }
  }

  const getMyClassReq = async () => {
    try {
      let docs = await getDocs(
        query(
          collection(db, 'classes'),
          //@ts-ignore
          where(documentId(), 'in', user.classreq)
        )
      )
      let classlist: any = []
      docs.forEach((doc) => {
        classlist.push({ ...doc.data(), id: doc.id })
      })
      setmyclassreq(classlist)
      console.log(classlist)
    } catch (error) {
      console.log(error)
    }
  }

  const acceptreq = async (Id:string)=>{
      await setDoc(doc(db,'classes',Id),{
          //@ts-ignore
          students:arrayUnion(session?.user?.uid)
      },{merge:true})
      //@ts-ignore
      await setDoc(doc(db,'users',session?.user?.uid),{
        classreq:arrayRemove(Id)
      },{merge:true})
      //@ts-ignore
      setmyclasses([])
      //@ts-ignore
      setmyclassreq([])
      getMyClasses()
      getMyClassReq()
  }

  useEffect(() => {
    if (session) {
      getUser()
      getMyClasses()
    }
  }, [session])

  useEffect(() => {
    getMyClassReq()
  }, [user])

  return (
    <div>
      <Header selectedlink="myclasses" />
      <div className="min-h-screen bg-black text-white">
        <div className="mx-10 max-w-4xl pt-12 md:mx-auto xl:max-w-6xl">
          {user.role === 'student' && session ? (
            <div className="">
              <h1 className="text-4xl text-yellow-500">
                <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 bg-clip-text text-transparent ">
                  {session?.user?.name}
                </span>
                &apos;s classes
              </h1>
              <hr className="mb-5 mt-2 bg-white py-[1px]" />
              <div className="flex flex-col sm:grid sm:gap-5 sm:grid-cols-5">
              <div className="col-span-2 grid mb-16 grid-cols-1 gap-3 xl:grid-cols-2">
                  {myclassreq?.map((Class) => (
                    //@ts-ignore
                    <ClassRequests classData={Class} acceptReq={acceptreq} />
                  ))}
                </div>
                <div className="col-span-3 grid grid-cols-1 gap-5 xl:grid-cols-2">
                  {myclasses?.map((Class) => (
                    //@ts-ignore
                    <ClassQuickDisplay {...Class} />
                  ))}
                </div>
        
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

export default MysClasses
