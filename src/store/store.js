import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weathers/weather'

const store = configureStore({
   reducer: {
      weathers: weatherReducer,
   },
})
export default store
