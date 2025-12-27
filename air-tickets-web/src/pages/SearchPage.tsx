import { useEffect, useState } from 'react'
import { getFlights } from '../services/flightApi'
import type { Flight } from '../types/flight'
import FlightCard from '../components/FlightCard'

export default function SearchPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFlights().then(data => {
      setFlights(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <p>Loading flights...</p>
  }

  if (!flights.length) {
    return <p>No flights found</p>
  }

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Search Flights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flights.map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </>
  )
}