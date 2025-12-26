export default function SearchForm() {
  return (
    <form className="flex gap-4">
      <input placeholder="From" />
      <input placeholder="To" />
      <input type="date" />
      <button type="submit">Search</button>
    </form>
  )
}