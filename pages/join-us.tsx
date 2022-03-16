import { AcademicCapIcon, BookOpenIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import Header from '../components/Header'

function Join() {
  return (
    <div>
      <Header />

      <div className="h-screen bg-black">
        <div className="mx-auto max-w-3xl pt-16 text-white xl:max-w-6xl">
          <p className="text-3xl font-semibold text-yellow-500">
            Let&apos;s get started...
          </p>
          <div className="mt-5 flex h-52 justify-between rounded border border-yellow-500 py-5 px-10">
            <div className="flex w-1/4 flex-col ">
              <div className="flex items-center space-x-1 mb-8 rounded bg-yellow-500 p-1 text-black">
                <BookOpenIcon className="h-8 w-8" />
                <p className='text-sm'>I&apos;m a student</p>
              </div>
              <p className="text-sm">
                Able to practise questions independently as well as complete
                homework assigned to you.
              </p>
            </div>
            <div className="flex w-1/4 flex-col ">
              <div className="flex items-center space-x-1 rounded mb-8 bg-yellow-500 p-1 text-black">
                <AcademicCapIcon className="h-8 w-8" />
                <p className='text-sm'>I&apos;m a teacher</p>
              </div>
              <p className="text-sm">
                Able to set homeworks, manage student lists, access the database
                of questions and monitor student progress.
              </p>
            </div>
            <div className="flex w-1/4 flex-col ">
              <div className="flex items-center space-x-1 mb-8 rounded bg-yellow-500 p-1 text-black">
                <CurrencyDollarIcon className="h-8 w-8" />
                <p className='text-sm'>I&apos;m literally Harry</p>
              </div>
              <p className="text-sm">
                Able to do everything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join
