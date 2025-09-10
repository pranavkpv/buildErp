import { Calendar, MapPin, Square, DollarSign, ChevronDown, ChevronUp, Image } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectImage from "./SubprofileCompponent/ProjectImage";
import ProgressBar from "./SubprofileCompponent/ProgressBar";
import { fetchUserProjectAPI } from "../../api/userprofile";
import Requirement from "./SubprofileCompponent/Requirement";
import ConfirmBrandSelection from "./SubprofileCompponent/ConfirmBrandSelection";
import SkipRequirement from "./SubprofileCompponent/SkipRequirement";
import EstimationDetails from "./SubprofileCompponent/EstimateDetails";

type ProjectData = {
  _id: string;
  project_name: string;
  address: string;
  area: number;
  description: string;
  expected_image: string;
  budgeted_cost: number;
  status: "pending" | "processing" | "completed";
  estimateBy: string | null;
  estimateStatus: boolean;
  start_date: string;
  end_date: string;
};

function ProjectDetails() {
  const [project, setProject] = useState<ProjectData[]>([]);
  const [progressEnable, setProgressEnable] = useState(false);
  const [imageEnable, setImageEnable] = useState(false);
  const [count, setCount] = useState(0);
  const [requireOn, setRequireOn] = useState(false);
  const [confirmEnable, setConfirmEnable] = useState(false);
  const [skipOn, setSkipOn] = useState(false);

  const [estimateOn, setEstimateOn] = useState(false)

  const fetchUserProject = async () => {
    try {
      const response = await fetchUserProjectAPI();
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    fetchUserProject();
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handlePrev = () => {
    if (count > 0) setCount(count - 1);
  };

  const handleNext = () => {
    if (count < project.length - 1) setCount(count + 1);
  };

  const handleRequirementSuccess = (updatedProject: ProjectData) => {
    setProject((prevProjects) =>
      prevProjects.map((proj) =>
        proj._id === updatedProject._id ? updatedProject : proj
      )
    );
    setRequireOn(false);
  };

  const handleSkipSuccess = (updatedProject: ProjectData) => {
    setProject((prevProjects) =>
      prevProjects.map((proj) =>
        proj._id === updatedProject._id ? updatedProject : proj
      )
    );
    setSkipOn(false);
  };

  const handleViewEstimateDetails = () => {
    setEstimateOn(true)
  };

  const currentProject = project[count];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          Your Project Details
        </h2>

        {project.length === 0 && (
          <p className="text-center text-gray-600 text-lg font-medium bg-white rounded-lg shadow-lg p-6">
            No projects found.
          </p>
        )}

        {currentProject && (
          <div
            key={currentProject._id}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="md:w-1/3">
                <img
                  src={
                    currentProject.expected_image ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
                  }
                  alt={currentProject.project_name || "Project image"}
                  className="rounded-xl shadow-lg w-full h-56 sm:h-72 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    {currentProject.project_name}
                  </h3>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${ getStatusStyles(
                      currentProject.status
                    ) }`}
                  >
                    {currentProject.status.charAt(0).toUpperCase() +
                      currentProject.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-indigo-600" />
                    <span className="text-base sm:text-lg font-medium">
                      {currentProject.address}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-6 h-6 mr-3 text-indigo-600" />
                    <span className="text-base sm:text-lg font-medium">
                      {currentProject.area} sq.ft
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-6 h-6 mr-3 text-indigo-600" />
                    <span className="text-base sm:text-lg font-medium">
                      ₹{currentProject.budgeted_cost?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-indigo-600" />
                    <span className="text-base sm:text-lg font-medium">
                      {new Date(currentProject.start_date).toLocaleDateString()} -{" "}
                      {new Date(currentProject.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
                    {currentProject.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setProgressEnable(!progressEnable)}
                    className="flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 text-sm sm:text-base font-medium"
                    aria-label={progressEnable ? "Hide project progress" : "View project progress"}
                  >
                    {progressEnable ? (
                      <>
                        <ChevronUp className="w-5 h-5 mr-2" />
                        Hide Progress
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5 mr-2" />
                        View Progress
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setImageEnable(!imageEnable)}
                    className="flex items-center px-5 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 text-sm sm:text-base font-medium"
                    aria-label={imageEnable ? "Hide project images" : "View project images"}
                  >
                    <Image className="w-5 h-5 mr-2" />
                    {imageEnable ? "Hide Images" : "View Images"}
                  </button>
                  {currentProject.estimateBy == null ? (
                    <>
                      <button
                        onClick={() => setRequireOn(true)}
                        className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 text-sm sm:text-base font-medium"
                        aria-label="Add project requirements"
                      >
                        Add Project Requirements
                      </button>
                      <button
                        onClick={() => setSkipOn(true)}
                        className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base font-medium"
                        aria-label="Skip adding project requirements"
                      >
                        Skip Add Requirements
                      </button>
                    </>
                  ) : currentProject.estimateStatus ? (
                    <button
                      onClick={handleViewEstimateDetails}
                      className="px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 transition-all duration-200 text-sm sm:text-base font-medium"
                      aria-label="View estimate details"
                    >
                      View Estimate Details
                    </button>
                  ) : (
                    <button
                      className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 text-sm sm:text-base font-medium"
                      aria-label="Wait for estimate data"
                    >
                      Wait for Estimate Data
                    </button>
                  )}
                  <button
                    onClick={handlePrev}
                    disabled={count === 0}
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                    aria-label="Previous project"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={count === project.length - 1}
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                    aria-label="Next project"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <ProgressBar
              progressEnable={progressEnable}
              projectId={currentProject._id}
            />
            <ProjectImage
              imageEnable={imageEnable}
              setImageEnable={setImageEnable}
              projectId={currentProject._id}
            />
            <Requirement
              requireOn={requireOn}
              setRequireOn={setRequireOn}
              setConfirmEnable={setConfirmEnable}
              projectId={currentProject._id}
              onSuccess={handleRequirementSuccess}
            />
            <ConfirmBrandSelection
              confirmEnable={confirmEnable}
              setConfirmEnable={setConfirmEnable}
              projectId={currentProject._id}
              onSuccess={handleRequirementSuccess}
            />
            <SkipRequirement
              skipOn={skipOn}
              setSkipOn={setSkipOn}
              projectId={currentProject._id}
              onSuccess={handleSkipSuccess}
            />
            <EstimationDetails
              estimateOn={estimateOn}
              setEstimateOn={setEstimateOn}
              projectId={currentProject._id}
              onSuccess={fetchUserProject}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;