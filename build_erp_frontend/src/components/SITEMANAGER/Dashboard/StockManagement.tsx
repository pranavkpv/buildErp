import { fetchStockApi } from "../../../api/Sitemanager/dashboard";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Project = {
  _id: string;
  project_name: string;
};

type stockType = {
  _id: string;
  material_name: string;
  brand_name: string;
  unit_name: string;
  stock: number;
};

function StockManagement() {
  const [project, setProject] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState("");
  const [material, setMaterial] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [stock, setStock] = useState<stockType[]>([]);

  const fetchProject = async () => {
    const response = await getSitemanagersProject();
    if (response.success) {
      setProject(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const fetchStocks = async () => {
    const response = await fetchStockApi(projectId, material, page);
    if (response.success) {
      setStock(response.data.data);
      setTotalPage(response.data.totalPage);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchStocks();
    }, 500);
    return () => clearTimeout(handler);
  }, [projectId, material, page]);

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Stock Management</h2>
      <div className="mb-6 flex flex-col sm:flex-row justify-center gap-4">
        <select
          aria-label="Select project"
          value={projectId}
          onChange={(e) => {
            setProjectId(e.target.value);
            setPage(0);
          }}
          className="w-full sm:w-1/2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white text-sm"
        >
          <option value="">Select Project</option>
          {project.map((element) => (
            <option key={element._id} value={element._id}>
              {element.project_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search with material..."
          value={material}
          onChange={(e) => {
            setMaterial(e.target.value);
            setPage(0);
          }}
          className="w-full sm:w-1/2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white text-sm placeholder-gray-400"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-fixed bg-slate-700 text-sm text-left">
          <thead className="bg-slate-600 text-gray-200 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="py-3 px-4 w-[20%]">SL No</th>
              <th className="py-3 px-4 w-[20%]">Material</th>
              <th className="py-3 px-4 w-[20%]">Brand</th>
              <th className="py-3 px-4 w-[20%]">Unit</th>
              <th className="py-3 px-4 w-[20%]">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {stock.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-12 text-gray-400 text-sm font-medium"
                >
                  {material || projectId
                    ? "No stock matches your search or project selection."
                    : "No stock data available."}
                </td>
              </tr>
            ) : (
              stock.map((element, index) => (
                <tr
                  key={element._id}
                  className="border-t border-slate-600 hover:bg-slate-600 transition-colors duration-200"
                >
                  <td className="py-3 px-4 text-gray-300 w-[20%]">
                    {page * 5 + index + 1}
                  </td>
                  <td className="py-3 px-4 text-gray-300 w-[20%] truncate">
                    {element.material_name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-300 w-[20%] truncate">
                    {element.brand_name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-300 w-[20%] truncate">
                    {element.unit_name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-300 w-[20%]">
                    {element.stock ?? 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPage >= 1 && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg disabled:opacity-50 hover:bg-slate-500 transition-colors duration-200 text-sm font-medium"
          >
            Previous
          </button>
          <span className="text-gray-300 text-sm">
            Page {page + 1} of {totalPage}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPage - 1))}
            disabled={page === totalPage - 1}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg disabled:opacity-50 hover:bg-slate-500 transition-colors duration-200 text-sm font-medium"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default StockManagement;