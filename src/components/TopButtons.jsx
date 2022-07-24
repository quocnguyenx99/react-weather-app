import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id: 1,
            title: 'London'
        },
        {
            id: 2,
            title: 'Sydney'
        },
        {
            id: 3,
            title: 'Tokyo'
        },
        {
            id: 4,
            title: 'New York'
        },
        {
            id: 5,
            title: 'Paris'
        },

    ]
  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map(city => (
            <button
             key={city.id}
             className='text-white text-lg font-medium py-1 px-4  hover:bg-white/[0.3] hover:rounded-full hover:transition-all hover:shadow-sm'
             onClick={() => setQuery({q: city.title})}
            >
                {city.title}
            </button>
        ))}
    </div>
  )
}

export default TopButtons