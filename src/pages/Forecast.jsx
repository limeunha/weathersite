import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherForecast = () => {
   const [weatherData, setWeatherData] = useState(null)
   const [forecastData, setForecastData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'
   const city = 'Incheon'

   useEffect(() => {
      const fetchWeatherData = async () => {
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

      fetchWeatherData()
   }, [])

   if (loading) {
      return <div>로딩 중</div>
   }

   if (error) {
      return <div>{error}</div>
   }
}

const timeLabels = weatherData.list.map((item) => item.dt_txt)
const temperatures = weatherData.list.map((item) => item.main.temp)
const description = weatherData.list.map((item) => item.weather[0].description)
const humidity = weatherData.list.map((item) => item.main.humidity)
const windSpeeds = weatherData.list.map((item) => item.wind.speed)

function Forecast() {
   return (
      <div>
         <h1>주간날씨예보</h1>
         <table>
            <thead>
               <tr>
                  <th>시간</th>
                  <th>날씨</th>
                  <th>온도</th>
                  <th>습도</th>
                  <th>바람세기</th>
               </tr>
            </thead>
            <tbody>
               {weatherData.list.map((item, index) => (
                  <tr>
                     <th>{item.dt_txt}</th>
                     <th>{item.main.temp}</th>
                     <th>{item.weather[0].description}</th>
                     <th>{item.main.humidity}</th>
                     <th>{item.wind.speed}</th>
                  </tr>
               ))}
               :(<div>날씨정보를 불러올수 없습니다.</div>)
            </tbody>
         </table>
      </div>
   )
}

export default Forecast
