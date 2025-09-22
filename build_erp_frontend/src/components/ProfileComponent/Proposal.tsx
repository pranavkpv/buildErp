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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Submission Successful!</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Your project proposal has been sent successfully. We will review and respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setRequireOn(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-200 focus:ring-4 focus:ring-indigo-200"
              aria-label="Add project requirements"
            >
              Add Project Requirements
            </button>
            <button
              onClick={() => setSkipOn(true)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-200 focus:ring-4 focus:ring-gray-200"
              aria-label="Skip adding project requirements"
            >
              Skip Requirements
            </button>
            <button
              onClick={() => {
                setImageEnable(true);
                setUploadImage(selectProject);
              }}
              className="bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              Upload Image You Expect
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Project Proposal Form</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Submit your project details below, and our team will get in touch to discuss your vision.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Project Details</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
                    placeholder="Enter project name"
                  />
                  <p ref={projectRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem]"></p>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900"
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="mixed-use">Mixed-Use</option>
                  </select>
                  <p ref={typeRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem]"></p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="floors" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Floors *
                  </label>
                  <input
                    type="number"
                    id="floors"
                    name="floors"
                    value={floor}
                    onChange={(e) => setFloor(Number(e.target.value))}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
                    placeholder="Enter number of floors"
                  />
                  <p ref={floorRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem]"></p>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget ($) *
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
                    placeholder="Enter project budget"
                  />
                  <p ref={costRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem]"></p>
                </div>
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sqft) *
                </label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
                  placeholder="Enter area in square feet"
                />
                <p ref={areaRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem]"></p>
              </div>

              <div>
                <label htmlFor="locationType" className="block text-sm font-medium text-gray-700 mb-2">
                  Location & Address *
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    id="locationType"
                    name="locationType"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
                    placeholder="Enter location and address"
                  />
                  <button
                    type="button"
                    onClick={() => setOnMap(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Select on Map
                  </button>
                </div>
                <p ref={addressRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem]"></p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400 resize-none min-h-[120px]"
                  placeholder="Describe the project objectives, scope, and key features..."
                />
                <p ref={descriptionRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem]"></p>
              </div>

              <div>
                <button
                  onClick={addFormSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
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
      </div>

      {/* Map Modal */}
      {onMap && (
        <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
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
      <Footer />
    </>
  );
}

export default ProjectProposal;