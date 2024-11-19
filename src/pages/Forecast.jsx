import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../App.css'

const WeatherForecast = () => {
   const [forecastData, setForecastData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'
   const city = 'Incheon'

   const fetchWeatherData = async () => {
      setLoading(true)
      try {
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)
         setForecastData(response.data)
      } catch (error) {
         setError('날씨 데이터가 없습니다.')
      } finally {
         setLoading(false)
      }
   }
   useEffect(() => {
      fetchWeatherData()

      const interval = setInterval(fetchWeatherData, 3600 * 1000)

      return () => clearInterval(interval)
   }, [])

   if (loading) {
      return <div>로딩 중</div>
   }

   if (error) {
      return <div>{error}</div>
   }

   return <div>{forecastData ? <Forecast data={forecastData} /> : <div>날씨 데이터가 없습니다.</div>}</div>
}

function Forecast({ data }) {
   const { list } = data

   return (
      <div className="content">
         <h1 className="header">인천 주간 날씨 예보</h1>
         <table className="table">
            <thead className="thead">
               <tr className="tr">
                  <th>년도/월/일/시간</th>
                  <th>날씨</th>
                  <th>온도</th>
                  <th>습도</th>
                  <th>바람세기</th>
               </tr>
            </thead>
            <tbody className="tbody">
               {list.map((item, index) => (
                  <tr key={index}>
                     <td>{new Date(item.dt * 1000).toLocaleString()}</td>
                     <td>{item.weather[0].description}</td>
                     <td>{item.main.temp}°C</td>
                     <td>{item.main.humidity}%</td>
                     <td>{item.wind.speed} m/s</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

export default WeatherForecast
