import { useEffect, useState } from "react";
import AddUnit from "./AddUnit";
import EditUnit from "./EditUnit";
import DeleteUnit from "./DeleteUnit";
import { getUnit } from "../../api/UnitApi/unit";
import type { unitInput } from "ApiInterface/UnitApiInterface";
import ReUsableTable from "../../components/ReUsableComponents/ReUsableTable";



function Unit() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [unitList, setUnitList] = useState<unitInput[]>([]);
  const [searchUnit, setSearchUnit] = useState<string>("");
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)

  const [enableEdit, setEnableEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState<unitInput>({ _id: "", short_name: "", unit_name: "" })
  const [enableDelete, setEnableDelete] = useState(false);

  const fetchData = async () => {
    const search = searchUnit
    const response = await getUnit({ page, search })
    setTotal(Math.ceil(response.data.totalPage))
    setUnitList(response.data.data);
  };

  useEffect(() => {
    let debounce = setTimeout(() => {
      fetchData();
    }, 500)
    return () => {
      clearTimeout(debounce)
    }
  }, [page, searchUnit]);

  const heading = ["Sl No", "Unit", "Short Unit", "Action"];
  const dataKey = ["unit_name", "short_name"] as (keyof unitInput)[];

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search unit
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search unit..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
              onChange={(e) => setSearchUnit(e.target.value)}
            />
          </div>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            onClick={() => setEnableAdd(true)}
          >
            + Add Unit
          </button>
        </div>

        <AddUnit
          enable={enableAdd}
          setEnable={setEnableAdd}
          onAdd={fetchData}
        />

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <ReUsableTable
            data={unitList}
            dataKey={dataKey}
            heading={heading}
            page={page}
            setDeleteEnable={setEnableDelete}
            setDeleteId={setDeleteId}
            setEditData={setEditData}
            setEditEnable={setEnableEdit}
          />
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
      <EditUnit
        enable={enableEdit}
        setEnable={setEnableEdit}
        editData={editData}
        onUpdate={fetchData}
      />

      <DeleteUnit
        enable={enableDelete}
        deleteId={deleteId}
        setEnable={setEnableDelete}
        onDeleteSuccess={fetchData}
      />
    </div>
  );
}

export default Unit;