//검색결과 화면
import React, { useState, useEffect,useCallback } from 'react'
import axios from 'axios'

function WeatherForecast() {
   const [loacation, setLocation] = useState('')
   const [weatherData, setWeatherData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   const API_KEY = 'a102d5846843a7059b2ca1b040d90894'

   const fetchWeatherData = async (city) => {
      try {
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
         setWeatherData(response.data)
      } catch (error) {
         setError('데이터가 없습니다.')
      } finally {
         setLoading(false)
      }
   }
}

const handleSearch = () => {
   if (location.trim()) {
      fetchWeatherData(location)
   }
}

if (loading && page === 1)
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>검색 중...</h2>
            </Main>
            <Footer />
         </Wrap>
      )

   if (error)
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>오류 발생: {error}</h2>
            </Main>
            <Footer />
         </Wrap>
      )

function SearchResults() {
   return (  );
}

export default SearchResults;
