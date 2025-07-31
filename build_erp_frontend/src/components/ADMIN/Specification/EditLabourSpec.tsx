import { useContext, useEffect, useState } from "react"
import AppContext from "../../../Context/AppContext"
import { labourDataFetch } from "../../../api/Admin/labour"

type labourData = {
  sl: number
  labour_type: string
  quantity: number
  daily_wage: number
}

type labourDetails = {
  _id: string
  labour_type: string
  daily_wage: number
}

type prop = {
  editrow: labourData[]
}

function EditLabourSpec({ editrow }: prop) {
  const { seteditlabourDetails, edtLabourEnable, setEditLabourEnable, setEditAdditionalEnable } = useContext(AppContext)
  if (!edtLabourEnable) return null

  const [row, setRow] = useState<labourData[]>(editrow)
  const [labour, setLabour] = useState<labourDetails[]>([])

  const fetchLabour = async () => {
    const response = await labourDataFetch()
    setLabour(response.data)
  }

  useEffect(() => {
    fetchLabour()
    setRow(editrow.length > 0 ? editrow : [{ sl: 1, labour_type: "", quantity: 0, daily_wage: 0 }])
  }, [editrow])

  const fetchWage = async (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const lab = labour.find(element => element._id === e.target.value)
    if (lab) {
      const newRow = [...row]
      newRow[index].labour_type = lab.labour_type
      newRow[index].daily_wage = lab.daily_wage
      setRow(newRow)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 rounded-2xl p-6 sm:p-8 max-w-4xl w-full mx-4 border border-gray-700/50 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Edit Labour Details</h1>
        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">SL No</th>
                <th className="px-6 py-4 text-left">Labour Type</th>
                <th className="px-6 py-4 text-left">Quantity</th>
                <th className="px-6 py-4 text-left">Unit Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {row.map((element, index) => (
                <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-200">{element.sl}</td>
                  <td className="px-6 py-4">
                    <select
                      aria-label="Select labour type"
                      value={labour.find(l => l.labour_type === element.labour_type)?._id || ""}
                      onChange={(e) => fetchWage(index, e)}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm"
                    >
                      <option value="">Select Labour Type</option>
                      {labour.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.labour_type}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={element.quantity || ""}
                      placeholder="Enter quantity"
                      onChange={(e) => {
                        const newRow = [...row]
                        newRow[index].quantity = Number(e.target.value)
                        setRow(newRow)
                      }}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm placeholder:text-gray-400"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-200">{element.daily_wage.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={() => {
              const newRow = [...row, {
                sl: row.length + 1,
                labour_type: "",
                quantity: 0,
                daily_wage: 0
              }]
              setRow(newRow)
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
          >
            + Add Labour
          </button>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setEditLabourEnable(false)}
              className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const data = row.map(item => {
                  const lab = labour.find(l => l.labour_type === item.labour_type)
                  return {
                    labour_id: lab?._id || "",
                    numberoflabour: item.quantity,
                    daily_wage: item.daily_wage
                  }
                })
                seteditlabourDetails(data)
                setEditLabourEnable(false)
                setEditAdditionalEnable(true)
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLabourSpec