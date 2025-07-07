import { toast } from "react-toastify";
import { fetchUnitData } from "../../api/Admin/unit";
import { useEffect, useRef, useState } from "react";

interface SpecAddProp {
  setSpecIdInput: React.Dispatch<React.SetStateAction<string>>;
  setSpecNameInput: React.Dispatch<React.SetStateAction<string>>;
  setSpecUnitInput: React.Dispatch<React.SetStateAction<string>>;
  setDescriptionInput: React.Dispatch<React.SetStateAction<string>>;
  addEnable: boolean;
  setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setMatAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  specId: string
  specname: string
  specUnit: string
 
}

type Unit = {
  _id: string,
  unit_name: string,
  short_name: string
}


function SpecAdd({
  addEnable,
  setAddEnable,
  setSpecIdInput,
  setSpecNameInput,
  setSpecUnitInput,
  setDescriptionInput,
  setMatAddEnable,
  specId,
  specname,
  specUnit,
  
}: SpecAddProp) {
  if (!addEnable) return null;
  const [error, setError] = useState("");


  const [specUnitData, setSpecUnit] = useState<Unit[]>([])
  const specIdRef = useRef<HTMLParagraphElement>(null)
  const specnameRef = useRef<HTMLParagraphElement>(null)
  const specUnitRef = useRef<HTMLParagraphElement>(null)

  const fetchUnit = async () => {
    try {
      const data = await fetchUnitData()
      setSpecUnit(data)
    } catch (error) {
      console.log(error)
      toast.error("unit not fetch")
    }
  }
  useEffect(() => {
    fetchUnit()
  })

  const Errorpop = () => {
    let hasError = false
    if (specId.trim() == "") {
      specIdRef.current ? specIdRef.current.innerText = "specId is required" : ""
      hasError=true
    } else {
      specIdRef.current ? specIdRef.current.innerText = "" : "specId is required"
    }
    if (specname.trim() == "") {
      specnameRef.current ? specnameRef.current.innerText = "specname is required" : ""
       hasError=true
    } else {
      specnameRef.current ? specnameRef.current.innerText = "" : "specname is required"
    }
     if (specUnit.trim() == "") {
      specUnitRef.current ? specUnitRef.current.innerText = "specUnit is required" : ""
       hasError=true
    } else {
      specUnitRef.current ? specUnitRef.current.innerText = "" : "specUnit is required"
    }
    if(hasError) return
    setAddEnable(false)
    setMatAddEnable(true)
  }


  return (
    <div
      className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="add-spec-title"
    >
      <form
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-6 border border-gray-700/50 "
      >
        <h2
          id="add-spec-title"
          className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4 "
        >
          Add New Specification
        </h2>
        <div>
          <label htmlFor="specId" className="block text-sm font-medium text-gray-200 mb-1">
            Specification ID
          </label>
          <input
            id="specId"
            type="text"
            placeholder="Enter specification ID"
            onChange={(e) => setSpecIdInput(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={specIdRef} className="text-red-400 text-sm"></p>
        </div>
        <div>
          <label htmlFor="specName" className="block text-sm font-medium text-gray-200 mb-1">
            Specification Name
          </label>
          <input
            id="specName"
            type="text"
            placeholder="Enter specification name"
            onChange={(e) => setSpecNameInput(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={specnameRef} className="text-red-400 text-sm"></p>
        </div>
        <div>
          <label htmlFor="specUnit" className="block text-sm font-medium text-gray-200 mb-1">
            Unit
          </label>
          <select
            id="specUnit"
            onChange={(e) => setSpecUnitInput(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 text-sm"
            aria-label="Select unit"
          >
            <option value="">Select unit</option>
            {specUnitData.map((element) => <option value={element._id}>{element.unit_name}</option>)}
          </select>
          <p ref={specUnitRef} className="text-red-400 text-sm"></p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter specification description"
            onChange={(e) => setDescriptionInput(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
        </div>
        {error && (
          <p id="spec-error" className="text-red-400 text-sm">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setAddEnable(false);
              setSpecIdInput("");
              setSpecNameInput("");
              setSpecUnitInput("");
              setDescriptionInput("");
              setError("");
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={Errorpop}
            type="button"
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpecAdd;