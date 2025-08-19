import { fetchUser, putProject } from "../../../api/project";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MapIntegrationApp from "../Map/Map";

type UserType = {
  _id: string;
  username: string;
  phone: number;
  email: string;
};

type EditProjectProp = {
  editProject: string;
  editUserId: string;
  edituserName: string;
  editAddress: string;
  editEmail: string;
  editPhone: string;
  editDescription: string;
  editArea: number;
  editEnable: boolean;
  editProjectId: string;
  setEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onEditSuccess: () => void;
};

interface Location {
  lat: number;
  lng: number;
  name: string;
}

function EditProject({
  editProject,
  editUserId,
  editAddress,
  editEmail,
  editPhone,
  editDescription,
  editArea,
  editEnable,
  editProjectId,
  setEnableEdit,
  onEditSuccess,
}: EditProjectProp) {
  const [project_name, setProjectName] = useState(editProject);
  const [user_id, setUserId] = useState(editUserId);
  const [address, setAddress] = useState(editAddress);
  const [email, setEmail] = useState(editEmail);
  const [mobile_number, setMobile] = useState(editPhone);
  const [description, setDescription] = useState(editDescription);
  const [area, setArea] = useState<number>(editArea);
  const [userList, setUserList] = useState<UserType[]>([]);
  const [onMap, setOnMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const projectRef = useRef<HTMLParagraphElement>(null);
  const userRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const mobileRef = useRef<HTMLParagraphElement>(null);
  const areaRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setProjectName(editProject);
    setUserId(editUserId);
    setAddress(editAddress);
    setEmail(editEmail);
    setMobile(editPhone);
    setDescription(editDescription);
    setArea(editArea);
  }, [editProject, editUserId, editAddress, editEmail, editPhone, editDescription, editArea]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchUser();
      console.log(data)
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

    if (!selectedLocation) {
      if (addressRef.current) addressRef.current.innerText = "Please select a location on the map.";
      hasError = true;
    }

    if (hasError) return;

    let latitude = selectedLocation?.lat;
    let longitude = selectedLocation?.lng
    if(!latitude || !longitude)return
    const data = await putProject(
      editProjectId,
      project_name,
      user_id,
      address,
      mobile_number,
      email,
      area,
      description,
      latitude,
      longitude
    );
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
      setSelectedLocation(null);
      onEditSuccess();
    } else {
      toast.error(data.message);
    }
  };

  if (!editEnable) return null;

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