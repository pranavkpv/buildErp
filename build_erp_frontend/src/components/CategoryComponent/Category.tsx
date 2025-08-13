import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)
  const [enableEdit, setEnableEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [enableDelete, setEnableDelete] = useState(false);

  const fetchData = async () => {
    const search = searchCategory
    const data = await categoryList({page, search})
    setTotal(Math.ceil(data.totalPage))
    setCategories(data.data);
  };
  useEffect(() => {
    fetchData();
  }, [page, searchCategory]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search category..."
            className="w-1/2 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setSearchCat(e.target.value)}
            value={searchCategory}
          />
          <button
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
            onClick={() => setEnableAdd(true)}
          >
            <PlusIcon className="h-5 w-5" /> Add Category
          </button>
        </div>
        <AddCategory enable={enableAdd} setEnable={setEnableAdd} onAdd={fetchData} />
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-gray-700">SL No</th>
                <th className="px-6 py-4 border-b border-gray-700">Category</th>
                <th className="px-6 py-4 border-b border-gray-700">Description</th>
                <th className="px-6 py-4 border-b border-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400 font-medium">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((cat, index) => (
                  <tr key={cat._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 text-gray-300">{(index + 1) + (page * 5)}</td>
                    <td className="px-6 py-4 text-gray-300">{cat.category_name}</td>
                    <td className="px-6 py-4 text-gray-300">{cat.description}</td>
                    <td className="px-6 py-4 flex justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setEnableEdit(true);
                          setEditId(cat._id);
                          setEditCategory(cat.category_name);
                          setEditDescription(cat.description);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 shadow-sm"
                      >
                        <PencilIcon className="h-4 w-4" /> Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 shadow-sm"
                        onClick={() => {
                          setDeleteId(cat._id);
                          setEnableDelete(true);
                        }}
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