import React from 'react'

export default function Validator({validation}) {
  return (
    <p className='text-red-600'>{validation?.valid ? null:validation?.message}</p>
  )
}
