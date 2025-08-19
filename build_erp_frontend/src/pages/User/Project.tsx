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
  latitude:number;
  longitude:number
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
          gradient: "from-amber-400 to-orange-500",
          iconColor: "text-amber-500",
          accentColor: "border-amber-200",
        };
      case "processing":
        return {
          title: "Ongoing Projects",
          subtitle: "Currently under construction",
          gradient: "from-[#04a09c] to-[#22d6d1]",
          iconColor: "text-[#04a09c]",
          accentColor: "border-teal-200",
        };
      default:
        return {
          title: "Completed Projects",
          subtitle: "Successfully delivered projects",
          gradient: "from-emerald-500 to-[#04a09c]",
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
      <section className="mb-16 group">
        {/* Section Header with Animation */}
        <div className="relative mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r opacity-5 -skew-y-1 transform scale-110"></div>
          <div className="relative flex items-center gap-4 pb-6">
            <div className={`p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg border-2 ${ config.accentColor } ${ config.iconColor } group-hover:scale-110 transition-transform duration-300`}>
              {getSectionIcon(status)}
            </div>
            <div>
              <h2 className={`text-4xl font-bold bg-gradient-to-r ${ config.gradient } bg-clip-text text-transparent`}>
                {config.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1 font-medium">{config.subtitle}</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent ml-8 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${ config.gradient } transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}></div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, index) => (
            <div
              key={p._id}
              className={`animated-card transform transition-all duration-500 delay-${ index * 150 }`}
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
            className="group/more inline-flex items-center gap-3 px-6 py-3 bg-[#04a09c] hover:bg-[#03b7b1] rounded-xl shadow-lg hover:shadow-xl border-2 border-white/30 backdrop-blur-sm transition-all duration-300"
            aria-label={`View more ${ status } projects`}
          >
            <span className="text-lg font-semibold text-white">View More {config.title}</span>
            <svg
              className="w-6 h-6 text-white transition-transform duration-300 group-hover/more:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <UserHeader />
      <Banner />

      {/* Main Content Container */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-200 dark:bg-teal-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-200 dark:bg-cyan-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Search and Filter Section */}
          <div className="mb-16">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#04a09c] via-[#22d6d1] to-[#04a09c] bg-clip-text text-transparent mb-4">
                  Discover Our Projects
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                  Explore our portfolio of innovative construction projects spanning residential, commercial, and infrastructure development.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row gap-6 items-end">
                <div className="flex-1 group">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Search Projects
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      onChange={(e) => setSearchProject(e.target.value)}
                      placeholder="Search by project name or location..."
                      className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04a09c]/50 focus:border-[#04a09c] transition-all duration-300 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                      aria-label="Search projects"
                    />
                  </div>
                </div>
                <div className="lg:w-80 group">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Filter by Area
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full pl-12 pr-10 py-4 bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04a09c]/50 focus:border-[#04a09c] transition-all duration-300 backdrop-blur-sm text-slate-900 dark:text-white appearance-none cursor-pointer"
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
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="px-6 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 backdrop-blur-sm lg:w-auto w-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Project Sections */}
          <div className="space-y-8">
            {renderSection("pending")}
            {renderSection("processing")}
            {renderSection("completed")}
          </div>

          {/* Empty State */}
          {project.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">No Projects Found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We're currently updating our project portfolio. Check back soon for exciting new developments!
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