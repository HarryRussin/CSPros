import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { db } from '../../firebase';
import {Class} from '../../typings'

interface Props {
    classData:Class
}

function Class({classData}:Props) {
    const [teacher, setteacher] = useState({name:'',email:'',school:''})

    const getTeach = async()=>{
        let teach:any = await getDoc(doc(db,'users',classData.teacherId))
        teach = teach.data()
        setteacher({name:teach.name,email:teach.email,school:teach.school})        
    }

    useEffect(() => {
        classData&&getTeach()
    }, [db,classData])

  return (
    <div>
        <Header/>

        <div className="bg-black min-h-screen text-white">
            <div className="md:max-w-3xl xl:max-w-6xl md:mx-auto mx-10 pt-16">
                <p className=' bg-gradient-to-r text-4xl font-semibold from-yellow-200 to-yellow-300 bg-clip-text pb-1 text-transparent'><span className='text-yellow-500'>{classData.className} -</span>{' '}{teacher.name}</p>

            </div>
        </div>

        <Footer/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const docRef = doc(db, "classes", ctx.query.classId);
    const docSnap = await getDoc(docRef);
    const data = Object.assign({id:docSnap.id},docSnap.data())
    if (!data) return { notFound: true };
    return { props: { classData: JSON.parse(JSON.stringify(data)) } };
  };

export default Class