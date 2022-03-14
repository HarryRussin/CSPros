import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>CSPros</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* main body */}
      <div className="bg-black text-white ">
        <div className="mx-auto max-w-[90vw]">
          <div className="flex items-center justify-center text-5xl font-semibold">
            <img className=" py-10" src="/questo.png" alt="" />
            <p className="w-[40vw] text-center">
              <span className="text-yellow-500">C</span>omputer{' '}
              <span className="text-yellow-500">S</span>cience{' '}
              <span className="text-yellow-500">P</span>rofessionals
            </p>
          </div>
          <hr className="bg-white py-[1px]" />
          <p className="pt-3 pb-10 text-2xl font-bold text-yellow-500">
            Popular CSPros Topics:
          </p>
          <div className="flex justify-between pb-10 text-black ">
            <div className='subject group' >
              <div className="h-[300px] w-[200px] bg-yellow-500 opacity-40"></div>
              <p className="bg-white h-[100px] flex justify-center items-center transition-all group-hover:text-blue-300 group-hover:underline">Python</p>
            </div>

            <div className='subject group' >
              <div className=" h-[300px] w-[200px] bg-yellow-500 opacity-40"></div>
              <p className="bg-white h-[100px] flex justify-center items-center transition-all group-hover:text-blue-300 group-hover:underline">Python</p>
            </div>

            <div className='subject group' >
              <div className=" h-[300px] w-[200px] bg-yellow-500 opacity-40"></div>
              <p className="bg-white h-[100px] flex justify-center items-center transition-all group-hover:text-blue-300 group-hover:underline">Python</p>
            </div>

            <div className='subject group' >
              <div className="h-[300px] w-[200px]  bg-yellow-500 opacity-40"></div>
              <p className="bg-white h-[100px] flex justify-center items-center transition-all group-hover:text-blue-300 group-hover:underline">Python</p>
            </div>
          </div>
          <hr className="bg-white py-[1px]" />
          <p className='font-semibold py-3 text-sm'>CSNewbs last updated: <span className='text-yellow-500'>every single day #nodaysoff</span></p>
        </div>
      </div>

      {/* footer */}

      <Footer />
    </div>
  )
}

export default Home
