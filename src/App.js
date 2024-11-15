import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Forecast from './pages/Forecast'
import NotFound from './pages/NotFound'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Forecast" element={<Forecast />}></Route>
         <Route path="/*" element={<NotFound />}></Route>
      </Routes>
   )
}

export default App
