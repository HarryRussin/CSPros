import { AcademicCapIcon, BookOpenIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import {
  getProviders,
  signIn as SignIntoProvider,
  useSession,
} from 'next-auth/react'
import { useRouter } from 'next/router'

import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

function Join({ providers }: { providers: [{ name: string; id: string }] }) {
  const [selected, setselected] = useState('')
  const role: any = useRouter()?.query?.role
  const { data: session } = useSession()
  const history = useRouter()

  const [classroom, setclassroom] = useState('')
  const [school, setschool] = useState('')


  useEffect(() => {
    if (role !== 'student' && role !== 'teacher') {
      console.log(role)
      return
    }
    role && setselected(role)
  }, [role])

  const addStudentDetails = async (e: any) => {
    e.preventDefault()

    //@ts-ignore
    const docRef = await setDoc(doc(db, 'users', session?.user?.uid), {
      name: session?.user?.name,
      email: session?.user?.email,
      //@ts-ignore
      uid: session?.user?.uid,
      class: classroom.toLocaleLowerCase(),
      school: school.toLocaleLowerCase(),
      role: role,
      image:session?.user?.image
    })

    history.replace('/')
  }

  const addTeacherDetails = async (e: any) => {
    e.preventDefault()

    //@ts-ignore
    const docRef = await setDoc(doc(db, 'users', session?.user?.uid), {
      name: session?.user?.name,
      email: session?.user?.email,
      //@ts-ignore
      uid: session?.user?.uid,
      school: school.toLocaleLowerCase(),
      role: role,
      image:session?.user?.image
    })

    history.replace('/')
  }

  return (
    <div>
      <Header />

      <div className="flex min-h-screen justify-center overflow-hidden bg-black">
        <div className="max-w-5xl pt-16 text-white lg:mx-auto xl:max-w-6xl">
          {/* SELECT OCCUPATION */}
          <div className={` ${!selected ? '' : 'hidden'} transition-all `}>
            <p className="text-3xl font-semibold text-yellow-500">
              Let&apos;s get started...
            </p>
            <div className="mt-5 flex h-52 justify-between space-x-10 rounded border border-yellow-500 py-5 px-10">
              <div
                onClick={() => setselected('student')}
                className="group flex w-1/2 flex-col "
              >
                <div className="mb-8 flex items-center space-x-1 rounded bg-yellow-500 p-1 text-black transition-all group-hover:bg-purple-300">
                  <BookOpenIcon className="h-8 w-8" />
                  <p className="text-sm">I&apos;m a student</p>
                </div>
                <p className="text-sm">
                  Able to practise questions independently as well as complete
                  homework assigned to you.
                </p>
              </div>
              <div
                onClick={() => setselected('teacher')}
                className="group flex w-1/2 flex-col"
              >
                <div className="mb-8 flex items-center space-x-1 rounded bg-yellow-500 p-1 text-black transition-all group-hover:bg-purple-300">
                  <AcademicCapIcon className="h-8 w-8" />
                  <p className="text-sm">I&apos;m a teacher</p>
                </div>
                <p className="text-sm">
                  Able to set homeworks, manage student lists, access the
                  database of questions and monitor student progress.
                </p>
              </div>
            </div>
          </div>

          {/* ENTER DETAILS */}

          <div
            className={` ${
              selected ? 'inline-block scale-100' : ' scale-0'
            } transition-all duration-500`}
          >
            {!session ? (
              <>
                <p className="pb-5 text-3xl font-semibold text-yellow-500">
                  Sign up as a{' '}
                  <span className="text-yellow-300">{selected}</span> with...
                </p>
                <div className="flex space-x-5">
                  {Object.values(providers).map((provider) => (
                    <div className="" key={provider.name}>
                      <button
                        className="rounded-lg bg-yellow-500 py-5 px-8 text-white transition-all hover:bg-purple-300"
                        onClick={() =>
                          SignIntoProvider(provider.id, {
                            callbackUrl: `/join-us?role=${selected}`,
                          })
                        }
                      >
                        Sign in with{' '}
                        <span className="font-bold">{provider.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-[80vw]">
                <p className="group flex pb-5 text-4xl font-semibold text-yellow-500">
                  <p>
                    Add{' '}
                    <span className=" bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                      {selected}
                    </span>{' '}
                    details or
                  </p>
                  <span
                    onClick={() => {
                      history.replace('/')
                    }}
                    className="ml-3 w-fit rounded-md border border-yellow-500 py-2 px-4 text-base transition-all group-hover:border-purple-300 group-hover:text-purple-300"
                  >
                    Go Home
                  </span>
                </p>
                {selected === 'student' ? (
                  <form onSubmit={(e) => addStudentDetails(e)}>
                    <div className="md:items-left mb-6 flex max-w-6xl flex-col">
                      <div className="">
                        <label className="mb-1 block pr-4 font-bold text-yellow-500 md:mb-0">
                          School Name
                        </label>
                      </div>
                      <div className="w-full">
                        <input
                          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                          type="text"
                          placeholder="eg. Hillhouse"
                          onChange={(e) => setschool(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:items-left mb-6 flex max-w-6xl flex-col md:justify-between">
                      <div className="">
                        <label className="mb-1 block pr-4 font-bold text-yellow-500 md:mb-0">
                          Class Name
                        </label>
                      </div>
                      <div className="w-full">
                        <input
                          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                          type="text"
                          placeholder="eg. KP11"
                          onChange={(e) => setclassroom(e.target.value)}
                        />
                      </div>
                    </div>

                    <button type="submit" className="button py-2">
                      Enter Details
                    </button>
                  </form>
                ) : (
                  <form onSubmit={(e) => addTeacherDetails(e)}>
                    <div className="md:items-left mb-6 flex max-w-6xl flex-col md:justify-between">
                      <div className="">
                        <label className="mb-1 block pr-4 font-bold text-yellow-500 md:mb-0">
                          School Name
                        </label>
                      </div>
                      <div className="w-full">
                        <input
                          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                          type="text"
                          placeholder="eg. Hillhouse"
                          onChange={(e) => setschool(e.target.value)}
                        />
                      </div>
                    </div>

                    <button type="submit" className="button py-2">
                      Enter Details
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default Join
