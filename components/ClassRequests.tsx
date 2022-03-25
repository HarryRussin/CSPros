import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { Class } from '../typings'

function ClassRequests({ classData,acceptReq }: { classData: Class,acceptReq:any }) {
  return (
    <div className="box-border flex h-fit rounded items-center space-x-2 border-t-2 border-black bg-yellow-500 p-2">
      <div className="flex-1 bg-yellow-300 p-2 rounded">
        <p className='text-black font-semibold'>{classData.className}</p>
        <p className="text-xs text-gray-500">{classData.teacherName}</p>
      </div>
      <div className="flex items-center space-x-3 h-full">
        <XIcon className="h-10 w-10 bg-red-300 transition-all rounded-full hover:bg-red-400 text-red-500" />
        <CheckIcon onClick={()=>acceptReq(classData.id)} className="h-10 w-10 bg-green-300 transition-all rounded-full hover:bg-green-600 text-green-500" />
      </div>
    </div>
  )
}

export default ClassRequests
