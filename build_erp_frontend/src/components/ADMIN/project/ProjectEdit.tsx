import { fetchUser, putProject } from "../../../api/project";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MapIntegrationApp from "../../ProfileComponent/Map/Map";
import type { ProjectType } from "ApiInterface/project.interface";

type UserType = {
  _id: string;
  username: string;
  phone: number;
  email: string;
};

type EditProjectProp = {
  editData: ProjectType
  editEnable: boolean;
  setEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onEditSuccess: () => void;
};

interface Location {
  lat: number;
  lng: number;
  name: string;
}

function EditProject({
  editData,
  editEnable,
  setEnableEdit,
  onEditSuccess,
}: EditProjectProp) {
  if (!editEnable) return null;

  const [project_name, setProjectName] = useState(editData.project_name);
  const [user_id, setUserId] = useState(editData.userDetails._id);
  const [address, setAddress] = useState(editData.address);
  const [email, setEmail] = useState(editData.email);
  const [mobile_number, setMobile] = useState(editData.mobile_number);
  const [description, setDescription] = useState(editData.description);
  const [area, setArea] = useState<number>(editData.area);
  const [cost, setCost] = useState<number>(editData.cost || 0);
  const [floors, setFloors] = useState<number>(editData.floor || 1);
  const [userList, setUserList] = useState<UserType[]>([]);
  const [onMap, setOnMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>({ lat: editData.lat, lng: editData.long, name: editData.address });
  const [type,setType] = useState("")

  const projectRef = useRef<HTMLParagraphElement>(null);
  const userRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const mobileRef = useRef<HTMLParagraphElement>(null);
  const areaRef = useRef<HTMLParagraphElement>(null);
  const costRef = useRef<HTMLParagraphElement>(null);
  const floorsRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setProjectName(editData.project_name);
    setUserId(editData.userDetails._id);
    setAddress(editData.address);
    setEmail(editData.email);
    setMobile(editData.mobile_number);
    setDescription(editData.description);
    setArea(editData.area);
    setCost(editData.cost || 0);
    setFloors(editData.floor || 1);
    setSelectedLocation({ lat: editData.lat, lng: editData.long, name: editData.address });
    setType(editData.project_type)
  }, [editData]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchUser();
      setUserList(data.data);
    };
    fetchUsers();
  }, []);

  const editFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (project_name.trim() === "") {
      if (projectRef.current) projectRef.current.innerText = "Project name is required.";
      hasError = true;
    } else if (projectRef.current) {
      projectRef.current.innerText = "";
    }

    if (!user_id) {
      if (userRef.current) userRef.current.innerText = "Please select a user.";
      hasError = true;
    } else if (userRef.current) {
      userRef.current.innerText = "";
    }

    if (address.trim() === "") {
      if (addressRef.current) addressRef.current.innerText = "Address is required.";
      hasError = true;
    } else if (addressRef.current) {
      addressRef.current.innerText = "";
    }

    if (email.trim() === "") {
      if (emailRef.current) emailRef.current.innerText = "Email is required.";
      hasError = true;
    } else if (emailRef.current) {
      emailRef.current.innerText = "";
    }

    if (mobile_number === "") {
      if (mobileRef.current) mobileRef.current.innerText = "Mobile number is required.";
      hasError = true;
    } else if (mobileRef.current) {
      mobileRef.current.innerText = "";
    }

    if (area <= 0) {
      if (areaRef.current) areaRef.current.innerText = "Area must be greater than zero.";
      hasError = true;
    } else if (areaRef.current) {
      areaRef.current.innerText = "";
    }

    if (cost <= 0) {
      if (costRef.current) costRef.current.innerText = "Cost must be greater than zero.";
      hasError = true;
    } else if (costRef.current) {
      costRef.current.innerText = "";
    }

    if (floors <= 0) {
      if (floorsRef.current) floorsRef.current.innerText = "Number of floors must be greater than zero.";
      hasError = true;
    } else if (floorsRef.current) {
      floorsRef.current.innerText = "";
    }

    if (!selectedLocation) {
      if (addressRef.current) addressRef.current.innerText = "Please select a location on the map.";
      hasError = true;
    }

    if (hasError) return;

    let latitude = selectedLocation?.lat;
    let longitude = selectedLocation?.lng;
    if (!latitude || !longitude) return;

    const data = await putProject({
      _id: editData._id,
      project_name,
      type,
      user_id,
      address,
      mobile_number: Number(mobile_number),
      email,
      area,
      cost,
      floor: floors,
      description,
      latitude,
      longitude
    });

    if (data.success) {
      toast.success(data.message);
      setEnableEdit(false);
      setProjectName("");
      setUserId("");
      setAddress("");
      setEmail("");
      setMobile("");
      setDescription("");
      setArea(0);
      setCost(0);
      setFloors(1);
      setSelectedLocation(null);
      onEditSuccess();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
      <form
        onSubmit={editFormSubmit}
        className="bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 border border-gray-700/50 max-h-[90vh] overflow-y-auto"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-100 mb-6 sm:mb-8 border-b border-gray-700 pb-4">
          Edit Project
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-200 mb-2">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={project_name}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            />
            <p ref={projectRef} className="text-sm text-red-400 mt-2"></p>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-2">
              Project Type *
            </label>
            <select
              id="type"
              name="type"
              onChange={(e) => {
                setType(e.target.value)
              }}
              value={type}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            >
              <option value="">Select project type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="mixed-use">Mixed-Use</option>
            </select>
          </div>

          {/* Client */}
          <div>
            <label htmlFor="clientSelect" className="block text-sm font-medium text-gray-200 mb-2">
              Client
            </label>
            <select
              id="clientSelect"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            >
              <option value="">Select a client</option>
              {userList.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            <p ref={userRef} className="text-sm text-red-400 mt-2"></p>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-2">
              Address
            </label>
            <div className="flex gap-2">
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="flex-grow px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setOnMap(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Select on Map
              </button>
            </div>
            <p ref={addressRef} className="text-sm text-red-400 mt-2"></p>
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-200 mb-2">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="text"
              value={mobile_number}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            />
            <p ref={mobileRef} className="text-sm text-red-400 mt-2"></p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            />
            <p ref={emailRef} className="text-sm text-red-400 mt-2"></p>
          </div>

          {/* Area */}
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-200 mb-2">
              Area (sqft)
            </label>
            <input
              id="area"
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              placeholder="Enter area"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            />
            <p ref={areaRef} className="text-sm text-red-400 mt-2"></p>
          </div>

          {/* Cost */}
          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-200 mb-2">
              Budget Cost ($)
            </label>
            <input
              id="cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              placeholder="Enter budget cost"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            />
            <p ref={costRef} className="text-sm text-red-400 mt-2"></p>
          </div>

          {/* Floors */}
          <div>
            <label htmlFor="floors" className="block text-sm font-medium text-gray-200 mb-2">
              Number of Floors
            </label>
            <input
              id="floors"
              type="number"
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
              placeholder="Enter number of floors"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
            />
            <p ref={floorsRef} className="text-sm text-red-400 mt-2"></p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 sm:mt-8">
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base min-h-[120px]"
          />
          <p ref={descriptionRef} className="text-sm text-red-400 mt-2"></p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6 sm:pt-8">
          <button
            type="button"
            onClick={() => {
              setEnableEdit(false);
              setProjectName("");
              setUserId("");
              setAddress("");
              setEmail("");
              setMobile("");
              setDescription("");
              setArea(0);
              setCost(0);
              setFloors(1);
              setSelectedLocation(null);
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Save
          </button>
        </div>

        {/* Map Modal */}
        {onMap && (
          <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
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
      </form>
    </div>
  );
}

export default EditProject;