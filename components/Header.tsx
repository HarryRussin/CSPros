import { UserCircleIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function Header() {
  const {data:session} = useSession()
  return (
    <div className="flex w-full text-black sticky top-0 z-10 bg-yellow-500 py-4 px-4 md:justify-center">
      <div className="flex space-x-10 justify-between w-full  md:items-center md:max-w-4xl">
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

        <div className="md:flex space-x-4 hidden ">
            <p className="link">Key Stage 3</p>
            <p className="link">GCSE</p>
            <p className="link">CTech IT</p>
            <p className="link">Programming</p>
        </div>
        <Link href={`/${session?'accountdetails':'auth/signin'}`}>
        <UserCircleIcon className='h-10 w-10'/>
        </Link>
      </div>
    </div>
  )
}

export default Header
