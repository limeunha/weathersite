import './css/Banner.css'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Banner() {
   //변수지정
   const [city, setCity] = useState('')
   const [weatherData, setWeatherData] = useState(null)
   const [error, setError] = useState(null)

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'
   const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

   const navigate = useNavigate() //컴포넌트내에 페이지를 이동

   //async를 이용해 비동기함수 실행
   const fetchWeather = async () => {
      if (!city) return //null, undefined, false, 0, NaN,("")일 때 이 조건문이 참 , city값이 유효한값인지 체크하는 조건

      //try구문은 오류발생가능성이 있는 코드
      try {
         const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=kr`) //fetch는 요청을 보내고 응답을 기다리는 비동기함수, await를 사용해 응답을 기다린후 실행

         // console.log('Response:', response) //응답객체를 실행, 호출이 성공적으로 이루어졌는지 확인 유용

         //확인하는 속성
         if (!response.ok) {
            throw new Error('날씨 정보가 없습니다.')
         }

         const data = await response.json() //json객체로 변환시키는 구문
         // console.log('Weather Data:', data) //변환시키는 구문을 data에 저장하는 구문
         setWeatherData(data) //상태 업데이트 함수
         setError(null) //에러상태 업데이트 함수

         navigate(`/weather/${data.name}`) //훅에서 반환된 페이지 이동함수
      } catch (error) {
         //catch구문은 오류발생이 났을때 실행되는 코드
         // console.error('Error:', error)
         setWeatherData(null)
         setError(error.message)
      }
   }

   const handleCityChange = (event) => {
      //handleCityChange:이벤트 핸들러함수,사용자가 입력필드에 값을 변경할때 실행
      setCity(event.target.value) //상태 업데이트 함수
   }

   const handleSubmit = (event) => {
      //handleSubmit:이벤트 핸들러함수, 폼을 제출할때 사용
      event.preventDefault() //폼 제출 후 페이지가 리로드되지 않도록 방지
      fetchWeather() //날씨 정보를 API로부터 받아오는 비동기 함수
   }

   return (
      <div
         style={{
            paddingleft: '20px',
            width: '150%',
            height: '300px',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),url(/images/sky.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
         }}
      >
         <div className="banner">
            <h1 className="banner_msg">환영합니다~ 지역을 검색해주세요!</h1>
            <form className="banner_form" onSubmit={handleSubmit}>
               <TextField sx={{ backgroundColor: 'white', color: 'rgb(0, 102, 255)' }} id="fullwith" fullWidth label="지역을 영어로 입력해주세요" variant="outlined" value={city} onChange={handleCityChange} />
            </form>

            {weatherData && (
               <div>
                  <h2>{weatherData.name}</h2>
                  <p>상태: {weatherData.weather[0].description}</p>
                  <p>기온: {weatherData.main.temp}°C</p>
               </div>
            )}

            {error && <p>{error}</p>}
         </div>
      </div>
   )
}

export default Banner
