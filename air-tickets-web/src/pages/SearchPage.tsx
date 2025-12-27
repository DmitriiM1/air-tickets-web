import { useEffect, useState } from 'react'
import { getFlights } from '../services/flightApi'
import type { Flight } from '../types/flight'
import FlightCard from '../components/FlightCard'

export default function SearchPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [airlineFilter, setAirlineFilter] = useState('all')

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [searchedFlights, setSearchedFlights] = useState<Flight[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getFlights().then(data => {
      setFlights(data)
      setLoading(false)
    })
  }, [])

  function resetSearchState() {
    setSearchedFlights(null)
  }

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

  function handleSearch() {
    if (!from || !to || !departureDate) {
      setError('Please fill in From, To and Departure date.')
      setSearchedFlights(null)
      return
    }

    setError('')

    const results = flights.filter(f =>
      f.from.toLowerCase() === from.toLowerCase() &&
      f.to.toLowerCase() === to.toLowerCase() &&
      f.departureTime.startsWith(departureDate)
    )

    setSearchedFlights(results)
  }

  function handleReset() {
    setFrom('')
    setTo('')
    setDepartureDate('')
    setReturnDate('')
    setAirlineFilter('all')
    setSortOrder('asc')
    setSearchedFlights(null)
    setError('')
  }

  return (
    <>
      <section className="bg-white rounded-xl border p-10 mb-8 min-h-[600px] flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find the best flight deals worldwide
        </h1>

        <p className="text-gray-600 max-w-2xl mb-8">
          AirTickets helps you compare flights from trusted airlines, choose the
          best routes, and book your journey with confidence.
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-600 font-medium">
            {error}
          </p>
        )}

        <div className="bg-gray-50 border rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              placeholder="From"
              value={from}
              required
              onChange={e => {
                setFrom(e.target.value)
                setError('')
                resetSearchState()
              }}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="To"
              value={to}
              required
              onChange={e => {
                setTo(e.target.value)
                setError('')
                resetSearchState()
              }}
              className="border rounded px-3 py-2"
            />
            <input
              type="date"
              value={departureDate || ''}
              onChange={e => {
                setDepartureDate(e.target.value)
                setError('')
                resetSearchState()
              }}
              className="border rounded px-3 py-2"
            />
            {/* <input
              type="date"
              value={returnDate || ''}
              onChange={e => {
                setReturnDate(e.target.value)
                setError('')
                resetSearchState()
              }}
              className="border rounded px-3 py-2"
            /> */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
              >
                Search
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={!from && !to && !departureDate && !returnDate}
                className="border border-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="border p-2 rounded w-50 h-12"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          <select
            value={airlineFilter}
            onChange={e => setAirlineFilter(e.target.value)}
            className="border p-2 rounded w-50 h-12"
          >
            <option value="all">All airlines</option>
            {airlines.map(a => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(searchedFlights ?? filteredFlights).length === 0 && (
          <p className="text-gray-600 col-span-full">
            No flights found for selected criteria
          </p>
        )}

        {(searchedFlights ?? filteredFlights).map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </>
  )
}