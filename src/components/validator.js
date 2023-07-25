import React from 'react'

export default function validator({validation}) {
  return (
    <p className='text-red-600'>{validation?.valid ? null:validation?.message}</p>
  )
}
