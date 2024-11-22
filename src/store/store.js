import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weathers/weatherSlice'

const store = configureStore({
   reducer: {
      weather: weatherReducer,
   },
})

export default store
