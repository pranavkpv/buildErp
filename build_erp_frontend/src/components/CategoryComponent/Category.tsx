import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { categoryList } from "../../api/CategoryApi/category";

type CategoryType = {
  _id: string;
  category_name: string;
  description: string;
};

function Category() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [searchCategory, setSearchCat] = useState<string>("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [enableEdit, setEnableEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [enableDelete, setEnableDelete] = useState(false);

  const fetchData = async () => {
    try {
      const response = await categoryList({ page, search: searchCategory });
      if (response.success) {
        setTotal(Math.ceil(response.data.totalPages) || 0);
        setCategories(response.data.data ?? []);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(0); 
      fetchData();
    }, 500);
    return () => clearTimeout(handler);
  }, [searchCategory]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 max-w-5xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="w-full sm:w-1/2">
            <label htmlFor="searchCategory" className="sr-only">
              Search category
            </label>
            <input
              id="searchCategory"
              type="text"
              placeholder="Search category..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm"
              onChange={(e) => setSearchCat(e.target.value)}
              value={searchCategory}
            />
          </div>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2 text-sm"
            onClick={() => setEnableAdd(true)}
          >
            <PlusIcon className="h-5 w-5" /> Add Category
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-4 w-16">
                  SL No
                </th>
                <th scope="col" className="px-6 py-4 w-1/4">
                  Category
                </th>
                <th scope="col" className="px-6 py-4">
                  Description
                </th>
                <th scope="col" className="px-6 py-4 w-48 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400 text-sm font-medium">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((cat, index) => (
                  <tr key={cat._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 text-gray-300">{index + 1 + page * 5}</td>
                    <td className="px-6 py-4 text-gray-300">{cat.category_name}</td>
                    <td className="px-6 py-4 text-gray-300">{cat.description}</td>
                    <td className="px-6 py-4 flex justify-center items-center gap-3">
                      <button
                        onClick={() => {
                          setEnableEdit(true);
                          setEditId(cat._id);
                          setEditCategory(cat.category_name);
                          setEditDescription(cat.description);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold flex items-center gap-1"
                        aria-label={`Edit category ${cat.category_name}`}
                      >
                        <PencilIcon className="h-4 w-4" /> Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold flex items-center gap-1"
                        onClick={() => {
                          setDeleteId(cat._id);
                          setEnableDelete(true);
                        }}
                        aria-label={`Delete category ${cat.category_name}`}
                      >
                        <TrashIcon className="h-4 w-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-center gap-2 mt-6 p-4">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-xl ${
                  page === i
                    ? "bg-teal-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <AddCategory enable={enableAdd} setEnable={setEnableAdd} onAdd={fetchData} />
        <EditCategory
          enable={enableEdit}
          setEnable={setEnableEdit}
          editId={editId}
          editCategory={editCategory}
          editDescription={editDescription}
          onUpdate={fetchData}
        />
        <DeleteCategory
          enable={enableDelete}
          deleteId={deleteId}
          setEnable={setEnableDelete}
          onDeleteSuccess={fetchData}
        />
      </div>
    </div>
  );
}

export default Category;