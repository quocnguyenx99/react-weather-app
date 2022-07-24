import React, { useState } from 'react'
import {UilSearch, UilLocationPoint} from '@iconscout/react-unicons'

import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState('')

  const handleSearchClick = () => {
    if(city !== "") setQuery({q: city}) 
  }

  const handleLocationClick = () => {
    if(navigator.geolocation) {
      toast.info('Fetching users location.')
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        toast.success(`Fetched coordinator success: ${lat}, ${lon} `)
        setQuery({
          lat, lon
        })
      })
    }
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit) setUnits(selectedUnit)
  }

  const handleKeyup = (e) => {
    if(e.keyCode === 13 || e.keyCode === 'Enter') {
      handleSearchClick()
    }
  }
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4 '>
            <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyUp={handleKeyup}
             type="text"
             placeholder='Search for city...'
             className='text-slate-400 text-md font-light px-4 py-2 w-full shadow-xl focus:outline-none capitalize rounded-full placeholder:lowercase' 
            />
            <UilSearch size={30} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleSearchClick}/>
            <UilLocationPoint size={30} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleLocationClick}/>
        </div>

        <div className='flex flex-row items-center justify-center w-1/4'>
            <button name='metric' className='text-white text-xl font-light cursor-pointer transition ease-out hover:scale-125' onClick={handleUnitsChange}>°C</button>
            <p className='text-white text-xl mx-1'>|</p>
            <button name='imperial' className='text-white text-xl font-light cursor-pointer transition ease-out hover:scale-125' onClick={handleUnitsChange}>°F</button>
        </div>
    </div>
  )
}

export default Inputs