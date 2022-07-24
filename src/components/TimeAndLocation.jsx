import React from 'react'
import { formatToLocalTime } from '../services/weatherServices'


function TimeAndLocation({dt, timezone}) {
  return (
    <div className='flex flex-row text-white items-start justify-center mt-4'>

      <p className='text-base text-center font-extralight mb-2 ml-1'>
        {formatToLocalTime(dt, timezone)}
      </p>
    </div>
  )
}

export default TimeAndLocation