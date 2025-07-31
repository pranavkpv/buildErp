
import { putBrandData } from "../../../api/Admin/brand";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";



type EditBrandProps = { // Renamed Unitprops to EditBrandProps for clarity
  editId: string;
  enable: boolean;
  editBrandname: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void;
};

function EditBrand({
  enable,
  setEnable,
  editId,
  editBrandname,
  onUpdate,
}: EditBrandProps) {
  const [brand_name, setBrand_name] = useState(editBrandname);
  const brandRef = useRef<HTMLParagraphElement>(null);

  // Update local state when props change (when a different brand is selected for edit)
  useEffect(() => {
    setBrand_name(editBrandname);
  }, [editBrandname]);

  const editSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (brand_name.trim() === "") {
      if (brandRef.current) {
        brandRef.current.innerText = "Brand name is required.";
      }
      return;
    } else {
      if (brandRef.current) {
        brandRef.current.innerText = "";
      }
    }
      const _id = editId
      const data = await putBrandData(_id,brand_name)
      if (data.success) {
        toast.success(data.message);
        onUpdate();
        setEnable(false); 
      } else {
        toast.error(data.message);
      }
  };

  if (!enable) return null; // Render nothing if the modal is not enabled

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <form
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md space-y-6 border border-gray-700/50"
        onSubmit={editSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
          Edit Brand
        </h2>

        <div className="space-y-2">
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-200 mb-1">
            Brand Name
          </label>
          <input
            id="brandName"
            type="text"
            value={brand_name}
            placeholder="Enter brand name"
            onChange={(e) => setBrand_name(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={brandRef} className="text-red-400 text-sm mt-1" />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
            onClick={() => setEnable(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
             className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBrand;