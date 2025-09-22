import { useEffect, useState } from "react";
import AddSitemanager from "./Addsitemanager";
import EditSitemanager from "./EditSitemanager";
import { deleteSitemanagerData, fetchSitemanager } from "../../../api/Admin/sitemanager";
import type { SiteData } from "ApiInterface/sitemanager.interface";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";



function SitemanagerList() {
  const [sitedata, setSiteData] = useState<SiteData[]>([]);
  const [searchSite, setSearchSite] = useState("")
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)

  // Add
  const [addEnable, setAddEnable] = useState(false);

  // Edit
  const [editEnable, setEditEnable] = useState(false);
  const [editData, setEditData] = useState<SiteData>({ _id: "", email: "", project_id: "", username: "" })

  // Delete
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const fetchData = async () => {
    const search = searchSite
    const response = await fetchSitemanager(page, search)
    setTotal(Math.ceil(response.data.totalPage))
    setSiteData(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [page, searchSite]);

  const heading = ["Sl No", "Site Manager Name", "Email", "Action"];
  const dataKey = ["username", "email"] as (keyof SiteData)[];



  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search site manager
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search site manager..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
              aria-label="Search site manager"
              onChange={(e) => setSearchSite(e.target.value)}
            />
          </div>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            onClick={() => setAddEnable(true)}
            aria-label="Add new site manager"
          >
            + Add Site Manager
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <ReUsableTable
            data={sitedata}
            dataKey={dataKey}
            heading={heading}
            page={page}
            setDeleteEnable={setDeleteEnable}
            setDeleteId={setDeleteId}
            setEditData={setEditData}
            setEditEnable={setEditEnable}
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
      </div>

      {/* Modals */}
      <AddSitemanager
        addEnable={addEnable}
        setAddEnable={setAddEnable}
        onAddSuccess={fetchData}
      />
      <EditSitemanager
        editData={editData}
        editEnable={editEnable}
        setEditEnable={setEditEnable}
        onEditSuccess={fetchData}
      />
      <ReUsableDeleteModal
        enable={deleteEnable}
        setEnable={setDeleteEnable}
        deleteId={deleteId}
        onDeleteSuccess={fetchData}
        api={deleteSitemanagerData}
        deleteItem="Sitemanager"
      />
    </div>
  );
}

export default SitemanagerList;