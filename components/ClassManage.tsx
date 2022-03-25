import {
  AcademicCapIcon,
  BookOpenIcon,
  PencilIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline'
import { arrayUnion, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'
import { Class } from '../typings'
import StudentRequests from './StudentRequests'

const testreq = [
  {name:'harry russin',email:'harry@russin.com',id:'1245676321',image:'https://jnkasd.png'},
  {name:'harry russin',email:'harry@russin.com',id:'1245676321',image:'https://jnkasd.png'},
  {name:'harry russin',email:'harry@russin.com',id:'1245676321',image:'https://jnkasd.png'},
  {name:'harry russin',email:'harry@russin.com',id:'1245676321',image:'https://jnkasd.png'},
  {name:'harry russin',email:'harry@russin.com',id:'1245676321',image:'https://jnkasd.png'},
]

function ClassManage({
  classData,
  teacher,
  getNewData,
}: {
  classData: Class
  teacher: { name: string; email: string; school: string; image: string }
  getNewData: any
}) {
  const [newcname, setnewcname] = useState('')
  const [addstudenterr, setaddstudenterr] = useState(false)
  const [studentemail, setstudentemail] = useState('')

  const changeClassName = async () => {
    await setDoc(
      doc(db, 'classes', classData.id),
      {
        className: newcname,
      },
      { merge: true }
    )
    getNewData()
  }

  const addStudentByEmail = async ()=>{
    if(!studentemail){
      setaddstudenterr(true)
      return
    }
    let docref = await getDocs(query(collection(db,'users'),where('email','==',studentemail),where('role','==','student')))
    if (!docref) {
      setaddstudenterr(true)
      return
    }
    let user:string = ''
    let data:any;
    docref.forEach(doc=>{
      data = doc.data()      
      user = doc.id
    })

    if (!data || !user) {
      setaddstudenterr(true)
      return
    }

    if (data.role==='teacher') {
      setaddstudenterr(true)
      return
    }

    if (classData.requests.includes(data.id)||classData.students.includes(data.id)){
      setaddstudenterr(true)
      return
    }

    await setDoc(doc(db,'users',user),{
      classreq: arrayUnion(classData.id) 
    },{merge:true})
  }

  return (
    <div className="pb-16">
    <div className="rounded-md bg-gray-100 p-8 pb-0">
      <div className={` transition-all `}>
        {/* NAME CHANGE */}
        <section className="p-10">
          <div className="md:items-left mb-2 flex max-w-6xl flex-col">
            <div className="mb-2">
              <label className="mb-2 block pr-4 text-xl font-bold text-black md:mb-0">
                Class Name
              </label>
            </div>
            <input
              className="w-full appearance-none rounded border-2 border-black bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-gray-100 focus:outline-none"
              type="text"
              placeholder={classData.className}
              onChange={(e) => setnewcname(e.target.value)}
            />
          </div>
          <button
            onClick={changeClassName}
            className="button py-1 font-mono text-black"
          >
            Save
          </button>
        </section>
        {/* STUDENTS */}
        <section className="mt-5 flex space-x-10 rounded pb-10 justify-between bg- px-10 w-full text-black">
          <div className="">
            <p>Total Students: 28</p>
            <div className="md:items-left mt-2 flex max-w-6xl flex-col">
              <div className="mb-2">
                <label className="mb-2 block pr-4 text-xl font-bold text-black md:mb-0">
                  Add New Student
                </label>
              </div>
              <div className="relative">
              <input
                className={`w-full appearance-none pr-10 rounded border-2  bg-gray-200 py-2 px-4 leading-tight ${addstudenterr?'text-red-500 border-red-500 focus:border-red-500 focus:ring-0':'text-gray-700 border-black'} focus:border-purple-500 focus:bg-gray-100 focus:outline-none`}
                type="text"
                placeholder='student@email.com'
                onChange={(e) => {setstudentemail(e.target.value);setaddstudenterr(false)}}
              />
              {addstudenterr&&<p className='text-red-500 text-xs'>No student with that email</p>}
              <PlusCircleIcon onClick={addStudentByEmail} className='px-5 shadow-lg mt-3 bg-purple-300 hover:bg-purple-100 active:bg-green-700 rounded border-2 border-black h-8 hover:text-purple-800 active:text-green-500 transition-all py-0 '/>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <p>Student Requests: {testreq.length}</p>
            <div className="h-[200px] mt-3 scrollbar-thin scrollbar-thumb-black rounded-md border-x-2 border-b-2 border-black scrollbar overflow-auto">
              {testreq.map(request=>(
                //@ts-ignore
                <StudentRequests requests={request}/>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
  )
}

export default ClassManage
