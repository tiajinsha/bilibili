import { useState, useEffect } from 'react'

function useAddEventScroll(ref) {
  const [scrollTop, setscrollTop] = useState(0)
  useEffect(() => {
    ref.current.addEventListener('scroll',handleScroll)
    return () => {
        ref?.current?.removeEventListener('scroll',handleScroll)
    }
  },[])
  const handleScroll = (e)=>{
    setscrollTop(ref.current.scrollTop)
  }
  return scrollTop
}

export default useAddEventScroll;