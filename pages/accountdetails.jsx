import Header from '../components/Header'
import Footer from '../components/Footer'
import { signOut, useSession } from 'next-auth/react'

function Account() {
  const { data: session } = useSession()
  return (
    <div className="bg-black text-white">
      <Header />

      <div className="mx-auto md:max-w-4xl xl:max-w-6xl h-screen">
        {session ? (
          <div className="flex flex-col justify-center my-10">
            <p className="text-2xl mb-2 font-semibold">Account Details</p>
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
            <hr className='py-[1px] bg-white mt-4'/>
            <div className="pt-5 flex space-x-6">
                <p onClick={signOut} className='px-8 py-3 bg-yellow-500 hover:bg-yellow-400 w-fit rounded-lg text-xl'>Log out</p>
                <p onClick={()=>console.log('not working yet')} disabled className='px-8 py-3 bg-yellow-500 hover:bg-yellow-400 w-fit rounded-lg text-xl'>Change Password</p>
            </div>
          </div>
        ) : (
          <p className='text-center text-white'>Log in to access this page</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Account
