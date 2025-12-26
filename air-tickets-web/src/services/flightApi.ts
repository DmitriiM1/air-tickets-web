import type { Flight } from '../types/flight'

const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'Air Canada',
    from: 'Toronto',
    to: 'New York',
    departureTime: '2025-02-10T08:30',
    arrivalTime: '2025-02-10T10:15',
    price: 320,
  },
  {
    id: '2',
    airline: 'Delta Airlines',
    from: 'Toronto',
    to: 'Los Angeles',
    departureTime: '2025-02-11T07:00',
    arrivalTime: '2025-02-11T10:45',
    price: 540,
  },
  {
    id: '3',
    airline: 'United Airlines',
    from: 'Toronto',
    to: 'Chicago',
    departureTime: '2025-02-09T14:20',
    arrivalTime: '2025-02-09T16:05',
    price: 280,
  },
  {
    id: '4',
    airline: 'American Airlines',
    from: 'Toronto',
    to: 'Miami',
    departureTime: '2025-02-12T09:10',
    arrivalTime: '2025-02-12T13:30',
    price: 610,
  },
  {
    id: '5',
    airline: 'Lufthansa',
    from: 'Toronto',
    to: 'Frankfurt',
    departureTime: '2025-02-15T18:45',
    arrivalTime: '2025-02-16T07:20',
    price: 890,
  },
  {
    id: '6',
    airline: 'British Airways',
    from: 'Toronto',
    to: 'London',
    departureTime: '2025-02-13T21:00',
    arrivalTime: '2025-02-14T08:10',
    price: 820,
  },
  {
    id: '7',
    airline: 'Air France',
    from: 'Toronto',
    to: 'Paris',
    departureTime: '2025-02-14T19:30',
    arrivalTime: '2025-02-15T09:00',
    price: 860,
  },
]
export function getFlights(): Promise<Flight[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockFlights)
    }, 1000)
  })
}