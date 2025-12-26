import { Flight } from '../types/flight'
import { Link } from 'react-router-dom'

export default function FlightCard({ flight }: { flight: Flight }) {
  return (
    <div>
      <h3>{flight.airline}</h3>
      <p>{flight.from} → {flight.to}</p>
      <p>${flight.price}</p>
      <Link to={`/flight/${flight.id}`}>View details</Link>
    </div>
  )
}