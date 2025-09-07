import UserHeader from "../../components/USER/common/UserHeader";
import Banner from "../../components/USER/UserFrontPage/Banner";
import ProjectCard from "../../components/USER/UserFrontPage/ProjectCard";
import { useEffect, useState } from "react";
import Footer from "../../components/USER/common/Footer";
import { Link } from "react-router-dom";
import { getAllProjectInUserSideApi } from "../../api/auth";

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

function Projects() {
  const [project, setProject] = useState<projectData[]>([]);
  const [area, setArea] = useState<number[]>([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [searchProject, setSearchProject] = useState("");

  const fetchProject = async () => {
    const result: { data: projectData[] } = await getAllProjectInUserSideApi();
    const filteredResult = result.data.filter(
      (element) =>
        (element.project_name.toLowerCase().includes(searchProject.toLowerCase()) ||
          element.address.toLowerCase().includes(searchProject.toLowerCase())) &&
        (selectedArea === "" || element.area === Number(selectedArea))
    );

    setProject(filteredResult);
    const areas = result.data.map((element) => element.area);
    setArea([...new Set(areas)].sort((a, b) => a - b));
  };

  useEffect(() => {
    fetchProject();
  }, [searchProject, selectedArea]);

  const getSectionIcon = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "processing":
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getSectionConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          title: "Upcoming Projects",
          subtitle: "Projects in planning and design phase",
          gradient: "from-amber-500 to-orange-500",
          iconColor: "text-amber-500",
          accentColor: "border-amber-200",
        };
      case "processing":
        return {
          title: "Ongoing Projects",
          subtitle: "Currently under construction",
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

  const renderSection = (status: string) => {
    const config = getSectionConfig(status);
    const filteredProjects = project
      .filter((element) => element.status === status)
      .slice(0, 3);

    if (filteredProjects.length === 0) return null;

    return (
      <section className="mb-12 group">
        {/* Section Header */}
        <div className="relative mb-8">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-white shadow-md border ${ config.accentColor } ${ config.iconColor } group-hover:scale-105 transition-transform duration-300`}>
              {getSectionIcon(status)}
            </div>
            <div>
              <h2 className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${ config.gradient } bg-clip-text text-transparent`}>
                {config.title}
              </h2>
              <p className="text-gray-600 text-base mt-1">{config.subtitle}</p>
            </div>
            <div className="flex-1 h-px bg-gray-200 ml-6 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${ config.gradient } transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, index) => (
            <div
              key={p._id}
              className={`transform transition-all duration-500 delay-${ index * 100 } hover:scale-105 hover:shadow-lg`}
            >
              <ProjectCard {...p} index={index} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/projectlist"
            state={status}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`View more ${ status } projects`}
          >
            <span>View More {config.title}</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      <Banner />

      {/* Main Content Container */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  Discover Our Projects
                </h1>
                <p className="text-gray-600 text-base max-w-xl mx-auto">
                  Explore our portfolio of innovative construction projects, from residential to commercial developments.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-end">
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
                      onChange={(e) => setSearchProject(e.target.value)}
                      placeholder="Search by project name or location..."
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                      aria-label="Search projects"
                    />
                  </div>
                </div>
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
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 appearance-none cursor-pointer"
                      aria-label="Filter by area"
                    >
                      <option value="">All Areas</option>
                      {area.map((element, index) => (
                        <option key={index} value={element.toString()}>
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
                <button
                  onClick={() => {
                    setSearchProject("");
                    setSelectedArea("");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto"
                  aria-label="Clear filters"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Project Sections */}
          <div className="space-y-12">
            {renderSection("pending")}
            {renderSection("processing")}
            {renderSection("completed")}
          </div>

          {/* Empty State */}
          {project.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">No Projects Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We're updating our project portfolio. Check back soon for new developments!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Projects;