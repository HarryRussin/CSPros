import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../components/Header'
//@ts-ignore
import Typist from 'react-typist'

//linear-gradient(#403521,#1D1D1D)

const Home: NextPage = () => {
  const history = useRouter()

  function getStarted() {
    history.replace('/dashboard')
  }

  return (
    <div className="min-h-screen font-['Montserrat'] text-white w-full bg-gradient-to-b from-[#403521] to-[#1D1D1D]">
      <Head>
        <title>Computer Science Professionals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* navbar */}
      <Header fade={true}/>

      {/* Hero and CTA button */}
      <div className="flex h-screen space-y-6 flex-col items-center justify-center">
        <h1 className='text-center text-5xl font-light '>
          <span>Become </span>
          <Typist cursor={{show: true,blink: true,element: '|',hideWhenDone: true,hideWhenDoneDelay: 0,}} avgTypingDelay={80} stdTypingDelay={30}>
          <span className="text-yellow-500">C</span>omputer{' '}
          <span className="text-yellow-500">S</span>cience
          <br />
          <span className="text-yellow-500">Pro</span>fessional
          <span className="text-yellow-500">s</span>
          </Typist>
        </h1>
        <button onClick={getStarted} className='text-2xl hover:bg-purple-500 transition-all active:scale-105 active:bg-white bg-purple-600 py-1 px-2 rounded-md'>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Home
