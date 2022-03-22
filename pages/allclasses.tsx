import { SearchCircleIcon } from '@heroicons/react/outline'
import { collection, getDocs, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import ClassQuickDisplay from '../components/ClassQuickDisplay'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { db } from '../firebase'
import { Class } from '../typings'

function find(items:[Class], text:any) {
  text = text.toLowerCase().split(' ');
  let searched = items.filter(function(item) {
    return text.every(function(el:any) {
      return item.className.toLowerCase().indexOf(el) > -1;
    });
  });
  console.log(searched);
  return searched
}

function Allclasses() {
  const [classes, setclasses] = useState<any>([])
  const { data: session } = useSession()
  const [searchq, setsearchq] = useState('')
  const [constclasses, setconstclasses] = useState<any>([])

  const getAllClasses = async () => {
    let docs = await getDocs(query(collection(db, 'classes')))

    let docsdata: any = []
    docs.forEach((doc) => {
      let data = Object.assign({ id: doc.id }, doc.data())
      docsdata.push(data)
    })
    console.log(docsdata)
    setconstclasses(docsdata)
    setclasses(docsdata)
  }

  useEffect(() => {
    getAllClasses()
  }, [])

  useEffect(() => {
    setclasses(find(constclasses,searchq))
  }, [searchq])

  return (
    <div>
      <Header selectedlink={'allclasses'}/>

      <div className="min-h-screen bg-black text-white">
        <div className="mx-10 max-w-3xl md:mx-auto xl:max-w-6xl">
          {session ? (
            <>
              <p className="pt-10 text-4xl font-semibold text-yellow-300">
                All Classes
              </p>
              <div className="md:items-left mb-6 flex max-w-6xl flex-col">
                <div className="relative mt-2">
                  <input
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-100 py-2 px-4 pr-10 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                    type="text"
                    placeholder="eg. Year 11 Computer Science set 2"
                    onChange={(e)=>setsearchq(e.target.value)}
                  />
                  <SearchCircleIcon className="absolute right-1 top-1 h-8 w-8 text-black" />
                </div>
              </div>
              <div className="pb-10">
                {classes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {classes.map((Class: Class) => (
                      <ClassQuickDisplay {...Class} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <p>No classes yet</p>
                    <Link href={'/'}>
                      <p className="text-yellow-500 underline">Back Home</p>
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="pt-40 text-white">Log in to access this page</p>
              <p className="text-yellow-500">
                <Link href={'/auth/signin'} replace>
                  <span className="transition-all hover:text-yellow-400 hover:underline">
                    Log in
                  </span>
                </Link>{' '}
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Allclasses
