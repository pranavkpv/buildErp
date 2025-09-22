import { useEffect, useState } from "react";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import { deleteBrandData, getbrandList } from "../../api/BrandApi/brand";
import ReUsableTable from "../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../components/ReUsableComponents/ReUsablePagination";


type BrandType = {
  _id: string;
  brand_name: string;
};

function Brand() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [brandList, setBrandList] = useState<BrandType[]>([]);
  const [searchBrand, setSearchBrand] = useState<string>("");
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)

  const [enableEdit, setEnableEdit] = useState(false);
  const [editData, setEditData] = useState<BrandType>({ _id: "", brand_name: "" })
  const [deleteId, setDeleteId] = useState("");
  const [enableDelete, setEnableDelete] = useState(false);


  const fetchData = async () => {
    const search = searchBrand
    const response = await getbrandList({ page, search })
    setBrandList(response.data.data);
    setTotal(Math.ceil(response.data.totalPage))
  };

  useEffect(() => {
    let debounce = setTimeout(() => {
      fetchData();
    }, 500)
    return () => {
      clearInterval(debounce)
    }
  }, [searchBrand, page]);


  const heading = ["Sl No", "Brand Name", "Action"];
  const dataKey = ["brand_name"] as (keyof BrandType)[];


  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search brand..."
            className="w-1/2 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setSearchBrand(e.target.value)}
            value={searchBrand}
          />

          <ReUsableAddButton addFuntion={() => setEnableAdd(true)} item="Brand" />

        </div>

        <AddBrand
          enable={enableAdd}
          setEnable={setEnableAdd}
          onAdd={fetchData}
        />

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700/50">

          <ReUsableTable data={brandList} dataKey={dataKey} heading={heading} page={page} setDeleteEnable={setEnableDelete}
            setDeleteId={setDeleteId} setEditData={setEditData} setEditEnable={setEnableEdit} />

          <ReUsablePagination page={page} setPage={setPage} totalPage={totalPage} />

        </div>

        <EditBrand enable={enableEdit} setEnable={setEnableEdit} editData={editData} onUpdate={fetchData} />

        <ReUsableDeleteModal enable={enableDelete} deleteId={deleteId} setEnable={setEnableDelete} onDeleteSuccess={fetchData}
          api={deleteBrandData} deleteItem="Brand" />

      </div>
    </div>
  );
}

export default Brand;