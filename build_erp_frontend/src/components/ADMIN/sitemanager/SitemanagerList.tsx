import axios from "axios";
import { useEffect, useState } from "react";
import AddSitemanager from "./Addsitemanager";
import EditSitemanager from "./EditSitemanager";
import DeleteSitemanager from "./DeleteSitemanager";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { fetchSitemanager } from "../../../api/Admin/sitemanager";

type SiteData = {
  _id: string;
  siteId: string;
  username: string;
  email: string;
  password: string;
};

function SitemanagerList() {
  const [sitedata, setSiteData] = useState<SiteData[]>([]);
  const [searchSite, setSearchSite] = useState("")
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)

  // Add
  const [addEnable, setAddEnable] = useState(false);

  // Edit
  const [editEnable, setEditEnable] = useState(false);
  const [editId, setId] = useState("");
  const [editSitemanager, setEditSitemanager] = useState("");
  const [editEmail, setEmail] = useState("");

  // Delete
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const fetchData = async () => {
      const search = searchSite
      const data = await fetchSitemanager(page,search)
      setTotal(Math.ceil(data.totalPage))
      setSiteData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [page, searchSite]);

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
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL NO</th>
                <th className="px-6 py-4">Site Manager Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {sitedata.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No Site Managers Found.
                  </td>
                </tr>
              ) : (
                sitedata.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200">{(index + 1) + (page * 5)}</td>
                    <td className="px-6 py-4 text-gray-200">{element.username}</td>
                    <td className="px-6 py-4 text-gray-200">{element.email}</td>
                    <td className="px-6 py-4 space-x-3">
                      <button
                        onClick={() => {
                          setEditEnable(true);
                          setId(element._id);
                          setEditSitemanager(element.username);
                          setEmail(element.email);
                        }}
                        className="text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Edit site manager ${ element.username }`}
                      >

                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteEnable(true);
                          setDeleteId(element._id);
                        }}
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete site manager ${ element.username }`}
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
        editEnable={editEnable}
        setEditEnable={setEditEnable}
        editId={editId}
        editSitemanager={editSitemanager}
        editEmail={editEmail}
        onEditSuccess={fetchData}
      />
      <DeleteSitemanager
        deleteEnable={deleteEnable}
        setDeleteEnable={setDeleteEnable}
        deleteId={deleteId}
        onDeleteSuccess={fetchData}
      />
    </div>
  );
}

export default SitemanagerList;