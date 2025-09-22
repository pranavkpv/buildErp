import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { PlusIcon } from "@heroicons/react/24/outline";
import { categoryList, deleteCategoryData } from "../../api/CategoryApi/category";
import type { CategoryInput } from "../../ApiInterface/CategoryApiInterface";
import ReUsableTable from "../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../components/ReUsableComponents/ReUsableDeleteModal";



function Category() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [categories, setCategories] = useState<CategoryInput[]>([]);
  const [searchCategory, setSearchCat] = useState<string>("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [enableEdit, setEnableEdit] = useState(false);

  //edit data
  const [editData, setEditData] = useState<CategoryInput>({ _id: '', category_name: '', description: '' })
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

  const heading = ["Sl No", "Category", "Description", "Action"];
  const dataKey = ["category_name", "description"] as (keyof CategoryInput)[];


  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
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
          <ReUsableTable
            data={categories}
            dataKey={dataKey}
            heading={heading}
            page={page}
            setDeleteEnable={setEnableDelete}
            setDeleteId={setDeleteId}
            setEditData={setEditData}
            setEditEnable={setEnableEdit}
          />
          <div className="flex justify-center gap-2 mt-6 p-4">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-xl ${ page === i
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
          editData={editData}
          enable={enableEdit}
          setEnable={setEnableEdit}
          onUpdate={fetchData}
        />
        <ReUsableDeleteModal
          enable={enableDelete}
          deleteId={deleteId}
          setEnable={setEnableDelete}
          onDeleteSuccess={fetchData}
          api={deleteCategoryData}
          deleteItem="Category"
        />
      </div>
    </div>
  );
}

export default Category;