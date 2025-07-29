import { Calendar, MapPin, Square, DollarSign, ChevronDown, ChevronUp, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import ProjectImage from "./SubprofileCompponent/ProjectImage";
import ProgressBar from "./SubprofileCompponent/ProgressBar";
import { fetchUserProjectAPI } from "../../api/User/project";

type ProjectData = {
  _id: string;
  project_name: string;
  address: string;
  area: number;
  description: string;
  expected_image: string;
  budgeted_cost: number;
  status: "pending" | "processing" | "completed";
  start_date: string;
  end_date: string;
};

function ProjectDetails() {
  const [project, setProject] = useState<ProjectData[]>([]);
  const [progressEnable, setProgressEnable] = useState(false);
  const [imageEnable, setImageEnable] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUserProject = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded = jwtDecode<{ userId: string }>(token);
          const response = await fetchUserProjectAPI(decoded.userId);
          console.log(response)
          setProject(response.data);
        }
    };

    fetchUserProject();
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const handlePrev = () => {
    if (count > 0) setCount(count - 1);
  };

  const handleNext = () => {
    if (count < project.length - 1) setCount(count + 1);
  };

  const currentProject = project[count];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          Your Project Details
        </h2>

        {project.length === 0 && (
          <p className="text-center text-gray-600 text-lg">No projects found.</p>
        )}

        {currentProject && (
          <div
            key={currentProject._id}
            className="bg-white rounded-xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img
                  src={
                    currentProject.expected_image ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
                  }
                  alt={currentProject.project_name || "Project image"}
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {currentProject.project_name}
                  </h3>
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusStyles(currentProject.status)}`}
                  >
                    {currentProject.status.charAt(0).toUpperCase() + currentProject.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                    <span className="text-lg">{currentProject.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-6 h-6 mr-3 text-blue-600" />
                    <span className="text-lg">{currentProject.area} sq.ft</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                    <span className="text-lg">
                      ₹{currentProject.budgeted_cost?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                    <span className="text-lg">
                      {currentProject.start_date?.split("T")[0]} - {currentProject.end_date?.split("T")[0]}
                    </span>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => setProgressEnable(!progressEnable)}
                    className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
                    className="flex items-center px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    <Image className="w-5 h-5 mr-2" />
                    {imageEnable ? "Hide Images" : "View Images"}
                  </button>
                  <button onClick={handlePrev} disabled={count === 0} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                    Prev
                  </button>
                  <button onClick={handleNext} disabled={count === project.length - 1} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                    Next
                  </button>
                </div>
              </div>
            </div>

            <ProgressBar progressEnable={progressEnable} projectId={currentProject._id} />
            <ProjectImage imageEnable={imageEnable} setImageEnable={setImageEnable} projectId={currentProject._id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
