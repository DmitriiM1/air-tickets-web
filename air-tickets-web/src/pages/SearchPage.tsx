import { useEffect, useState } from 'react'
import { getFlights } from '../services/flightApi'
import type { Flight } from '../types/flight'
import FlightCard from '../components/FlightCard'

export default function SearchPage() {
  const [flights, setFlights] = useState<Flight[]>([])

  useEffect(() => {
    getFlights().then(setFlights)
  }, [])

  return (
    <>
      <h1>Search Flights</h1>
      {flights.map(f => (
        <FlightCard key={f.id} flight={f} />
      ))}
    </>
  )
}