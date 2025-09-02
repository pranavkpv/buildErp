import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { inputBannerInterface } from "../../../ApiInterface/banner.interface";
import { fetchBannerApi } from "../../../api/banner";
import AddBanner from "./AddBanner";
import BannerEdit from "./EditBanner";
import DeleteBanner from "./DeleteBanner";


function ListBanner() {
  const [bannerData, setBannerData] = useState<inputBannerInterface[]>([]);
  const [search, setSearch] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  // Delete
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Edit
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [editFile, setEditFile] = useState("");
  const [editEnable, setEditEnable] = useState(false);
  const [editBannerId, setEditBannerId] = useState("");

  // Add
  const [addEnable, setAddEnable] = useState(false);

  const fetchBannerList = async () => {
    const response = await fetchBannerApi({ page, search });
    if (response.success) {
      setBannerData(response.data.data);
      setTotalPage(response.data.totalPage);
    } else {
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
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL No</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Subtitle</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {bannerData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No Banners Found.
                  </td>
                </tr>
              ) : (
                bannerData.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200">{(index + 1) + page * 5}</td>
                    <td className="px-6 py-4 text-gray-200">{element.title}</td>
                    <td className="px-6 py-4 text-gray-200">{element.subtitle}</td>
                    <td className="px-6 py-4">
                      <img
                        src={element.image}
                        alt={`${ element.title } banner`}
                        className="h-10 w-16 object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.src = "/fallback-image.png"; // Fallback image
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        onClick={() => {
                          setEditTitle(element.title);
                          setEditSubtitle(element.subtitle);
                          setEditFile(element.image);
                          setEditEnable(true);
                          setEditBannerId(element._id);
                        }}
                        className="text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Edit banner ${ element.title }`}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteEnable(true);
                          setDeleteId(element._id);
                        }}
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete banner ${ element.title }`}
                      >
                        <TrashIcon className="h-5 w-5" />
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
                    : 'bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AddBanner enableAdd={addEnable} setEnableAdd={setAddEnable} onAddSuccess={fetchBannerList} />

       <BannerEdit
        editTitle={editTitle}
        editSubtitle={editSubtitle}
        editFile={editFile}
        editEnable={editEnable}
        setEnableEdit={setEditEnable}
        onEditSuccess={fetchBannerList}
        editBannerId={editBannerId}
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