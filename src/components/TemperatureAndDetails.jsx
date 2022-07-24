import React from 'react'
import { UilTemperature, UilTear, UilWind, UilSun, UilSunset, UilArrowUp ,UilArrowDown} from '@iconscout/react-unicons'
import TimeAndLocation from './TimeAndLocation'
import { formatToLocalTime, iconUrl } from '../services/weatherServices'

function TemperatureAndDetails({weather: {dt, timezone, name, country, details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like }, units, setUnits}) {

  return (
    <div className='grid grid-rows-2 grid-flow-col gap-6 mt-8'>
        <div className="row-span-3 col-span-2 bg-white/30 p-6 rounded-3xl shadow-xl">
            <div className='flex flex-col items-center justify-center text-center'>
                <span className='text-white text-3xl font-medium'>{`${name}, ${country}`}</span>
                <img
                    src={iconUrl(icon)}
                    alt="weather icon"
                />
                <span className='text-white text-base font-medium'>{details}</span>
                <div className='mt-4 text-white text-5xl font-bold'>{`${temp.toFixed()}`}<span className='text-2xl font-bold relative -top-3 inline-block'>{units !== 'metric'?'°F':'°C'}</span></div>
            </div>
            <TimeAndLocation dt={dt} timezone={timezone}/>
        </div>
        <div className=" bg-white/30 flex flex-col items-start justify-between p-6 text-white rounded-3xl shadow-xl">
            <div className='flex font-light text-base items-center justify-center'>
                <UilTemperature size={20} className='mr-1 '/>
                Real fell:
                <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
            </div>
            <div className='flex font-light text-base items-center justify-center '>
                <UilTear size={20} className='mr-1'/>
                Humidity:
                <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
            </div>
            <div className='flex font-light text-base items-center justify-center'>
                <UilWind size={20} className='mr-1 '/>
                Wind:
                <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
            </div>
        </div>  
        <div className="row-span-2 bg-white/30 flex flex-col items-start justify-between p-6 text-white rounded-3xl shadow-xl">
            <div className='flex  text-base items-center justify-center'>
                <UilSun className='mr-1'/>
                <p className='font-light'>
                    Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a' )}</span>
                </p>
            </div>
            <div className='flex font-light text-base items-center justify-center'>
                <UilSunset className='mr-1'/>
                <p className='font-light'>
                    Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a' )}</span>
                </p>
            </div>
            <div className='flex font-light text-base items-center justify-center'>
                <UilArrowUp className='mr-1'/>
                <p className='font-light'>
                    High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
                </p>
            </div>
            <div className='flex font-light text-base items-center justify-center'>
                <UilArrowDown className='mr-1'/>
                <p className='font-light'>
                    Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default TemperatureAndDetails