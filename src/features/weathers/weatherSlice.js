import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = 'a102d5846843a7059b2ca1b040d90894'

export const fetchWeatherData = createAsyncThunk('weatherData/fetchWeatherData', async (city, thunkAPI) => {
   try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue('날씨 데이터가 없습니다.')
   }
})

const weatherSlice = createSlice({
   name: 'weather',
   initialState: {
      forecastData: { list: [] },
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchWeatherData.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.forecastData = action.payload
            state.loading = false
            state.error = null
         })
         .addCase(fetchWeatherData.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
         })
   },
})

export default weatherSlice.reducer
