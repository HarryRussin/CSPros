import Header from '../components/Header'
import Footer from '../components/Footer'
import { signOut, useSession } from 'next-auth/react'
import { CogIcon } from '@heroicons/react/outline'
import Link from 'next/link'

function Account() {
  const { data: session } = useSession()
  return (
    <div className="bg-black text-white">
      <Header />

      <div className="mx-auto h-screen md:max-w-4xl xl:max-w-6xl">
        {session ? (
          <div className="my-10 flex flex-col justify-center">
            <div className="flex justify-between">
              <p className="mb-2 text-2xl font-semibold">Account Details</p>
              <CogIcon className="h-10 w-10" />
            </div>
            <div className="flex space-x-5 text-sm">
              <div className="">
                <p>Name: </p>
                <p>Email: </p>
                <p>Classroom: </p>
                <p>Classroom Leader: </p>
              </div>
              <div className="font-semibold">
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
                <p>K11 CompSci</p>
                <p>Kia Pulsford</p>
              </div>
            </div>
            <hr className="mt-4 bg-white py-[1px]" />
            <div className="flex space-x-6 pt-5">
              <p
                onClick={() => {
                  signOut()
                }}
                className="w-fit rounded-lg bg-yellow-500 px-8 py-3 text-xl hover:bg-yellow-400"
              >
                Log out
              </p>
              <p
                onClick={() => console.log('not working yet')}
                disabled
                className="w-fit rounded-lg bg-yellow-500 px-8 py-3 text-xl hover:bg-yellow-400"
              >
                Change Password
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center ">
            <p className="pt-20 text-white">Log in to access this page</p>
            <Link href={'/'} replace>
              <p className="text-yellow-500 transition-all hover:text-yellow-400 hover:underline">
                Back Home
              </p>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Account
