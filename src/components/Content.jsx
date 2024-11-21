import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './css/Content.css'

const CurrentWeather = () => {
   //변수설정
   const [weatherData, setWeatherData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'
   const city = 'Incheon'

   useEffect(() => {
      //useEffect: 훅, 렌더링할때 사용
      const fetchCurrent = async () => {
         //async는 비동기함수
         setLoading(true) //로딩상태를 true지정
         try {
            //try: 에러가 발생할 수 있는 코드
            //axios.get:get요청을 보낼때 사용하는 구문
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)
            setWeatherData(response.data) //응답데이터를 받아서 저장
         } catch (error) {
            //error 구문
            setError('날씨 데이터를 가져오는 데 실패했습니다.')
         } finally {
            //로딩 상태가 끝났거나 로딩이 완료된 상태
            setLoading(false)
         }
      }

      fetchCurrent() //함수호출
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
