import { useParams } from 'react-router-dom'
import { getFlights } from '../services/flightApi'
import { useEffect, useState } from 'react'
import type { Flight } from '../types/flight'

export default function FlightDetailsPage() {
  const { id } = useParams()
  const [flight, setFlight] = useState<Flight | null>(null)

  useEffect(() => {
    getFlights().then(flights => {
      setFlight(flights.find(f => f.id === id) || null)
    })
  }, [id])

  if (!flight) return <p>Loading...</p>

  return (
    <>
      <h1>{flight.airline}</h1>
      <p>{flight.from} → {flight.to}</p>
      <p>Departure: {flight.departureTime}</p>
      <p>Arrival: {flight.arrivalTime}</p>
      <p>Price: ${flight.price}</p>
    </>
  )
}