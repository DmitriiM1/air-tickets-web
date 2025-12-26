import type { Flight } from '../types/flight'

const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'Air Canada',
    from: 'Toronto',
    to: 'New York',
    departureTime: '10:00',
    arrivalTime: '12:00',
    price: 320,
  },
]

export function getFlights(): Promise<Flight[]> {
  return Promise.resolve(mockFlights)
}