
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import SpecAdd from "./SpecAdd";
import AddMaterialSpec from "./AddMaterialSpec";
import AddLabourSpec from "./AddLabourSpec";
import AddAdditionalSpec from "./AddAdditionalSpec";
import { fetchSpec, fetchSum } from "../../api/Admin/Spec";
import DeleteSpec from "./DeleteSpec";



interface materialData {
  material_id: string
  quantity: number
}

interface labourData {
  labour_id: string,
  numberoflabour: number
}

interface Spec {
  _id: string;
  spec_id: string;
  spec_name: string;
  spec_unit: string;
  description: string;
  materialDetails: materialData[]
  labourDetails: labourData[]
  additionalExpense_per: Number
  profit_per: Number
}



interface Row {
  sl: number;
  materialId: string
  materialname: string;
  brand: string;
  unit: string;
  quantity: number;
  unitprice: number;
  total: number;
}

interface LabourRow {
  sl: number;
  labour: string;
  numberof_labour: number;
  salary: number;
  total: number;
}



function SpecList() {

  //add spec first page
  const [specId, setSpecId] = useState("")
  const [specname, setSpecName] = useState("")
  const [specUnit, setSpecUnit] = useState("")
  const [specDescription, setSpecDescription] = useState("")


  const [specData, setSpecData] = useState<Spec[]>([]);
  const [searchSpec, setSearchSpec] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [addEnable, setAddEnable] = useState(false);
  const [addMatEnable, setMatAddEnable] = useState(false);
  const [specMaterial, setSpecMaterial] = useState<Row[]>([]);
  const [specLabour, setSpecLabour] = useState<LabourRow[]>([]);
  const [addLabEnable, setAddLabEnable] = useState(false);
  const [additionalEnable, setAdditionalEnable] = useState(false);
  const [netAmount, setNetAmount] = useState(0);
  const [specList, setSpecList] = useState(true)

  
  const [editId,setEditId] = useState("")
  

  //delete 
  const [deleteEnable,setDeleteEnable] = useState(false)
  const [deleteId,setDeleteId] = useState("")







  const fetchData = async () => {

    try {
      const search = searchSpec
      const data = await fetchSpec(page, search)
      console.log(data)
      setSpecData(data.result);
      setTotalPage(Math.ceil(data.totalPage) || 0);
    } catch (err) {
      toast.error("Failed to fetch specifications.");
    }
  };




  useEffect(() => {
    fetchData();
  }, [page, searchSpec]);

  useEffect(() => {
    const sumOfMaterial = specMaterial.reduce((sum, item) => sum + item.total, 0);
    const sumOfLabour = specLabour.reduce((sum, item) => sum + item.total, 0);
    setNetAmount(sumOfMaterial + sumOfLabour);
  }, [specLabour, specMaterial]);
  if (!specList) return null

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search specification..."
            className="w-1/2 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setSearchSpec(e.target.value)}
            value={searchSpec}
          />
          <button
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
            onClick={() => {
              setAddEnable(true)

            }}
          >
            <PlusIcon className="h-5 w-5" /> Add Specification
          </button>

        </div>
        <SpecAdd
          addEnable={addEnable}
          setAddEnable={setAddEnable}
          setMatAddEnable={setMatAddEnable}
          setSpecIdInput={setSpecId}
          setSpecNameInput={setSpecName}
          setSpecUnitInput={setSpecUnit}
          setDescriptionInput={setSpecDescription}
          specId={specId}
          specname={specname}
          specUnit={specUnit}

        />
        <AddAdditionalSpec
          setAdditionalEnable={setAdditionalEnable}
          additionalEnable={additionalEnable}
          netAmount={netAmount}
          specLabour={specLabour}
          specMaterial={specMaterial}
          specId={specId}
          specname={specname}
          specUnit={specUnit}
          specDescription={specDescription}
          onaddSucess={fetchData}
          setSpecMaterial={setSpecMaterial}
          setSpecLabour={setSpecLabour}
        />
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-gray-700">SL No</th>
                <th className="px-6 py-4 border-b border-gray-700">Spec ID</th>
                <th className="px-6 py-4 border-b border-gray-700">Spec Name</th>
                {/* <th className="px-6 py-4 border-b border-gray-700">Unit Rate</th> */}
                <th className="px-6 py-4 border-b border-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {specData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400 font-medium">
                    No specifications found.
                  </td>
                </tr>
              ) : (
                specData.map((spec, index) => (
                  <tr key={spec._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 text-gray-300">{index + 1 + page * 5}</td>
                    <td className="px-6 py-4 text-gray-300">{spec.spec_id}</td>
                    <td className="px-6 py-4 text-gray-300">{spec.spec_name}</td>
                    {/* <td className="px-6 py-4 text-gray-300"></td> */}
                    <td className="px-6 py-4 flex justify-center items-center gap-2">
                      <button
                       onClick={()=>setEditId(spec._id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 shadow-sm"
                      >
                        <PencilIcon className="h-4 w-4" /> Edit
                      </button>
                      <button
                      onClick={()=>{
                        setDeleteId(spec._id)
                        setDeleteEnable(true)
                      }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 shadow-sm"
                      >
                        <TrashIcon className="h-4 w-4" /> Delete
                      </button>
                      <DeleteSpec deleteEnable={deleteEnable} 
                      setDeleteEnable={setDeleteEnable}
                      deleteId={deleteId}
                      onDeleteSuccess={fetchData}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${ page === i ? "bg-teal-600 text-white shadow-md" : "bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white" }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <AddMaterialSpec
          setMatAddEnable={setMatAddEnable}
          addMatEnable={addMatEnable}
          setSpecMaterial={setSpecMaterial}
          setAddLabEnable={setAddLabEnable}
        />
        <AddLabourSpec
          setSpecLabour={setSpecLabour}
          addLabEnable={addLabEnable}
          setAddLabEnable={setAddLabEnable}
          setAdditionalEnable={setAdditionalEnable}
        />

      </div>
    </div>
  );
}

export default SpecList;