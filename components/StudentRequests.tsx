import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { Requests } from '../typings'

function StudentRequests({ requests,accReq }: { requests: Requests,accReq:any }) {
  return (
    <div className="box-border flex items-center space-x-2 border-t-2 border-black bg-gray-200 p-2 hover:bg-gray-100">
      <img className=" h-8 w-8 rounded-full" src={requests.image} alt="" />
      <div className="flex-1">
        <p>{requests.name}</p>
        <p className="text-xs text-gray-500">{requests.email}</p>
      </div>
      <div className="flex h-full">
        <XIcon  className="h-10 w-10 hover:bg-red-300 transition-all rounded-full text-red-500" />
        <CheckIcon onClick={()=>accReq(requests.id)} className="h-10 w-10 hover:bg-green-300 transition-all rounded-full text-green-500" />
      </div>
    </div>
  )
}

export default StudentRequests
