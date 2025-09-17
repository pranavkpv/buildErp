import { Calendar, MapPin, Square, DollarSign, ChevronDown, ChevronUp, Image } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectImage from "./SubprofileCompponent/ProjectImage";
import ProgressBar from "./SubprofileCompponent/ProgressBar";
import { fetchUserProjectAPI } from "../../api/userprofile";
import EstimationDetails from "./SubprofileCompponent/EstimateDetails";
import { toast } from "react-toastify";
import { getStageInUser } from "../../api/auth";
import PaymentForm from "./SubprofileCompponent/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

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

type StageData = {
  _id: string;
  stage_name: string;
  start_date: string;
  end_date: string;
  stage_amount: number;
  progress: number;
  paymentStatus: string;
  status_date: string;
};

function ProjectDetails() {
  const [project, setProject] = useState<ProjectData[]>([]);
  const [progressEnable, setProgressEnable] = useState(false);
  const [imageEnable, setImageEnable] = useState(false);
  const [count, setCount] = useState(0);
  const [estimateOn, setEstimateOn] = useState(false);
  const [stage, setStage] = useState<StageData[]>([]);
  const [checkOn, setCheckOn] = useState(false);
  const [checkData, setCheckData] = useState<StageData | undefined>();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const fetchUserProject = async () => {
    try {
      const response = await fetchUserProjectAPI();
      if (response.success) {
        setProject(response.data.filter((element: ProjectData) => element.start_date != null));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };

  const fetchStage = async (projectId: string): Promise<void> => {
    try {
      const response = await getStageInUser(projectId);
      if (response.success) {
        setStage(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch stages");
    }
  };

  useEffect(() => {
    fetchUserProject();
  }, []);

  useEffect(() => {
    if (project[count]?._id) {
      fetchStage(project[count]._id);
    }
  }, [count, project]);

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

  const currentProject = project[count];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          Your Project Details
        </h2>

        {project.length === 0 && (
          <p className="text-center text-gray-600 text-lg font-medium bg-white rounded-lg shadow-lg p-6">
            No projects found.
          </p>
        )}

        {currentProject && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300">
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
                      {currentProject.start_date.split("T")[0].split("-").reverse().join("-")} -{" "}
                      {currentProject.end_date.split("T")[0].split("-").reverse().join("-")}
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
                  {currentProject.estimateStatus && (
                    <button
                      onClick={() => setEstimateOn(true)}
                      className="bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      View Estimation Details
                    </button>
                  )}
                </div>
              </div>
            </div>

            {stage.length > 0 && (
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SL No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stage Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-Feeling like I missed something? Let me know, and I’ll dig deeper!500 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stage.map((element, index) => (
                      <tr key={element._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {element.stage_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {element.start_date.split("T")[0].split("-").reverse().join("-")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {element.end_date.split("T")[0].split("-").reverse().join("-")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{element.stage_amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {(() => {
                            const isDisabled =
                              new Date(element.end_date) >=
                                new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) &&
                                element.paymentStatus === "pending"
                                ? false
                                : true;

                            const buttonText =
                              element.paymentStatus === "completed"
                                ? "Paid"
                                : element.paymentStatus === "verified"
                                  ? "Verified"
                                  : "Pay";

                            const buttonColors: Record<string, string> = {
                              Paid: "bg-green-600 hover:bg-green-700",
                              Verified: "bg-blue-600 hover:bg-blue-700",
                              Pay: "bg-indigo-600 hover:bg-indigo-700",
                            };

                            return (
                              <button
                                onClick={() => {
                                  setCheckData(element);
                                  setCheckOn(true);
                                }}
                                disabled={isDisabled}
                                className={`px-4 py-2 text-white rounded-lg 
                                  ${ buttonColors[buttonText] } 
                                   disabled:opacity-50 disabled:cursor-not-allowed 
                                  transition-all duration-200 text-sm font-medium`}
                              >
                                {buttonText}
                              </button>
                            );
                          })()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <ProgressBar progressEnable={progressEnable} projectId={currentProject._id} />
            <ProjectImage
              imageEnable={imageEnable}
              setImageEnable={setImageEnable}
              projectId={currentProject._id}
            />
            <EstimationDetails
              estimateOn={estimateOn}
              setEstimateOn={setEstimateOn}
              projectId={currentProject._id}
              onSuccess={fetchUserProject}
            />
            <Elements stripe={stripePromise}>
              <PaymentForm
                checkData={checkData}
              />
            </Elements>
          </div>
        )}
        <div className="mt-8 flex justify-between">
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
  );
}

export default ProjectDetails;