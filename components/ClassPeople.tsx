import { arrayRemove, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'
import { Class } from '../typings'
import StudentProfile from './StudentProfile'

function ClassPeople({classData,teacher}:{classData:Class,teacher:any}) {
    const [students, setstudents] = useState(classData.students)

    const removeUser = async (studentid:string)=>{
        await setDoc(doc(db,'classes',classData.id),{
            students:arrayRemove(studentid)
        },{merge:true})
        //@ts-ignore
        let newstudents:any = students.filter(item=>!(item===studentid))
        console.log(studentid);
        
        console.log(newstudents);
        
        setstudents(newstudents)
    }
  return (
    <div className='bg-gray-50 text-black p-10 rounded-md'>
        <h1 className='text-2xl mb-5 font-semibold'>Total Students: {students.length}</h1>
        <div className="flex flex-col scrollbar max-h-[400px] scrollbar-thin scrollbar-thumb-black">
        {
            students.map(student=>(
                <StudentProfile removeUser={removeUser} teacherId={teacher.id} studentId={student}/>
            ))
        }
        </div>

    </div>
  )
}

export default ClassPeople