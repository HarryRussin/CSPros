import { UserCircleIcon } from '@heroicons/react/outline'
import { doc, getDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function Header() {
  const { data: session } = useSession()
  const [user, setuser] = useState({
    name: '',
    email: '',
    school: '',
    role: '',
  })

  const getUser = async () => {
    //@ts-ignore
    if (!session?.user?.uid) {
      //@ts-ignore
      let docRef = doc(db, 'users', session?.user?.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        let info: any = docSnap.data()
        let usercop: any = {
          name: info.name,
          email: info.email,
          school: info.school,
          role: info.role,
          //@ts-ignore
          uid: session?.user?.uid,
        }
        setuser(usercop)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
  }

  useEffect(() => {
    session && getUser()
  }, [session])

  return (
    <div className="sticky top-0 z-10 flex w-full bg-yellow-500 py-4 px-4 text-black md:justify-center">
      <div className="flex w-full justify-between space-x-10  md:max-w-4xl md:items-center">
        <Link href={'/'}>
          <div className="flex items-center ">
            <img
              className="w-13 h-11"
              src="https://static.wixstatic.com/media/fb2250_a5792a2065054afab6a87f0dc33b2fa5~mv2.png/v1/crop/x_0,y_0,w_1684,h_1377/fill/w_93,h_75,al_c,usm_0.66_1.00_0.01,enc_auto/Black%20on%20Transparent.png"
              alt=""
            />
            <p className="text-[1.9rem] font-bold">CSPros</p>
          </div>
        </Link>

        {user.role === 'teacher' ? (
          <div className="hidden space-x-4 md:flex ">
            <p className="link">My Classes</p>
            <p className="link">All Classes</p>
            <p className="link">Create Questions</p>
          </div>
        ) : (
          <div className="hidden space-x-4 md:flex ">
            <p className="link">Classroom</p>
            <p className="link">Work Set</p>
            <Link href={'/allclasses'}><p className="link">All Classes</p></Link>
          </div>
        )}
        <Link href={`/${session ? 'accountdetails' : 'auth/signin'}`}>
          {session ? (
            //@ts-ignore
            <img
            //@ts-ignore
              src={session?.user?.image}
              className="h-10 w-10 rounded-full"
              //@ts-ignore
              alt={session?.user?.name}
            />
          ) : (
            <UserCircleIcon className="h-10 w-10" />
          )}
        </Link>
      </div>
    </div>
  )
}

export default Header
