
import { useEffect, useState } from "react";
import LabourAdd from "./LabourAdd";
import LabourEdit from "./LabourEdit";
import DeleteLabour from "./LabourDelete";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getLabour } from "../../../api/Admin/labour";

type labourData = {
  _id: string;
  labour_type: string;
  daily_wage: number;
};

function Labourlist() {
  const [labour, setLabour] = useState<labourData[]>([]);
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)
  const [search, setSearch] = useState("");

  // Add
  const [addEnable, setAddEnable] = useState(false);

  // Edit
  const [editEnable, setEditEnable] = useState(false);
  const [labourId, setLabourId] = useState("");
  const [lab_type, setLabtype] = useState("");
  const [wage, setWage] = useState(0);

  // Delete
  const [deleteId, setDeleteId] = useState("");
  const [deleteEnable, setdeleteEnable] = useState(false);



  const fetchData = async () => {
      const data =await  getLabour(page,search)
      setLabour(data.getLabourData);
      setTotal(Math.ceil(data.totalPage))
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  // Filtered labour data based on search input
  const filteredLabour = labour.filter((item) =>
    item.labour_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-700/50">
        <div className="flex justify-between items-center mb-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search labour type..."
            className="w-1/2 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {/* Add Labour Button */}
          <button
            onClick={() => setAddEnable(true)}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" /> Add Labour
          </button>
        </div>

        {/* Labour List Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-gray-700">SL No</th>
                <th className="px-6 py-4 border-b border-gray-700">Labour Type</th>
                <th className="px-6 py-4 border-b border-gray-700">Daily Wage</th>
                <th className="px-6 py-4 border-b border-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredLabour.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400 font-medium">
                    No labour types found.
                  </td>
                </tr>
              ) : (
                filteredLabour.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-300">{element.labour_type}</td>
                    <td className="px-6 py-4 text-gray-300">₹{element.daily_wage.toFixed(2)}</td>
                    <td className="px-6 py-4 flex justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setEditEnable(true);
                          setLabourId(element._id);
                          setLabtype(element.labour_type);
                          setWage(element.daily_wage);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 shadow-sm"
                      >
                        <PencilIcon className="h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(element._id);
                          setdeleteEnable(true);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 shadow-sm"
                      >
                        <TrashIcon className="h-4 w-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i)}
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
        </div>
      </div>

      {/* Modals */}
      <LabourAdd addEnable={addEnable} setAddEnable={setAddEnable} onsuccessAdd={fetchData} />
      <LabourEdit
        editEnable={editEnable}
        setEditEnable={setEditEnable}
        labourId={labourId}
        lab_type={lab_type}
        wage={wage}
        onSuccessEdit={fetchData}
      />
      <DeleteLabour
        deleteEnable={deleteEnable}
        setdeleteEnable={setdeleteEnable}
        labourId={deleteId}
        onDeleteSuccess={fetchData}
      />
    </div>
  );
}

export default Labourlist;