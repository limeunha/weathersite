import axios from 'axios'

BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
API_KEY = 'a102d5846843a7059b2ca1b040d90894'

const weatherApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json',
      Authorization: API_KEY,
   },
})

//공통 API 호출 함수
const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await weatherApi.get(url, { params })
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

//현재날씨
//3시간 마다 한번씩 바뀌는 5일치 날씨예보
