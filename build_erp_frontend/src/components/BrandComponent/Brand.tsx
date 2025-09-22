import { useEffect, useState } from "react";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import { PlusIcon } from "@heroicons/react/24/outline"; // Import icons
import { deleteBrandData, getbrandList } from "../../api/BrandApi/brand";
import ReUsableTable from "../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../components/ReUsableComponents/ReUsableDeleteModal";


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
  const [editData,setEditData] = useState<BrandType>({ _id: "", brand_name: "" })
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

          <button
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
            onClick={() => setEnableAdd(true)}
          >
            <PlusIcon className="h-5 w-5" /> Add Brand
          </button>
        </div>


        <AddBrand
          enable={enableAdd}
          setEnable={setEnableAdd}
          onAdd={fetchData}
        />


        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700/50">
          <ReUsableTable
            data={brandList}
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


        <EditBrand
          enable={enableEdit}
          setEnable={setEnableEdit}
          editData={editData}
          onUpdate={fetchData}
        />


        <ReUsableDeleteModal
          enable={enableDelete}
          deleteId={deleteId}
          setEnable={setEnableDelete}
          onDeleteSuccess={fetchData}
          api={deleteBrandData}
          deleteItem="Brand"
        />
      </div>
    </div>
  );
}

export default Brand;