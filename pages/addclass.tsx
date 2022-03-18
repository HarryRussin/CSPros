import { useRecoilState } from 'recoil'
import Header from '../components/Header'
import { userState } from '../atoms/atom'
import Link from 'next/link'
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

function Addclass() {
  const [user, setuser] = useRecoilState(userState)
  const { data: session } = useSession()

  const [name, setname] = useState('')
  const [id, setid] = useState('')
  const [err, seterr] = useState(false)

  const addClass = async (e: any) => {
    e.preventDefault()
    //@ts-ignore
    if (!name || !id) {
        seterr(true)
        return
    }
    await addDoc(collection(db, 'classes'), {
      className: name,
      classID: id ? id : name.split(' ').join().toUpperCase(),
      //@ts-ignore
      teacherId: session?.user?.uid,
      studentCount:0,
      teacherName:session?.user?.name,
      teacherEmail:session?.user?.email,
      created_at:serverTimestamp()
    })
  }

  const getUser = async () => {
    //@ts-ignore
    let docRef = doc(db, 'users', session?.user?.uid)
    console.log(docRef)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      let info = docSnap.data()
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
    }
  }

  useEffect(() => {
    session && getUser()
  }, [session])

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-black text-white">
        <div className="mx-10 max-w-4xl pt-16 md:mx-auto xl:max-w-6xl">
          {user.role !== 'teacher' || !session ? (
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
          ) : (
            <div className="">
              <p className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent">
                Add Class
              </p>
              <hr className="mb-5 bg-white py-[1px]" />
              <form onSubmit={(e) => addClass(e)}>
                <div className="md:items-left mb-6 flex max-w-6xl flex-col">
                  <div className="mb-2">
                    <label className="mb-2 block pr-4 text-xl font-bold text-yellow-500 md:mb-0">
                      Class Name
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                      type="text"
                      placeholder="eg. Year 11 Computer Science set 2"
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:items-left mb-6 flex max-w-6xl flex-col">
                  <div className="mb-2">
                    <label className="mb-2 block pr-4 text-xl font-bold text-yellow-500 md:mb-0">
                      Class Id -{' '}
                      <span className="text-yellow-300">
                        something easy to remember and search
                      </span>
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                      type="text"
                      placeholder="eg. KP11"
                      onChange={(e) => setid(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="button py-2">
                  Add class
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Addclass
