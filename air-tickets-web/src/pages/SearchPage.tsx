import { useEffect, useState } from 'react'
import { getFlights } from '../services/flightApi'
import type { Flight } from '../types/flight'
import FlightCard from '../components/FlightCard'

export default function SearchPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [airlineFilter, setAirlineFilter] = useState('all')

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

  const airlines = Array.from(new Set(flights.map(f => f.airline)))

  const sortedFlights = [...flights].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  )

  const filteredFlights =
    airlineFilter === 'all'
      ? sortedFlights
      : sortedFlights.filter(f => f.airline === airlineFilter)

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Search Flights</h1>

      <div className="flex gap-4 mb-5">
        <select
          value={sortOrder}
          onChange={e =>
            setSortOrder(e.target.value as 'asc' | 'desc')
          }
          className="border p-2 rounded"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <select
          value={airlineFilter}
          onChange={e => setAirlineFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All airlines</option>
          {airlines.map(a => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFlights.map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </>
  )
}