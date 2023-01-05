import React, { useState } from 'react'
import axios from 'axios'
import Sunrise from './video/Sunrise.mp4'

function Weather() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className='relative w-full flex items-center justify-center h-screen'>
    <video 
    className='absolute w-full h-full object-cover '
    src={Sunrise} 
    autoPlay
    loop
    muted
    ></video>
    <div className="absolute ">
   
      <div className=" p-2 flex items-center justify-center">
        <input className=' backdrop-blur-lg bg-gray-400/30 text-white placeholder:text-white/50 placeholder pt-1 bt-1 px-14 py-3 rounded-md outline-none'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="">
        <div className="">
          <div className=" flex flex-1 mt-8 text-white items-center justify-center text-2xl font-semibold">
            <p className=''>{data.name}</p>
          </div>
          <div className="text-6xl mt-7 absolute text-white">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="text-white">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className=" flex items-center justify-between gap-5 mt-48 backdrop-blur-sm bg-slate-500/30 rounded-lg py-3 px-3">
            <div className=" border-r border-black/50 text-white ">
              {data.main ? <p className='px-2'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className=" border-r border-black/50 text-white  ">
              {data.main ? <p className='px-5 '>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="text-white">
              {data.wind ? <p className='py-2 px-3 '>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
    </div>
  );
}

export default Weather;