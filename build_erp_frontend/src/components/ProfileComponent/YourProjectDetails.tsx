import { Calendar, MapPin, Square, DollarSign, User, Phone, ChevronDown, ChevronUp, Image, X } from "lucide-react";
import UserHeader from "../../components/UserFrontPage/UserHeader";
import Footer from "../../components/UserFrontPage/Footer";
import ProjectImage from "./SubprofileCompponent/ProjectImage";
import ProgressBar from "./SubprofileCompponent/ProgressBar";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

type JwtPayload = {
   userId: string;
   iat: number;
   exp: number;
};

function ProjectDetails() {
   const [user, setUser] = useState("");
   const [project, setProject] = useState<ProjectData[]>([]);
   const [progressEnable, setProgressEnable] = useState(false);
   //image
   const [imageEnable, setImageEnable] = useState(false);



   const fetchUserProject = async () => {
      try {
         const token = localStorage.getItem("accessToken");
         if (token) {
            const decoded: JwtPayload = jwtDecode(token);
            setUser(decoded.userId);
            const response = await fetchUserProjectAPI(user);
            setProject(response);
         }
      } catch (error) {
         console.log(error);
         toast.error("failed to fetch project");
      }
   };

   useEffect(() => {
      fetchUserProject();
   });

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

   return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
               Your Project Details
            </h2>
            {project.length === 0 && (
               <p className="text-center text-gray-600 text-lg">No projects found.</p>
            )}
            <div className="space-y-10">
               {project.map((element) => (
                  <div
                     key={element._id}
                     className="bg-white rounded-xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                  >
                     <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                           <img
                              src={element.expected_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"}
                              alt={element.project_name}
                              className="rounded-lg shadow-md w-full h-64 object-cover"
                           />
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-6">
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                 {element.project_name}
                              </h3>
                              <span
                                 className={`px-4 py-1.5 rounded-full text-sm font-semibold ${ getStatusStyles(element.status) }`}
                              >
                                 {element.status.charAt(0).toUpperCase() + element.status.slice(1)}
                              </span>
                           </div>
                           <div className="space-y-4 text-gray-700">
                              <div className="flex items-center">
                                 <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                                 <span className="text-lg">{element.address}</span>
                              </div>
                              <div className="flex items-center">
                                 <Square className="w-6 h-6 mr-3 text-blue-600" />
                                 <span className="text-lg">{element.area} sq.ft</span>
                              </div>
                              <div className="flex items-center">
                                 <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                                 <span className="text-lg">₹{element.budgeted_cost.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center">
                                 <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                                 <span className="text-lg">
                                    {element.start_date.split("T")[0]} - {element.end_date.split("T")[0]}
                                 </span>
                              </div>
                              <p className="text-gray-600 text-base leading-relaxed">
                                 {element.description}
                              </p>
                           </div>
                           <div className="mt-6 flex flex-wrap gap-4">
                              <button
                                 onClick={() => setProgressEnable(!progressEnable)}
                                 className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
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
                                 className="flex items-center px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                              >
                                 {imageEnable ? (
                                    <>
                                       <Image className="w-5 h-5 mr-2" />
                                       Hide Images
                                    </>
                                 ) : (
                                    <>
                                       <Image className="w-5 h-5 mr-2" />
                                       View Images
                                    </>
                                 )}
                              </button>
                           </div>
                        </div>
                     </div>
                     <ProgressBar progressEnable={progressEnable} projectId={element._id} />
                     <ProjectImage imageEnable={imageEnable} setImageEnable={setImageEnable} projectId={element._id} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default ProjectDetails;