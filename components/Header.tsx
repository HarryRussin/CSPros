import { useLayoutEffect, useState } from "react"
import { useEffect } from "react"

function Header({fade}:{fade:boolean}) {
  const [opacity, setOpacity] = useState('0')

  useEffect(() => {
    if(fade){
      setOpacity('0')
      setTimeout(() => {
        setOpacity('1')
      }, 800);
    }
    else{
      setOpacity('1')
    }
  }, [])
  

  return (
    <div className="fixed font-['Montserrat'] flex w-full items-center justify-between py-3 px-5">
      {/* left side w image and search */}
      <div className="flex items-center space-x-7">
        <img src="/questo.png" alt="questo" className="h-10 w-12" />
        <input style={{opacity:`${opacity}`}} type="text" placeholder=" Search Questions..." className={`text-xs active:outline-none focus:ring-1 transition-all duration-300 border-none focus:ring-purple-500 active:ring-0 appearance-none h-7 min-w-[230px] rounded-[3px] bg-gray-300 text-gray-700`}/>
      </div>
      <div style={{opacity:`${opacity}`}} className={`flex transition-all duration-300 items-center space-x-7`}>
        <p className="sickHover">Donate</p>
        <p className="sickHover">Resources</p>
        <p className="sickHover">Tasks</p>
        <p className="sickHover">Profile</p>
      </div>
    </div>
  )
}

export default Header
