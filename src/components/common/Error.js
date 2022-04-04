import React from 'react'

const Error = ({ error }) => {
  return (
    <div className='error'>
      <span>{ error }</span>
    </div>
  )
}

export default Error