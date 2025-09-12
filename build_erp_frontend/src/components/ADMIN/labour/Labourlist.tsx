import { useEffect, useState } from "react";
import LabourAdd from "./LabourAdd";
import LabourEdit from "./LabourEdit";
import DeleteLabour from "./LabourDelete";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getLabour } from "../../../api/Admin/labour";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import type { labourData } from "ApiInterface/labour.interface";



function LabourList() {
  const [labour, setLabour] = useState<labourData[]>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  // Add
  const [addEnable, setAddEnable] = useState(false);

  // Edit
  const [editEnable, setEditEnable] = useState(false);
  const [editData, setEditData] = useState<labourData>({_id:"",daily_wage:0,labour_type:""})

  // Delete
  const [deleteId, setDeleteId] = useState("");
  const [deleteEnable, setdeleteEnable] = useState(false);

  const fetchData = async () => {
    const response = await getLabour({ page, search });
    setLabour(response.data.data);
    setTotal(Math.ceil(response.data.totalPage));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [page, search]);

  const heading = ["Sl No", "Labour Type", "Daily Wage", "Actions"];
  const dataKey = ["labour_type", "daily_wage"] as (keyof labourData)[];

  const renderCell = (key: keyof labourData, value: any) => {
    if (key === "daily_wage") {
      return `₹${ value.toFixed(2) }`;
    }
    return value;
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <input
            type="text"
            placeholder="Search labour type..."
            className="w-full sm:w-1/2 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            onClick={() => setAddEnable(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" /> Add Labour
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700/50">
          <ReUsableTable<labourData>
            heading={heading}
            dataKey={dataKey}
            data={labour}
            page={page}
            setEditData={setEditData}
            setEditEnable={setEditEnable}
            setDeleteId={setDeleteId}
            setDeleteEnable={setdeleteEnable}
            renderCell={renderCell}
          />
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${ page === i
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <LabourAdd
        addEnable={addEnable}
        setAddEnable={setAddEnable}
        onsuccessAdd={fetchData}
      />
      <LabourEdit
        editEnable={editEnable}
        setEditEnable={setEditEnable}
        editData={editData}
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

export default LabourList;