export default function SearchForm() {
  return (
    <form className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <input
        placeholder="From"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        placeholder="To"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  )
}