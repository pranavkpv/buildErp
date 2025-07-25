import { putCategory } from "../../../api/Admin/category";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";



type CategoryProps = {
  editId: string;
  enable: boolean;
  editCategory: string;
  editDescription: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void;
};

function EditCategory({
  enable,
  setEnable,
  editId,
  editCategory,
  editDescription,
  onUpdate,
}: CategoryProps) {
  const [category, setCategory] = useState(editCategory);
  const [description, setDescription] = useState(editDescription);
  const catRef = useRef<HTMLParagraphElement>(null);

  // Update local state when props change (when a different category is selected for edit)
  useEffect(() => {
    setCategory(editCategory);
    setDescription(editDescription);
  }, [editCategory, editDescription]);

  const editSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (category.trim() === "") {
      if (catRef.current) {
        catRef.current.innerText = "Category name is required.";
      }
      return;
    } else {
      if (catRef.current) {
        catRef.current.innerText = "";
      }
    }

    try {
      const _id= editId
      const category_name=category
      const data = await putCategory(_id,category_name,description)
      if (data.success) {
        toast.success(data.message);
        onUpdate(); 
        setEnable(false); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category. Please try again.");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <form
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md space-y-6 border border-gray-700/50"
        onSubmit={editSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
          Edit Category
        </h2>

        <div className="space-y-2">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-200 mb-1">
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={category}
            placeholder="Enter category name"
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={catRef} className="text-red-400 text-sm mt-1" />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
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
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;