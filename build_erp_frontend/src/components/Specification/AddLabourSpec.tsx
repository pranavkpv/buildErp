import { labourDataFetch } from "../../api/Admin/labour";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Labour {
  _id: string;
  labour_type: string;
  daily_wage: number;
}

interface Row {
  sl: number;
  labour: string;
  numberof_labour: number;
  salary: number;
  total: number;
}

interface AddLabourProp {
  setSpecLabour: React.Dispatch<React.SetStateAction<Row[]>>;
  addLabEnable: boolean;
  setAddLabEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setAdditionalEnable: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddLabourSpec({
  setSpecLabour,
  addLabEnable,
  setAddLabEnable,
  setAdditionalEnable,
}: AddLabourProp) {
  const [labourData, setLabourData] = useState<Labour[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

  const [number,setNumber] = useState(0)
  const [netSalary, setNetSalary] = useState(0);
  const [error, setError] = useState("");

  const fetchLabour = async () => {
    try {
      const data = await labourDataFetch()
      setLabourData(data)
    } catch (err) {
      toast.error("Failed to fetch labour data.");
    }
  };

  useEffect(() => {
    fetchLabour();
  }, []);

  useEffect(() => {
    const total = rows.reduce((sum, item) => sum + item.total, 0);
    setNetSalary(total);
  }, [rows]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        sl: rows.length + 1,
        labour: "",
        numberof_labour: 0,
        salary: 0,
        total: 0,
      },
    ]);
  };


  const salaryFetch = (_id: string, index: number) => {
    const filterWithId = labourData.filter((element) => element._id == _id)
    const updatedRow = [...rows]
    updatedRow[index].salary = filterWithId[0].daily_wage
    setRows(updatedRow)
  }

  const handleNext = () => {
    if (rows.length === 0 || rows.some((row) => !row.labour || row.numberof_labour <= 0)) {
      setError("All rows must have a labour type and a positive number of labourers.");
      return;
    }
    setSpecLabour(rows);
    setAddLabEnable(false);
    setAdditionalEnable(true);
    setRows([])
    setError("");
  };

  if (!addLabEnable) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="add-labour-title"
    >
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 space-y-6 border border-gray-700/50">
        <h2
          id="add-labour-title"
          className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4"
        >
          Add Labour
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="p-3 text-left">SL NO</th>
                <th className="p-3 text-left">Labour Type</th>
                <th className="p-3 text-left">No. of Labour</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.sl} className="border-b border-gray-700">
                  <td className="p-3 text-gray-200">{row.sl}</td>
                  <td className="p-3">
                    <select
                      value={row.labour}
                      onChange={(e) => {
                        const updatedRow = [...rows]
                        for(let char of rows){
                          if(char.labour==e.target.value){
                             let newRow = rows.filter((element,i)=>i!=index)
                             setRows(newRow)
                            toast.error("labour already exist")
                            return
                          }
                        }
                        updatedRow[index].labour = e.target.value
                        setRows(updatedRow)
                        salaryFetch(e.target.value, index)
                      }}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                      aria-label="Select labour type"
                    >
                      <option value="">Select labour type</option>
                      {labourData.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.labour_type}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      value={row.numberof_labour}
                      onChange={(e)=>{
                         setNumber(Number(e.target.value))
                         const updatedRow = [...rows]
                         updatedRow[index].numberof_labour=Number(e.target.value)
                         updatedRow[index].total = Number(e.target.value) * updatedRow[index].salary 
                      }}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                      placeholder="Number of labour"
                    />
                  </td>
                  <td className="p-3 text-gray-200">{row.salary}</td>
                  <td className="p-3 text-gray-200">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
        <p className="text-gray-200 text-lg">Net Salary: ₹{netSalary}</p>
        <div className="flex justify-between pt-4">
          <button
            onClick={addRow}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            + Add Labour
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setAddLabEnable(false);
                setRows([]);
                setError("");
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
            >

              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLabourSpec;