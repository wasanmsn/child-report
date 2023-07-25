"use client"
import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

export default function
  page() {
    const childId = useSelector(state => state.authSlice.value.childId)
  return (
    <div className="weak-green-background">
      <div className='card font-bold title'>
        <p>เลขประจำตัวของคุณคือ </p>
        <p>{childId}</p>
      </div>

    </div>
  )
}
