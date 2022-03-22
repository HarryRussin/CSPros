import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Class } from '../typings'

function ClassQuickDisplay(props: Class, { id }: { id: string }) {
  const { data: session } = useSession()
  return (
    <div className="flex w-full h-40 space-x-2 rounded bg-yellow-500 p-2">
      <div className="w-[70%] rounded bg-yellow-300 p-2 text-black">
        <p className="text-wrap overflow-hidden overflow-ellipsis text-lg font-semibold">
          {props.className[0].toUpperCase() + props.className.substring(1)}
        </p>
        <p className="overflow-hidden overflow-ellipsis text-xs text-gray-800">
          {props.classID}
        </p>
      </div>
      <div className={`flex w-[30%] flex-col space-y-2 rounded bg-yellow-300 p-2`}>
        <Link href={`/class/${props.id}`}>
          <div className="w-full h-full text-center flex items-center justify-center rounded bg-green-400 p-2 text-black transition-all hover:bg-green-500">
            <p className="text-center font-bold">See Class</p>
          </div>
        </Link>
        
        {
          //@ts-ignore
        session?.user?.uid !== props.teacherId && (
          <div className="w-full rounded bg-blue-400 p-2 text-black">
            <p className="text-center font-bold">Request to join</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassQuickDisplay
