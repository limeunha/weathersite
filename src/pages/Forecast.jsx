import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherData } from '../features/weathers/weatherSlice'
import Menu from '../components/Menu'

import '../App.css'

const Forecast = () => {
   const dispatch = useDispatch()
   const { forecastData, loading, error } = useSelector((state) => state.weather)
   const city = 'Incheon'

   useEffect(() => {
      dispatch(fetchWeatherData(city))
   }, [dispatch, city])

   if (loading) {
      return <div>로딩 중</div>
   }

   if (error) {
      return <div>{error}</div>
   }

   const list = forecastData?.list || []

   if (list.length === 0) {
      return <div>날씨정보 로딩중</div>
   }

   return (
      <>
         <Menu />
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
      </>
   )
}

export default Forecast
