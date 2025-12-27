import { useEffect, useState } from 'react'
import { getFlights } from '../services/flightApi'
import type { Flight } from '../types/flight'
import FlightCard from '../components/FlightCard'

export default function SearchPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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
    const sortedFlights = [...flights].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    )

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Search Flights</h1>

      <label htmlFor="sortOrder" className="sr-only">Sort flights by price</label>

      <select
        id="sortOrder"
        value={sortOrder}
        onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
        className="mb-5 border p-2 rounded"
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedFlights.map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </>
  )
}