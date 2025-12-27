import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getFlights } from '../services/flightApi'
import type { Flight } from '../types/flight'

export default function FlightDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [flight, setFlight] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFlights().then(flights => {
      setFlight(flights.find(f => f.id === id) || null)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return <p>Loading flight details...</p>
  }

  if (!flight) {
    return <p>Flight not found</p>
  }

  const departure = new Date(flight.departureTime)
  const arrival = new Date(flight.arrivalTime)

  const durationMinutes =
    (arrival.getTime() - departure.getTime()) / 1000 / 60

  const hours = Math.floor(durationMinutes / 60)
  const minutes = Math.floor(durationMinutes % 60)

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">{flight.airline}</h1>

      <p className="mb-1">
        {flight.from} → {flight.to}
      </p>

      <p className="text-sm">
        Departure: {departure.toLocaleString()}
      </p>

      <p className="text-sm">
        Arrival: {arrival.toLocaleString()}
      </p>

      <p className="text-sm">
        Duration: {hours}h {minutes}m
      </p>

      <p className="mt-2 font-bold">Price: ${flight.price}</p>
    </div>
  )
}