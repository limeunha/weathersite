import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './css/Content.css'

const CurrentWeather = () => {
   const [weatherData, setWeatherData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'
   const city = 'Incheon'

   useEffect(() => {
      const fetchCurrent = async () => {
         setLoading(true)
         try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)
            setWeatherData(response.data)
         } catch (error) {
            setError('날씨 데이터를 가져오는 데 실패했습니다.')
         } finally {
            setLoading(false)
         }
      }

      fetchCurrent()
   }, [])

   if (loading) {
      return <div>로딩 중</div>
   }

   if (error) {
      return <div>{error}</div>
   }

   const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`

   return <Content weatherData={weatherData} weatherIcon={weatherIcon} />
}

function Content({ weatherData, weatherIcon }) {
   return (
      <div className="weather">
         {weatherData ? (
            <div className="weather1">
               <div>
                  <img src={weatherIcon} alt="날씨 아이콘" />
               </div>
               <div className="weather2">
                  <h3>{weatherData.name}</h3>
                  <div>날씨: {weatherData.weather[0].description}</div>
                  <div>온도: {Math.trunc(weatherData.main.temp)}°C</div>
               </div>
            </div>
         ) : (
            <div>날씨 정보를 불러올 수 없습니다.</div>
         )}
      </div>
   )
}

export default CurrentWeather
