import { fetchUnitData } from "../../../api/Admin/unit";
import AppContext from "../../../Context/AppContext";
import { useContext, useEffect, useState } from "react";

type unitData = {
  _id: string;
  unit_name: string;
};

function AddSpec() {
  const {
    AddEnable,
    setAddEnable,
    setAddMaterialEnable,
    setSpecId,
    setSpecname,
    setSpecUnit,
    setSpecDescription,
  } = useContext(AppContext);

  const [unit, setUnit] = useState<unitData[]>([]);
  const [specId, setLocalSpecId] = useState<string>("");
  const [specName, setLocalSpecName] = useState<string>("");
  const [specUnit, setLocalSpecUnit] = useState<string>("");
  const [specDescription, setLocalSpecDescription] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getUnit = async () => {
    const response = await fetchUnitData();
    setUnit(response.data);
  };

  useEffect(() => {
    getUnit();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!specId.trim()) {
      newErrors.specId = "Specification ID is required";
    }
    if (!specName.trim()) {
      newErrors.specName = "Specification Name is required";
    }
    if (!specUnit) {
      newErrors.specUnit = "Unit is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setSpecId(specId);
      setSpecname(specName);
      setSpecUnit(specUnit);
      setSpecDescription(specDescription);
      setAddEnable(false);
      setAddMaterialEnable(true);
    }
  };

  if (!AddEnable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">
          Add Specification
        </h1>
        <form className="space-y-5">
          <div>
            <label htmlFor="specId" className="sr-only">
              Specification ID
            </label>
            <input
              id="specId"
              type="text"
              placeholder="Enter specification ID"
              value={specId}
              onChange={(e) => setLocalSpecId(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800/50 border ${
                errors.specId ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium`}
            />
            {errors.specId && (
              <p className="mt-1 text-red-500 text-xs">{errors.specId}</p>
            )}
          </div>
          <div>
            <label htmlFor="specName" className="sr-only">
              Specification Name
            </label>
            <input
              id="specName"
              type="text"
              placeholder="Enter specification name"
              value={specName}
              onChange={(e) => setLocalSpecName(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800/50 border ${
                errors.specName ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium`}
            />
            {errors.specName && (
              <p className="mt-1 text-red-500 text-xs">{errors.specName}</p>
            )}
          </div>
          <div>
            <label htmlFor="specUnit" className="sr-only">
              Select Unit
            </label>
            <select
              id="specUnit"
              aria-label="Select unit"
              value={specUnit}
              onChange={(e) => setLocalSpecUnit(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800/50 border ${
                errors.specUnit ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`}
            >
              <option value="" className="text-gray-400">
                Select unit
              </option>
              {unit.map((element) => (
                <option
                  key={element._id}
                  value={element._id}
                  className="text-gray-100"
                >
                  {element.unit_name}
                </option>
              ))}
            </select>
            {errors.specUnit && (
              <p className="mt-1 text-red-500 text-xs">{errors.specUnit}</p>
            )}
          </div>
          <div>
            <label htmlFor="specDescription" className="sr-only">
              Description
            </label>
            <textarea
              id="specDescription"
              placeholder="Enter description"
              value={specDescription}
              onChange={(e) => setLocalSpecDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium resize彼此

System: font-medium resize-y min-h-[100px]"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setAddEnable(false)}
              className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNext}
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

export default AddSpec;