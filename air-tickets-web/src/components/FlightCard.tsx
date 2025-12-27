import type { Flight } from '../types/flight'
import { Link } from 'react-router-dom'

export default function FlightCard({ flight }: { flight: Flight }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm">

            {flight.imagePath && (
                <img
                    src={flight.imagePath}
                    alt={`${flight.to} destination`}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    loading="lazy"
                />
            )}

            <h3 className="text-lg font-semibold">{flight.airline}</h3>

            <p className="text-sm text-gray-600">
                {flight.from} → {flight.to}
            </p>

            <p className="text-sm">
                Departure: {new Date(flight.departureTime).toLocaleString()}
            </p>

            <p className="text-sm">
                Arrival: {new Date(flight.arrivalTime).toLocaleString()}
            </p>

            <p className="mt-2 font-bold">${flight.price}</p>

            <Link
                to={`/flight/${flight.id}`}
                className="text-blue-600 text-sm mt-2 inline-block"
            >
                View details
            </Link>
        </div>
    )
}