import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import FlightDetailsPage from './pages/FlightDetailsPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/flight/:id" element={<FlightDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
