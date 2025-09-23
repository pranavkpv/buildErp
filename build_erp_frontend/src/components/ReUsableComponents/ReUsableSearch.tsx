interface prop {
   search: string
   setSearch: React.Dispatch<React.SetStateAction<string>>
   item: string
}
function ReUsableSearch({ search, setSearch, item }: prop) {
   return (
      <div className="w-full sm:w-1/2">
         <label htmlFor="search" className="sr-only">
            Search {item}
         </label>
         <input
            id="search"
            type="text"
            placeholder={`Search by ${ item }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
         />
      </div>
   )
}

export default ReUsableSearch