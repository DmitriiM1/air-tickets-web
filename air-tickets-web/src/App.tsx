import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import FlightDetailsPage from './pages/FlightDetailsPage'
import Layout from './components/Layout'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/flight/:id" element={<FlightDetailsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
