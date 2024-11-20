//검색결과 화면
import React, { useState } from 'react'
import axios from 'axios'
import { Wrap, Main } from '../styles/StyledComponent' 
import Menu from '../components/Menu'
import Footer from '../components/Footer' 
import Button from '@mui/material/Button' 

function WeatherForecast() {
   const [location, setLocation] = useState('') 
   const [weatherData, setWeatherData] = useState(null) 
   const [loading, setLoading] = useState(false) 
   const [error, setError] = useState(null) 

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'

  
   const fetchWeatherData = async (city) => {
      setLoading(true) 
      setError(null) 

      try {
        
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)

         if (response.data.cod === '404') {
            setError('도시를 찾을 수 없습니다. 올바른 도시 이름을 입력하세요.')
         } else {
            setWeatherData(response.data) 
         }
      } catch (error) {
         setError('날씨 데이터를 가져오는 데 실패했습니다. 도시 이름을 다시 확인해주세요.')
      } finally {
         setLoading(false) 
      }
   }

   const handleSearch = () => {
      if (location.trim()) {
         fetchWeatherData(location) 
      } else {
         setError('도시 이름을 입력해주세요') /
      }
   }


   if (loading) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>검색 중...</h2>
            </Main>
            <Footer />
         </Wrap>
      )
   }


   if (error) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>오류 발생: {error}</h2>
            </Main>
            <Footer />
         </Wrap>
      )
   }

   return (
      <Wrap>
         <Menu />
         <Main>
      
            <input
               type="text"
               placeholder="도시 이름을 입력하세요"
               value={location}
               onChange={(e) => setLocation(e.target.value)} 
            />
            <Button variant="contained" onClick={handleSearch}>
               검색
            </Button>

          
            {weatherData && (
               <div>
                  <h3>{weatherData.name}</h3> 
                  <p>날씨: {weatherData.weather[0].description}</p> 
                  <p>온도: {Math.round(weatherData.main.temp)}°C</p> 
                  <p>습도: {weatherData.main.humidity}%</p> 
                
               </div>
            )}
         </Main>
         <Footer />
      </Wrap>
   )
}

export default WeatherForecast

