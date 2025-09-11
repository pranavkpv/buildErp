import { useLocation, useNavigate } from "react-router-dom";

type projectData = {
  _id: string;
  project_name: string;
  expected_image: string;
  finalImage: string;
  area: number;
  address: string;
  status: string;
  description: string;
  latitude: number;
  longitude: number;
};

function AdminProjectList() {
  const location = useLocation();
  const projects: projectData[] = location.state || [];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 tracking-tight text-center">
          {projects.length > 0
            ? projects[0].status === "processing"
              ? "Ongoing Projects"
              : projects[0].status === "pending"
              ? "Pending Projects"
              : "Completed Projects"
            : "Project List"}
        </h1>
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              No Projects Available
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              No projects are available for this category. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((element: projectData) => (
              <div
                key={element._id}
                className="bg-slate-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={element.expected_image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={element.project_name || "Project Image"}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                  loading="lazy"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                    {element.project_name || "Unnamed Project"}
                  </h2>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                    {element.description || "No description available."}
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      <span className="font-medium">Area:</span>{" "}
                      {element.area ? `${element.area.toLocaleString()} sq ft` : "N/A"}
                    </p>
                    <p className="text-gray-400">
                      <span className="font-medium">Address:</span>{" "}
                      {element.address || "No address available"}
                    </p>
                    <p className="text-gray-400">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`${
                          element.status === "Completed"
                            ? "text-green-400"
                            : element.status === "processing"
                            ? "text-yellow-400"
                            : "text-red-400"
                        } font-medium`}
                      >
                        {element.status || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <button
                    onClick={() => {
                      navigate("/admin/projectDetails", { state: element });
                    }}
                    className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProjectList;