import { useEffect, useState } from "react";
import type { inputBannerInterface } from "../../../ApiInterface/banner.interface";
import { fetchBannerApi } from "../../../api/banner";
import AddBanner from "./AddBanner";
import BannerEdit from "./EditBanner";
import DeleteBanner from "./DeleteBanner";
import { toast } from "react-toastify";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";

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

  const fetchBannerList = async () => {
    const response = await fetchBannerApi({ page, search });
    if (response.success) {
      setBannerData(response.data.data);
      setTotalPage(response.data.totalPage);
    } else {
      toast.error(response.message);
      console.error("Failed to fetch banners:", response.message);
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
          alt={`${item.title} banner`}
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
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search banner
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search with title"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            onClick={() => setAddEnable(true)}
          >
            + Add Banner
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <ReUsableTable<inputBannerInterface>
            heading={heading}
            dataKey={dataKey}
            data={bannerData}
            page={page}
            setEditData={setEditData}
            setEditEnable={setEditEnable}
            setDeleteId={setDeleteId}
            setDeleteEnable={setDeleteEnable}
            renderCell={renderCell}
          />

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${page === i
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AddBanner
        enableAdd={addEnable}
        setEnableAdd={setAddEnable}
        onAddSuccess={fetchBannerList}
      />

      <BannerEdit
        editData={editData}
        editEnable={editEnable}
        setEnableEdit={setEditEnable}
        onEditSuccess={fetchBannerList}
      />
      <DeleteBanner
        deleteEnable={deleteEnable}
        bannerId={deleteId}
        onDeleteSuccess={fetchBannerList}
        setdeleteEnable={setDeleteEnable}
      />
    </div>
  );
}

export default ListBanner;