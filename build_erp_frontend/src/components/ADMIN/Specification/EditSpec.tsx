import { fetchUnitData } from "../../../api/Admin/unit";
import AppContext from "../../../Context/AppContext";
import { useContext, useEffect, useState } from "react";

type unitData = {
  _id: string;
  unit_name: string;
};

function EditSpec() {
  const {
    editSpecEnable,
    setEditSpecEnable,
    setEditMaterialEnable,
    seteditSpec_id,
    setEditSpec_name,
    setEditSpecUnit,
    setEditDescription,
    editSpec_id,
    editSpec_name,
    editSpec_unit,
    editDescription,
  } = useContext(AppContext);

  if (!editSpecEnable) return null;

  const [unit, setUnit] = useState<unitData[]>([]);

  const getUnit = async () => {
    const response = await fetchUnitData();
    setUnit(response.data);
  };

  useEffect(() => {
    getUnit();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Edit Specification</h1>
        <form className="space-y-5">
          <div>
            <label htmlFor="specId" className="sr-only">Specification ID</label>
            <input
              id="specId"
              type="text"
              value={editSpec_id || ""}
              placeholder="Enter specification ID"
              onChange={(e) => seteditSpec_id(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
          </div>
          <div>
            <label htmlFor="specName" className="sr-only">Specification Name</label>
            <input
              id="specName"
              type="text"
              value={editSpec_name || ""}
              placeholder="Enter specification name"
              onChange={(e) => setEditSpec_name(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
          </div>
          <div>
            <label htmlFor="specUnit" className="sr-only">Select Unit</label>
            <select
              id="specUnit"
              value={editSpec_unit || ""}
              aria-label="Select unit"
              onChange={(e) => setEditSpecUnit(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium"
            >
              <option value="" className="text-gray-400">Select unit</option>
              {unit.map((element) => (
                <option key={element._id} value={element._id} className="text-gray-100">
                  {element.unit_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="specDescription" className="sr-only">Description</label>
            <textarea
              id="specDescription"
              value={editDescription || ""}
              placeholder="Enter description"
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium resize-y min-h-[100px]"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditSpecEnable(false)}
              className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setEditSpecEnable(false);
                setEditMaterialEnable(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSpec;