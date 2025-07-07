import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Calendar, MapPin, Square } from "lucide-react";
import UserHeader from "../../components/UserFrontPage/UserHeader";
import Footer from "../../components/UserFrontPage/Footer";
import { getProject } from "../../api/Admin/project";

type ProjectStage = {
  stageName: string;
  startDate: string;
  endDate: string;
  progress: number;
};

type ProjectData = {
  _id: string;
  project_name: string;
  expected_image: string;
  finalImage: string;
  area: number;
  address: string;
  status: "pending" | "processing" | "completed";
  stages: ProjectStage[];
};

function ProjectProgress() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const result = await getProject();
      // Add sample stages for each project (replace with API data if available)
      const projectsWithStages = result.map((project: ProjectData) => ({
        ...project,
        stages: [
          { stageName: "Site Preparation", startDate: "2025-01-10", endDate: "2025-02-10", progress: 100 },
          { stageName: "Foundation", startDate: "2025-02-15", endDate: "2025-03-15", progress: 80 },
          { stageName: "Construction", startDate: "2025-03-20", endDate: "2025-06-20", progress: 50 },
          { stageName: "Finishing", startDate: "2025-06-25", endDate: "2025-08-25", progress: 0 },
        ],
      }));
      setProjects(projectsWithStages);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const calculateProjectProgress = (stages: ProjectStage[]) => {
    const totalProgress = stages.reduce((sum, stage) => sum + stage.progress, 0);
    return Math.round(totalProgress / stages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <UserHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          Your Project Progress
        </h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-50 rounded-lg shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {project.project_name}
                  </h3>
                  <div className="flex items-center text-gray-700 mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{project.address}</span>
                  </div>
                  <div className="flex items-center text-gray-700 mb-4">
                    <Square className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{project.area} sq.ft</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProjectProgress(project.stages)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Overall Progress: {calculateProjectProgress(project.stages)}%
                  </p>
                </div>
                <button
                  onClick={() => toggleProject(project._id)}
                  className="mt-4 md:mt-0 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  {expandedProject === project._id ? (
                    <>
                      <ChevronUp className="w-5 h-5 mr-2" />
                      Hide Stages
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5 mr-2" />
                      View Stages
                    </>
                  )}
                </button>
              </div>
              {expandedProject === project._id && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Project Stages
                  </h4>
                  <div className="space-y-4">
                    {project.stages.map((stage, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row items-start md:items-center gap-4"
                      >
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium">
                            {stage.stageName}
                          </p>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              {stage.startDate} - {stage.endDate}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                              style={{ width: `${stage.progress}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Progress: {stage.progress}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProjectProgress;