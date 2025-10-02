import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { categoryList, deleteCategoryData } from "../../api/CategoryApi/category";
import type { CategoryInput } from "../../ApiInterface/CategoryApiInterface";
import ReUsableTable from "../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../components/Loading";



function Category() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [categories, setCategories] = useState<CategoryInput[]>([]);
  const [searchCategory, setSearchCat] = useState<string>("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [enableEdit, setEnableEdit] = useState(false);
  const [loadOn, setLoadOn] = useState(false)


  //edit data
  const [editData, setEditData] = useState<CategoryInput>({ _id: '', category_name: '', description: '' })
  const [deleteId, setDeleteId] = useState("");
  const [enableDelete, setEnableDelete] = useState(false);

  const fetchData = async () => {
    try {
      const response = await categoryList({ page, search: searchCategory });
      if (response.success) {
        setLoadOn(false)
        setTotal(Math.ceil(response.data.totalPages) || 0);
        setCategories(response.data.data ?? []);
      } else {
        setLoadOn(false)
        toast.error(response.message);
      }
    } catch (error) {
      setLoadOn(false)
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(0);
      fetchData();
      setLoadOn(true)
    }, 500);
    return () => clearTimeout(handler);
  }, [searchCategory,page]);


  const heading = ["Sl No", "Category", "Description", "Action"];
  const dataKey = ["category_name", "description"] as (keyof CategoryInput)[];


  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <ReUsableSearch search={searchCategory} setSearch={setSearchCat} item="Category" />
          <ReUsableAddButton addFuntion={() => setEnableAdd(true)} item="Category" />
        </div>
        <Loading loadOn={loadOn} />
        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <ReUsableTable data={categories} dataKey={dataKey} heading={heading} page={page} setDeleteEnable={setEnableDelete} setDeleteId={setDeleteId}
            setEditData={setEditData} setEditEnable={setEnableEdit} />

          <ReUsablePagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>
        <AddCategory enable={enableAdd} setEnable={setEnableAdd} onAdd={fetchData} />

        <EditCategory editData={editData} enable={enableEdit} setEnable={setEnableEdit} onUpdate={fetchData} />

        <ReUsableDeleteModal enable={enableDelete} deleteId={deleteId} setEnable={setEnableDelete} onDeleteSuccess={fetchData}
          api={deleteCategoryData} deleteItem="Category" />

      </div>
    </div>
  );
}

export default Category;