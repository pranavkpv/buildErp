import { useRef, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import UserHeader from '../USER/common/UserHeader';
import MapIntegrationApp from './Map/Map';
import { postProject } from '../../api/project';
import { toast } from 'react-toastify';
import Requirement from './SubprofileCompponent/Requirement';
import ConfirmBrandSelection from './SubprofileCompponent/ConfirmBrandSelection';
import SkipRequirement from './SubprofileCompponent/SkipRequirement';
import ExpectedImageUpload from './SubprofileCompponent/ExpectedImageUpload';
import Footer from '../../components/USER/common/Footer';


interface Location {
  lat: number;
  lng: number;
  name: string;
}


function ProjectProposal() {
  const [project, setProject] = useState("");
  const [type, setType] = useState("");
  const [floor, setFloor] = useState(0);
  const [cost, setCost] = useState(0);
  const [area, setArea] = useState(0);
  const [onMap, setOnMap] = useState(false);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requireOn, setRequireOn] = useState(false);
  const [confirmEnable, setConfirmEnable] = useState(false);
  const [skipOn, setSkipOn] = useState(false);
  const [selectProject, setSelectProject] = useState("");
  const [imageEnable,setImageEnable] = useState(false)
  const [uploadProject,setUploadImage] = useState("")


  const projectRef = useRef<HTMLParagraphElement>(null);
  const typeRef = useRef<HTMLParagraphElement>(null);
  const floorRef = useRef<HTMLParagraphElement>(null);
  const costRef = useRef<HTMLParagraphElement>(null);
  const areaRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);


  const addFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;


    // Validation
    if (project.trim() === "") {
      if (projectRef.current) projectRef.current.innerText = "Please enter a valid project name.";
      hasError = true;
    } else if (projectRef.current) {
      projectRef.current.innerText = "";
    }


    if (type.trim() === "") {
      if (typeRef.current) typeRef.current.innerText = "Please select a project type.";
      hasError = true;
    } else if (typeRef.current) {
      typeRef.current.innerText = "";
    }


    if (floor <= 0) {
      if (floorRef.current) floorRef.current.innerText = "Number of floors must be greater than zero.";
      hasError = true;
    } else if (floorRef.current) {
      floorRef.current.innerText = "";
    }


    if (cost <= 0) {
      if (costRef.current) costRef.current.innerText = "Budget must be greater than zero.";
      hasError = true;
    } else if (costRef.current) {
      costRef.current.innerText = "";
    }


    if (area <= 0) {
      if (areaRef.current) areaRef.current.innerText = "Area must be greater than zero.";
      hasError = true;
    } else if (areaRef.current) {
      areaRef.current.innerText = "";
    }


    if (address.trim() === "") {
      if (addressRef.current) addressRef.current.innerText = "Please enter a valid address.";
      hasError = true;
    } else if (addressRef.current) {
      addressRef.current.innerText = "";
    }


    if (description.trim() === "") {
      if (descriptionRef.current) descriptionRef.current.innerText = "Please provide a project description.";
      hasError = true;
    } else if (descriptionRef.current) {
      descriptionRef.current.innerText = "";
    }


    if (!selectedLocation) {
      if (addressRef.current) addressRef.current.innerText = "Please select a location on the map.";
      hasError = true;
    }


    if (hasError) return;


    let latitude = selectedLocation?.lat;
    let longitude = selectedLocation?.lng;
    if (!latitude || !longitude) {
      if (addressRef.current) addressRef.current.innerText = "Please select a valid location on the map.";
      return;
    }


    setIsSubmitting(true);
    try {
      const response = await postProject({
        project_name: project,
        type,
        floor,
        cost,
        address,
        area,
        description,
        latitude,
        longitude
      });


      if (response.success) {
        setIsSubmitted(true);
        setSelectProject(response.data);
        toast.success(response.message);
        setTimeout(() => {
          setProject("");
          setType("");
          setFloor(0);
          setCost(0);
          setArea(0);
          setAddress("");
          setDescription("");
          setSelectedLocation(null);
        }, 3000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the proposal.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Construction-themed background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
          }}></div>
        </div>

        {/* Decorative glowing orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full text-center relative z-10 border-2 border-orange-500/20">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-3">
            Submission Successful!
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base font-medium">
            Your project proposal has been sent successfully. We will review and respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setRequireOn(true)}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-orange-200 flex items-center justify-center gap-2"
              aria-label="Add project requirements"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Add Requirements
            </button>
            <button
              onClick={() => setSkipOn(true)}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-gray-200"
              aria-label="Skip adding project requirements"
            >
              Skip Requirements
            </button>
            <button
              onClick={() => {
                setImageEnable(true);
                setUploadImage(selectProject);
              }}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-bold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upload Expected Image
            </button>
          </div>
        </div>
        <Requirement
          requireOn={requireOn}
          setRequireOn={setRequireOn}
          setConfirmEnable={setConfirmEnable}
          projectId={selectProject}
        />
        <ConfirmBrandSelection
          confirmEnable={confirmEnable}
          setConfirmEnable={setConfirmEnable}
          projectId={selectProject}
          setIsSubmitted={setIsSubmitted}
        />
        <SkipRequirement
          skipOn={skipOn}
          setSkipOn={setSkipOn}
          projectId={selectProject}
          setIsSubmitted={setIsSubmitted}
        />
        <ExpectedImageUpload 
        setUploadEnable={setImageEnable}
        uploadEnable={imageEnable}
        uploadProjectId={uploadProject}
        />


      </div>
    );
  }


  return (
    <>
      <UserHeader />
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-4 tracking-tight">
              Project Proposal Form
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-medium">
              Submit your construction project details below, and our team will get in touch to discuss your vision and bring it to life.
            </p>
          </div>


          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto border-2 border-orange-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent">
                Project Details
              </h3>
            </div>


            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Project Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300"
                    placeholder="Enter project name"
                  />
                  <p ref={projectRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
                </div>


                <div>
                  <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Project Type <span className="text-orange-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 font-medium hover:border-orange-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="mixed-use">Mixed-Use</option>
                  </select>
                  <p ref={typeRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
                </div>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="floors" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Number of Floors <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="floors"
                    name="floors"
                    value={floor}
                    onChange={(e) => setFloor(Number(e.target.value))}
                    min="1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300"
                    placeholder="Enter number of floors"
                  />
                  <p ref={floorRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
                </div>


                <div>
                  <label htmlFor="budget" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Budget (₹) <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300"
                    placeholder="Enter project budget"
                  />
                  <p ref={costRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
                </div>
              </div>


              <div>
                <label htmlFor="area" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Area (sqft) <span className="text-orange-500">*</span>
                </label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300"
                  placeholder="Enter area in square feet"
                />
                <p ref={areaRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
              </div>


              <div>
                <label htmlFor="locationType" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Location & Address <span className="text-orange-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    id="locationType"
                    name="locationType"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300"
                    placeholder="Enter location and address"
                  />
                  <button
                    type="button"
                    onClick={() => setOnMap(true)}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Select on Map
                  </button>
                </div>
                <p ref={addressRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
              </div>


              <div>
                <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Project Description <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 resize-none min-h-[120px] font-medium hover:border-orange-300"
                  placeholder="Describe the project objectives, scope, and key features..."
                />
                <p ref={descriptionRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
              </div>


              <div>
                <button
                  onClick={addFormSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg disabled:shadow-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Map Modal */}
        {onMap && (
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-2 border-orange-500/20">
              <MapIntegrationApp
                address={address}
                onMap={onMap}
                setOnMap={setOnMap}
                setSelectedLocation={setSelectedLocation}
                selectedLocation={selectedLocation}
                setAddress={setAddress}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}


export default ProjectProposal;