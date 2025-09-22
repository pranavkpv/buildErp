interface prop {
   totalPage: number,
   setPage: React.Dispatch<React.SetStateAction<number>>,
   page: number
}

function ReUsablePagination({ totalPage, setPage, page }: prop) {
   return (
      <div className="flex justify-center gap-2 mt-6">
         {Array.from({ length: totalPage }, (_, i) => (
            <button
               key={i + 1}
               onClick={()=>setPage(i)}
               className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
        ${ page === i
                     ? 'bg-teal-600 text-white shadow-md'
                     : 'bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white' }
      `}
            >
               {i + 1}
            </button>
         ))}
      </div>
   )
}

export default ReUsablePagination