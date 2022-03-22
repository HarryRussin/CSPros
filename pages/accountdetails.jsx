import Header from '../components/Header'
import Footer from '../components/Footer'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../atoms/atom'

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/router'

function Account() {
  const { data: session } = useSession()
  const [school, setschool] = useState('')
  const [className, setclassName] = useState('')
  const [role, setrole] = useState('')
  const history = useRouter()

  const [classCount, setclassCount] = useState(0)
  const [editSch, seteditSch] = useState(false)
  const [norole, setnorole] = useState(false)
  const [user, setuser] = useRecoilState(userState)
  let userid = session?.user?.uid

  const changeSchool = async (e) => {
    e.preventDefault()

    await setDoc(
      doc(db, 'users', userid),
      {
        school: school.toLocaleLowerCase(),
      },
      { merge: true }
    )
    seteditSch(false)
    getClassCount()
  }

  const getClassCount = async () => {
    let docs = await getDocs(
      query(
        collection(db, 'classes'),
        where('teacherId', '==', session?.user?.uid)
      )
    )
    let c = 0
    docs.forEach((doc) => c++)
    setclassCount(c)
  }

  const getUser = async () => {
    let docRef = doc(db, 'users', userid)
    console.log(docRef)
    const docSnap = await getDoc(docRef)
    getClassCount()

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      let info = docSnap.data()
      setschool(info.school)
      info.class && setclassName(info.class)
      setrole(info.role)
      let usercop = {
        name: info.name,
        email: info.email,
        school: info.school,
        role: info.role,
      }
      setuser(usercop)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      setnorole(true)
    }
  }

  useEffect(() => {
    session && getUser()
  }, [session])

  return (
    <div className="bg-black text-white">
      <Header selectedlink={'account'}/>

      <div className="md:mx-auto mx-5 h-screen md:max-w-4xl xl:max-w-6xl">
        {session && !norole ? (
          <div className="my-10 flex flex-col justify-center">
            <div className="flex justify-between">
              <p className="mb-2 text-2xl font-semibold">Account Details</p>
              {role && (
                <p className="bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text text-4xl text-transparent">
                  <span>{role[0].toUpperCase()}</span>
                  {role.substring(1)}
                </p>
              )}
            </div>
            <div className="flex space-x-5 text-sm">
              <div className="">
                <p>Name: </p>
                <p>Email: </p>
                <p>School: </p>
                {role === 'teacher' ? (
                  <p>Total Classes:</p>
                ) : (
                  <p>Class Name: </p>
                )}
              </div>
              <div className="font-semibold">
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
                {!editSch ? (
                  <p>
                    {school ? (
                      school[0].toUpperCase() + school.substring(1)
                    ) : (
                      <span className="underline">No Assigned Class yet</span>
                    )}
                  </p>
                ) : (
                  <form onSubmit={(e) => changeSchool(e)}>
                    <input
                      onChange={(e) => setschool(e.target.value)}
                      placeholder={school}
                      type="text"
                      className="rounded bg-transparent px-1 font-semibold text-black ring-1 ring-white focus:bg-white focus:outline-none "
                    />
                  </form>
                )}
                {role === 'teacher' ? (
                  <p>{classCount}</p>
                ) : (
                  <p>
                    {className ? (
                      className.toUpperCase()
                    ) : (
                      <p className="underline">No Assigned Class Leader yet</p>
                    )}
                  </p>
                )}
              </div>
            </div>
            <hr className="mt-4 bg-white py-[1px]" />
            <div className="md:flex-row flex flex-col space-y-2 md:space-y-0 md:space-x-6 pt-5">
              <p
                onClick={() => {
                  signOut()
                }}
                className="button py-3 text-xl"
              >
                Log out
              </p>
              <p
                onClick={() => {
                  seteditSch(!editSch)
                }}
                disabled
                className="button py-3 text-xl"
              >
                {editSch ? 'Cancel' : 'Change School'}
              </p>
              {role && role === 'teacher' && (
                <p
                  className="button py-3 text-xl"
                  onClick={() => history.replace('/addclass')}
                >
                  Add Class
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            {!norole ? (
              <div className="">
                <p className="pt-40 text-white">Log in to access this page</p>
                <Link href={'/'} replace>
                  <p className="text-yellow-500 transition-all hover:text-yellow-400 hover:underline">
                    Back Home
                  </p>
                </Link>
              </div>
            ) : (
              <div className="">
                <p className="pt-40 text-white">Sign up to access this page</p>
                <p className="text-yellow-500">
                  <Link href={'/join-us'} replace>
                    <span className="transition-all hover:text-yellow-400 hover:underline">
                      Sign up
                    </span>
                  </Link>{' '}
                  <span className="text-yellow-300">OR</span>{' '}
                  <span onClick={()=>signOut()} className="transition-all hover:text-yellow-400 hover:underline">
                    Log out
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Account
