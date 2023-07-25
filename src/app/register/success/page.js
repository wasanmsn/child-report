"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useRouter } from 'next/navigation'
export default function
  page() {
    const childId = useSelector(state => state.authSlice.value.childId)
    const pagePrgoress = useSelector(state => state.userSlice.progress)
    const router = useRouter()
    useEffect(() =>{
      if(!pagePrgoress.page1 && !pagePrgoress.page2) router.push('/register')
    },[])
  return (
    <div className="weak-green-background">
      <div className='card font-bold title'>
        <p>เลขประจำตัวของคุณคือ </p>
        <p>{childId}</p>
      </div>

    </div>
  )
}
