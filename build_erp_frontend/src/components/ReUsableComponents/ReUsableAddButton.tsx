import { PlusCircleIcon } from "lucide-react"

interface Prop {
   item: string
   addFuntion: () => void
}

function ReUsableAddButton({ item, addFuntion }: Prop) {
   return (
      <button
         className="w-full sm:w-48 bg-gradient-to-r from-teal-500 to-teal-600 
             hover:from-teal-600 hover:to-teal-700 text-white 
             px-8 py-3 rounded-lg shadow-md hover:shadow-xl 
             transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2"
         onClick={addFuntion}
      >
         <PlusCircleIcon className="h-5 w-5" /> Add {item}
      </button>

   )
}

export default ReUsableAddButton