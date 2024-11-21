//검색결과 화면
import React, { useEffect, useState } from 'react' //useEffect:API 호출, 구독, 타이머 설정, 로컬 스토리지 처리 외부발생처리, useState:훅, 사용자 입력, API 응답 데이터, UI의 표시 상태 관리
import { useParams } from 'react-router-dom' //useParams는 특정값을 추출할때 유용

function SearchResults() {
   const { city } = useParams() //훅, useParams가 city 를 객체형태로 변환
   const [weatherData, setWeatherData] = useState(null) //날씨데이터를 지정하는 함수고 초기값 null로 지정

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'
   const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

   useEffect(() => {
      //비동기작업
      const fetchWeather = async () => {
         //fetchWeather함수를 지정해서 날씨데이터를 가져오는 async는 비동기함수
         try {
            //try구문은 오류발생가능성이 있는 코드
            //예외처리
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=kr`) //awit는 fetch가 완료될때까지기달리는함수 await가 없다면 fetch는 다음순서로 넘어갈수있다
            if (!response.ok) {
               //응답코드가 맞는지 false면 error
               throw new Error('날씨 정보를 가져올 수 없습니다.') //예외를 던지는 구문
            }
            const data = await response.json() //데이터를 json으로 변환하는 구문
            setWeatherData(data) //data를 WEatherData로 저장하는 구문
         } catch (error) {
            //catch구문은 오류발생이 났을때 실행되는 코드
            console.error('Error:', error)
         }
      }

      fetchWeather() //날씨데이터를 받아오는경우
   }, [city]) //city값이 변할때마다 useEffect가 다시실행

   return (
      <div
         //css
         style={{
            color: 'rgb(0, 102, 255)',
            textAlign: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: '40px',
         }}
      >
         {/*조건부랜더링:true면 첫번째실행이고 false면 두번째실행*/}
         {weatherData ? (
            <div>
               <h2>{weatherData.name}</h2>
               <p>상태: {weatherData.weather[0].description}</p>
               <p>기온: {weatherData.main.temp}°C</p>
            </div>
         ) : (
            <p>날씨 정보를 불러올 수 없습니다.</p>
         )}
      </div>
   )
}

export default SearchResults
