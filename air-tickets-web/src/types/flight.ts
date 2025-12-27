export interface Flight {
  id: string
  airline: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  price: number

  // Path to destination image stored in /public/images/destinations
  imagePath?: string
}