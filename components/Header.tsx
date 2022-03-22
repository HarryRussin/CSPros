import { MenuIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline'
import { doc, getDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import {} from '@heroicons/react/outline'

function Header({selectedlink}:{selectedlink:string}) {
  const { data: session } = useSession()
  
  const [user, setuser] = useState({
    name: '',
    email: '',
    school: '',
    role: '',
  })
  const [openMenu, setopenMenu] = useState(false)

  const [selectedl, setselectedl] = useState(selectedlink)

  const getUser = async () => {
    //@ts-ignore
      //@ts-ignore
      let docRef = doc(db, 'users', session?.user?.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        let info: any = docSnap.data()
        console.log(info);
        
        let usercop: any = {
          name: info.name,
          email: info.email,
          school: info.school,
          role: info.role,
          //@ts-ignore
          uid: session?.user?.uid,
        }
        console.log(info.role);
        
        setuser(usercop)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
  }

  useEffect(() => {
    session&&getUser()    
  }, [session,selectedlink])

  return (
    <div
      className={`sticky top-0 z-10 flex w-full bg-yellow-500 py-4 px-4 text-black md:justify-center`}
    >
      {/* DESKTOP */}
      <div className="hidden w-full justify-between space-x-10 md:flex  md:max-w-4xl md:items-center">
        <Link href={'/'}>
          <div className={`flex items-center ${selectedl==='home'&&'bg-yellow-500'}`}>
            <img
              className="w-13 h-11"
              src="https://static.wixstatic.com/media/fb2250_a5792a2065054afab6a87f0dc33b2fa5~mv2.png/v1/crop/x_0,y_0,w_1684,h_1377/fill/w_93,h_75,al_c,usm_0.66_1.00_0.01,enc_auto/Black%20on%20Transparent.png"
              alt=""
            />
            <p className="text-[1.9rem] font-bold">CSPros</p>
          </div>
        </Link>

        {user.role === 'teacher' ? (
          <div className=" flex space-x-4 ">
            <Link href={'/myclasses'}>
            <p className={`classlink text-xl ${selectedlink==='myclasses'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>My Classes</p>
            </Link>
            <Link href={'/allclasses'}>
            <p className={`classlink text-xl ${selectedlink==='allclasses'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>All Classes</p>
            </Link>
            <p className={`classlink text-xl ${selectedlink==='makeqs'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>Create Questions</p>
          </div>
        ) : (
          <div className=" flex space-x-4 ">
            <p className={`classlink text-xl ${selectedlink==='classroom'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>Classroom</p>
            <p className={`classlink text-xl ${selectedlink==='setwork'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>Work Set</p>
            <Link href={'/allclasses'}>
              <p className={`classlink text-xl ${selectedlink==='allclasses'&&'bg-yellow-300 font-bold underline underline-offset-1 decoration-[3px]'}`}>All Classes</p>
            </Link>
          </div>
        )}
        <Link href={`/${session ? 'accountdetails' : 'auth/signin'}`}>
          {session ? (
            //@ts-ignore
            <img
              //@ts-ignore
              src={session?.user?.image}
              className={`h-10 w-10 rounded-full ${selectedlink==='account'||selectedlink==='login'&&' border-8'}`}
              //@ts-ignore
              alt={session?.user?.name}
            />
          ) : (
            <UserCircleIcon className="h-10 w-10" />
          )}
        </Link>
      </div>
      {/* MOBILE */}
      <div className="flex w-full items-center justify-between md:hidden">
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
        <MenuIcon
          onClick={() => setopenMenu(true)}
          className={`h-9 w-9 ${openMenu ? 'hidden' : 'inline-block'}`}
        />
      </div>
      <div
        className={`${
          openMenu ? 'h-screen w-[100%]' : 'h-0 w-[0%]'
        } absolute top-0 left-0 overflow-hidden bg-transparent text-black transition-all`}
      >
        <div className="h-full w-full bg-black opacity-80">
          <XIcon
            onClick={() => setopenMenu(false)}
            className={`absolute right-2 top-5 z-[100] h-10 w-10 text-white opacity-100`}
          />
          {user.role === 'teacher' ? (
            <div className=" flex h-full flex-col items-center justify-center space-y-10 text-3xl">
              <p className="link py-3 px-5 text-5xl">My Classes</p>
              <Link href={'/allclasses'}><p className="link py-3 px-5 text-5xl">All Classes</p></Link>
              <p className="link py-3 px-5 text-5xl">Create Questions</p>
              <Link href={`/${session ? 'accountdetails' : 'auth/signin'}`}>
                <p className='link py-3 px-5 text-5xl'>Account</p>
              </Link>
            </div>
          ) : (
            <div className=" flex h-full flex-col items-center justify-center space-y-10">
              <p className="link py-3 px-5 text-5xl">Classroom</p>
              <p className="link py-3 px-5 text-5xl">Work Set</p>
              <Link href={'/allclasses'}>
                <p className="link py-3 px-5 text-5xl">All Classes</p>
              </Link>
              <Link href={`/${session ? 'accountdetails' : 'auth/signin'}`}>
                <p className='link py-3 px-5 text-5xl'>{session?'Account':'Log in'}</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
