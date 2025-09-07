import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import UserHeader from "../common/UserHeader";
import Footer from "../common/Footer";
import { fetchStatusBaseProject } from "../../../api/auth";

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

function ListProject() {
  const location = useLocation();
  const state = location.state as string;
  const [project, setProject] = useState<projectData[]>([]);
  const [area, setArea] = useState<number[]>([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedArea, setSelectedArea] = useState(0);
  const [totalPage, setTotalPage] = useState<Number[]>([]);
  const [page, setPage] = useState(0);

  const fetchProject = async () => {
    const response = await fetchStatusBaseProject({ state, searchItem, selectedArea, page });
    setProject(response.data.projectData);
    setArea(response.data.areas);
    let y = [];
    for (let i = 0; i < response.totalPage; i++) {
      y.push(0);
    }
    setTotalPage(y);
  };

  useEffect(() => {
    fetchProject();
  }, [searchItem, page, selectedArea]);

  // Determine section configuration based on status
  const getSectionConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          title: "Upcoming Projects",
          subtitle: "Projects in the planning and design phase",
          gradient: "from-amber-500 to-orange-500",
          iconColor: "text-amber-500",
          accentColor: "border-amber-200",
        };
      case "processing":
        return {
          title: "Ongoing Projects",
          subtitle: "Projects currently under construction",
          gradient: "from-blue-600 to-emerald-600",
          iconColor: "text-blue-600",
          accentColor: "border-blue-200",
        };
      default:
        return {
          title: "Completed Projects",
          subtitle: "Successfully delivered projects",
          gradient: "from-emerald-500 to-blue-500",
          iconColor: "text-emerald-500",
          accentColor: "border-emerald-200",
        };
    }
  };

  const config = getSectionConfig(state);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 shadow-md p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Projects
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by project name or address..."
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                  aria-label="Search projects"
                />
              </div>
            </div>

            {/* Area Filter */}
            <div className="sm:w-64">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Area
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(Number(e.target.value))}
                  className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 appearance-none cursor-pointer"
                  aria-label="Filter by area"
                >
                  <option value="0">All Areas</option>
                  {area.map((element, index) => (
                    <option key={index} value={element}>
                      {element.toLocaleString()} sqft
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setSearchItem("");
                setSelectedArea(0);
              }}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto"
              aria-label="Clear filters"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-8">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-white shadow-md border ${config.accentColor} ${config.iconColor} group-hover:scale-105 transition-transform duration-300`}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={
                    state === "pending"
                      ? "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      : state === "processing"
                        ? "M13 10V3L4 14h7v7l9-11h-7z"
                        : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                />
              </svg>
            </div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                {config.title}
              </h1>
              <p className="text-gray-600 text-base mt-1">{config.subtitle}</p>
            </div>
            <div className="flex-1 h-px bg-gray-200 ml-6 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        {project.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.map((p, index) => (
              <div
                key={p._id}
                className={`transform transition-all duration-500 hover:scale-105 delay-${index * 100}`}
              >
                <ProjectCard {...p} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">No Projects Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No projects are currently available for this category. Check back soon for updates!
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPage.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className={`p-2 rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-300 ${
                page === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:text-white hover:border-blue-500"
              }`}
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {totalPage.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`w-10 h-10 rounded-full border border-gray-200 text-sm font-medium transition-all duration-300 ${
                  page === index
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-blue-500 shadow-md"
                    : "bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:text-white hover:border-blue-500"
                }`}
                aria-label={`Go to page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPage.length - 1))}
              disabled={page === totalPage.length - 1}
              className={`p-2 rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-300 ${
                page === totalPage.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:text-white hover:border-blue-500"
              }`}
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ListProject;