"use client"
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import {action} from '@/app/redux/features/user-slice'
export default function
  page() {
    const childId = useSelector(state => state.authSlice.value.childId)
    const pagePrgoress = useSelector(state => state.userSlice.progress)
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() =>{
      if(!pagePrgoress.page1 && !pagePrgoress.page2) router.push('/register')
      dispatch(action({type:'RESET'}))
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
