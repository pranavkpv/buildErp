import { fetchExistEstimationInUser, getStageInUser } from "../../../api/auth";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import Loading from "../../../components/Loading";

type specData = {
   spec_name: string;
   description: string;
};

type estimationData = {
   project_id: string;
   spec_id: string;
   specDetails: specData;
};

type StageData = {
   _id: string;
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_amount: number;
   progress: number;
   status_date: string;
};

type imageType = {
   date: Date;
   url: string;
};

type prop = {
   latitude: number;
   longitude: number;
};

function AdminProjectDetails() {
   const location = useLocation();
   const {
      _id,
      project_name,
      expected_image,
      finalImage,
      area,
      address,
      status,
      description,
      latitude,
      longitude,
   } = location.state || {};

   const [spec, setSpec] = useState<estimationData[]>([]);
   const [stage, setStage] = useState<StageData[]>([]);
   const [image, setImage] = useState<imageType[]>([]);
   const [loading, setLoading] = useState(true);

   const fetchSpec = async () => {
      const response = await fetchExistEstimationInUser(_id);
      setSpec(response.data || []);
   };

   const fetchStage = async () => {
      const response = await getStageInUser(_id);
      if (response.success) {
         setStage(response.data || []);
         let x: imageType[] = [];
         for (let element of response.data) {
            for (let item of element.stage_image || []) {
               for (let char of item.image || []) {
                  x.push({ date: item.date, url: char });
               }
            }
         }
         setImage(x);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         await fetchSpec();
         await fetchStage();
         setLoading(false);
      };
      fetchData();
   }, [_id]);

   const calculateProjectProgress = () => {
      if (stage.length > 0) {
         const totalProgress = stage.reduce((sum, num) => sum + num.progress, 0) || 0;
         return (totalProgress / (stage.length * 100)) * 100;
      }
      return 0;
   };

   const MapViewUpdater = ({ latitude, longitude }: prop) => {
      const map = useMap();
      useEffect(() => {
         if (latitude && longitude) {
            map.setView([latitude, longitude], 13);
         }
      }, [latitude, longitude, map]);
      return null;
   };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
            <Loading />
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Project Overview */}
            <section className="mb-12">
               <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">
                  {project_name || "Project Overview"}
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col justify-center">
                     <p className="text-gray-300 text-base leading-relaxed mb-4">
                        {description || "No description available."}
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg">
                           <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={1.5}
                                 d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                              />
                           </svg>
                           <span className="text-sm font-medium text-gray-300">
                              {area ? `${ area.toLocaleString() } sqft` : "N/A"}
                           </span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg">
                           <span className="text-sm font-medium text-gray-300">
                              Status:{" "}
                              <span
                                 className={`${ status === "Completed"
                                       ? "text-green-400"
                                       : status === "In Progress"
                                          ? "text-yellow-400"
                                          : "text-red-400"
                                    } font-medium`}
                              >
                                 {status || "N/A"}
                              </span>
                           </span>
                        </div>
                     </div>
                     <p className="text-gray-400 mt-4">
                        <span className="font-medium">Overall Progress:</span>{" "}
                        {calculateProjectProgress().toFixed(1)}%
                     </p>
                  </div>
                  <div className="flex justify-center">
                     <img
                        src={expected_image || "https://via.placeholder.com/300x200?text=No+Image"}
                        alt={project_name || "Project Image"}
                        className="rounded-lg shadow-lg w-full max-w-md h-64 object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                           e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                        loading="lazy"
                     />
                  </div>
               </div>
            </section>

            {/* Specifications */}
            <section className="mb-12">
               <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">
                  Specifications
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {spec.length > 0 ? (
                     spec.map((element, index) => (
                        <div
                           key={index}
                           className="bg-slate-700 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                        >
                           <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                              {element.specDetails.spec_name || "Unnamed Specification"}
                           </h3>
                           <p className="text-gray-300 text-sm line-clamp-4">
                              {element.specDetails.description || "No description available."}
                           </p>
                        </div>
                     ))
                  ) : (
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
                           No Specifications Available
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                           Specifications for this project are being updated. Check back soon!
                        </p>
                     </div>
                  )}
               </div>
            </section>

            {/* Gallery */}
            <section className="mb-12">
               <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">
                  Gallery
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {image.length > 0 ? (
                     image.map((src, index) => (
                        <div key={index} className="relative">
                           <img
                              src={src.url || "https://via.placeholder.com/300x200?text=No+Image"}
                              alt={`Project Gallery ${ index + 1 }`}
                              className="w-full h-60 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                              onError={(e) => {
                                 e.currentTarget.src =
                                    "https://via.placeholder.com/300x200?text=No+Image";
                              }}
                              loading="lazy"
                           />
                           <p className="absolute bottom-2 left-2 text-xs text-white bg-black/60 px-2 py-1 rounded-md">
                              {new Date(src.date).toLocaleDateString()}
                           </p>
                        </div>
                     ))
                  ) : (
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
                                 d="M4 5h16M4 12h16M4 18h16"
                              />
                           </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-300 mb-3">
                           No Images Available
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                           The gallery for this project is being updated. Check back soon!
                        </p>
                     </div>
                  )}
               </div>
            </section>

            {/* Work Plans */}
            <section className="mb-12">
               <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">
                  Work Plans
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stage.length > 0 ? (
                     stage.map((element, index) => (
                        <div
                           key={index}
                           className="bg-slate-700 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                        >
                           <div className="flex items-center justify-between mb-3">
                              <p className="text-lg font-semibold text-white line-clamp-1">
                                 {element.stage_name || "Unnamed Stage"}
                              </p>
                              <div className="flex items-center text-sm text-gray-300">
                                 <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                 <span>
                                    {new Date(element.start_date).toLocaleDateString()} -{" "}
                                    {new Date(element.end_date).toLocaleDateString()}
                                 </span>
                              </div>
                           </div>
                           <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                              <div
                                 className={`bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full transition-all duration-50 w-[${ element.progress }%]`}
                              />
                           </div>
                           <p className="text-sm text-gray-300 mt-2">
                              Progress: {element.progress}% | Amount: ₹
                              {element.stage_amount.toLocaleString()}
                           </p>
                        </div>
                     ))
                  ) : (
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
                           No Work Plans Available
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                           Work plans for this project are being updated. Check back soon!
                        </p>
                     </div>
                  )}
               </div>
            </section>

            {/* Location */}
            <section>
               <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">
                  Location
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col justify-center">
                     <p className="text-gray-300 text-base leading-relaxed mb-4">
                        {address || "No address available."}
                     </p>
                     <ul className="text-gray-400 list-disc pl-5 text-sm">
                        <li>Proximity to major highways and metro stations</li>
                        <li>Close to upscale shopping and entertainment destinations</li>
                        <li>Near reputed educational institutions</li>
                     </ul>
                  </div>
                  <div className="flex justify-center">
                     <MapContainer
                        center={[latitude || 0, longitude || 0]}
                        zoom={13}
                        style={{ height: "320px", width: "100%", borderRadius: "8px" }}
                        className="border border-slate-600 shadow-lg"
                     >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapViewUpdater latitude={latitude || 0} longitude={longitude || 0} />
                        <Marker position={[latitude || 0, longitude || 0]}>
                           <Popup>{address || "Project Location"}</Popup>
                        </Marker>
                     </MapContainer>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
}

export default AdminProjectDetails;
