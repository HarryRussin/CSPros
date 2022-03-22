import { AcademicCapIcon, BookOpenIcon } from '@heroicons/react/outline'
import React from 'react'
import { Class } from '../typings'

function ClassManage({
  classData,
  teacher,
}: {
  classData: Class
  teacher: { name: string; email: string; school: string; image: string }
}) {
  return (
    <div className="rounded-md p-8 ">
      <div className={` transition-all `}>
        <p className="text-3xl font-semibold text-yellow-500">
          Class Management Actions
        </p>
        <div className="mt-5 flex h-full flex-col justify-between space-y-4 rounded border border-yellow-500 py-5 px-10 md:h-52 md:flex-row md:space-y-0 md:space-x-10">
          <div className="group flex flex-col md:w-1/2 ">
            <div className="min-h-32 flex h-full items-center justify-center rounded bg-yellow-500 p-1 text-3xl text-black transition-all group-hover:bg-purple-300 md:space-x-1">
              <p className="text-center font-semibold">
                Add or remove Students
              </p>
            </div>
          </div>
          <div className="min-h-32 group flex flex-col md:w-1/2">
            <div className=" flex h-full items-center justify-center rounded bg-yellow-500 p-1 text-2xl md:text-3xl text-black transition-all group-hover:bg-purple-300 md:space-x-1">
              <p className="px-8 text-center font-semibold">Add Assignments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassManage
