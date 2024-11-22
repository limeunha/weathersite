import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Forecast from './pages/Forecast'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'

function App() {
   return (
      <Routes>
         <Route path="/*" element={<Home />} />
         <Route path="/forecast" element={<Forecast />}></Route>
         <Route path="/weather/:city" element={<SearchResults />} />
         <Route path="/*" element={<NotFound />}></Route>
      </Routes>
   )
}

export default App
