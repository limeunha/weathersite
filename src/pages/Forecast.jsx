import React, { useState, useEffect } from 'react' //useState:훅,사용자입력,API응답데이터 , uI의 표시상태관리 useEffect: api호출, 구독, 타이머설정, 로컬스토리지 처리
import axios from 'axios' //GET, POST, PUT, DELETE와 같은 응답,요청에 사용

import '../App.css'

// {{}}: 구조분해할당구문으로 부모컴포넌트에서 props에서 weather값추출
const WeatherForecast = ({ weather }) => {
   //변수지정
   const [forecastData, setForecastData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'
   const city = 'Incheon'

   const fetchWeatherData = async () => {
      //fetchWeatherData로 지정하여 데이터를 가져오는 비동기함수
      setLoading(true)
      try {
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`) //axios.get는 데이터를 요청
         setForecastData(response.data) //데이터를 성공적으로 가져오면 respons.data에 저장되어있음
      } catch (error) {
         setError('날씨 데이터가 없습니다.') //예외처리를 위해 사용, 데이터가 없을땐 에러 메시지가 뜸
      } finally {
         setLoading(false) //finally는 오류발생과 관계없이 실행되는 코드
      }
   }
   //훅
   useEffect(() => {
      fetchWeatherData() //날씨데이터를 가져오는 비동기함수

      //setInterval : 주어진 시간마다 지정된함수반복
      //3600 * 1000: 은(3600초 * 1000 = 3, 600,000 밀리초)로 1시간마다 날씨데이터를 자동 갱신
      const interval = setInterval(fetchWeatherData, 3600 * 1000)

      return () => clearInterval(interval) //불필요한 반복작업중지
   }, [])

   //loading 이 true일때만 로딩중을 실행
   if (loading) {
      return <div>로딩 중</div>
   }

   //error가 true 일때만 error 실행
   if (error) {
      return <div>{error}</div>
   }

   //삼항연산자: 조건 ? 참일 때 실행할 코드 : 거짓일 때 실행할 코드
   return <div>{forecastData ? <Forecast data={forecastData} /> : <div>날씨 데이터가 없습니다.</div>}</div>
}

//Forecast에서 data를 직접꺼내는문법
function Forecast({ data }) {
   const { list } = data //data안에 list만 추출

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
