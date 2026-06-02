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
          gradient: "from-orange-500 to-yellow-500",
          iconColor: "text-orange-500",
          accentColor: "border-orange-200",
        };
      case "processing":
        return {
          title: "Ongoing Projects",
          subtitle: "Currently under construction",
          gradient: "from-orange-600 to-orange-500",
          iconColor: "text-orange-600",
          accentColor: "border-orange-300",
        };
      default:
        return {
          title: "Completed Projects",
          subtitle: "Successfully delivered projects",
          gradient: "from-yellow-500 to-orange-500",
          iconColor: "text-yellow-500",
          accentColor: "border-yellow-200",
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
            <div className={`p-3 rounded-xl bg-gradient-to-br from-white to-orange-50 shadow-lg border-2 ${config.accentColor} ${config.iconColor} group-hover:scale-110 transition-transform duration-300`}>
              {getSectionIcon(status)}
            </div>
            <div>
              <h2 className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                {config.title}
              </h2>
              <p className="text-gray-600 text-base mt-1 font-medium">{config.subtitle}</p>
            </div>
            <div className="flex-1 h-px bg-gray-200 ml-6 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
            </div>
          </div>
        </div>


        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, index) => (
            <div
              key={p._id}
              className={`transform transition-all duration-500 delay-${index * 100} hover:scale-105 hover:shadow-2xl`}
            >
              <ProjectCard {...p} index={index} />
            </div>
          ))}
        </div>


        {/* View More Button */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/projectlist"
            state={status}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label={`View more ${status} projects`}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Construction-themed background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
        }}></div>
      </div>

      {/* Decorative glowing orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <UserHeader />
      <Banner />


      {/* Main Content Container */}
      <div className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-orange-500/20 shadow-2xl p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-3 tracking-tight">
                  Discover Our Projects
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto mb-4 rounded-full"></div>
                <p className="text-gray-600 text-base max-w-xl mx-auto font-medium">
                  Explore our portfolio of innovative construction projects, from residential villas to commercial developments across Kerala.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Search Projects
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      onChange={(e) => setSearchProject(e.target.value)}
                      placeholder="Search by project name or location..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300"
                      aria-label="Search projects"
                    />
                  </div>
                </div>
                <div className="sm:w-64">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Filter by Area
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full pl-12 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-900 appearance-none cursor-pointer font-medium hover:border-orange-300"
                      aria-label="Filter by area"
                    >
                      <option value="">All Areas</option>
                      {area.map((element, index) => (
                        <option key={index} value={element.toString()}>
                          {element.toLocaleString()} sqft
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto transform hover:scale-105 shadow-lg"
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
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-700 mb-3">No Projects Found</h3>
              <p className="text-gray-500 max-w-md mx-auto font-medium">
                We're updating our project portfolio. Check back soon for new construction developments!
              </p>
              <button
                onClick={() => {
                  setSearchProject("");
                  setSelectedArea("");
                }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>


      <Footer />
    </div>
  );
}


export default Projects;