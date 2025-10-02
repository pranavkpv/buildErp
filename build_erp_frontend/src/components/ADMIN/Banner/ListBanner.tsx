import { useEffect, useState } from "react";
import type { inputBannerInterface } from "../../../ApiInterface/banner.interface";
import { deleteBannerDataApi, fetchBannerApi } from "../../../api/banner";
import AddBanner from "./AddBanner";
import BannerEdit from "./EditBanner";
import { toast } from "react-toastify";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";

function ListBanner() {
  const [bannerData, setBannerData] = useState<inputBannerInterface[]>([]);
  const [search, setSearch] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  // Delete
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Edit
  const [editData, setEditData] = useState<inputBannerInterface>({
    _id: "",
    title: "",
    subtitle: "",
    image: "",
  });
  const [editEnable, setEditEnable] = useState(false);

  // Add
  const [addEnable, setAddEnable] = useState(false);
  const [loadOn, setLoadOn] = useState(false)

  const fetchBannerList = async () => {
    setLoadOn(true)
    const response = await fetchBannerApi({ page, search });
    if (response.success) {
      setLoadOn(false)
      setBannerData(response.data.data);
      setTotalPage(response.data.totalPage);
    } else {
      setLoadOn(false)
      toast.error(response.message);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchBannerList();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [page, search]);

  const heading = ["Sl No", "Title", "Subtitle", "Image", "Action"];
  const dataKey = ["title", "subtitle", "image"] as (keyof inputBannerInterface)[];

  // Custom render function for the table
  const renderCell = (key: keyof inputBannerInterface, value: string, item: inputBannerInterface) => {
    if (key === "image") {
      return (
        <img
          src={value}
          alt={`${ item.title } banner`}
          className="h-10 w-16 object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.src = "/fallback-image.png";
          }}
        />
      );
    }
    return value;
  };

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <ReUsableSearch search={search} setSearch={setSearch} item="Banner Title" />
          <ReUsableAddButton addFuntion={() => setAddEnable(true)} item="Banner" />
        </div>
        <Loading loadOn={loadOn} />

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <ReUsableTable<inputBannerInterface> heading={heading} dataKey={dataKey} data={bannerData} page={page} setEditData={setEditData} setEditEnable={setEditEnable}
            setDeleteId={setDeleteId} setDeleteEnable={setDeleteEnable} renderCell={renderCell} />

          <ReUsablePagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      </div>

      <AddBanner enableAdd={addEnable} setEnableAdd={setAddEnable} onAddSuccess={fetchBannerList} />

      <BannerEdit editData={editData} editEnable={editEnable} setEnableEdit={setEditEnable} onEditSuccess={fetchBannerList} />

      <ReUsableDeleteModal enable={deleteEnable} deleteId={deleteId} onDeleteSuccess={fetchBannerList} setEnable={setDeleteEnable} api={deleteBannerDataApi}
        deleteItem="Banner" />


    </div>
  );
}

export default ListBanner;