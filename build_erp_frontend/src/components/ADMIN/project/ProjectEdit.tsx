import { fetchUser, putProject } from "../../../api/Admin/project";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
      try {
        const data = await fetchUser()
        setUserList(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users");
      }
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

    if (mobile_number.trim() === "") {
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

    if (description.trim() === "") {
      if (descriptionRef.current) descriptionRef.current.innerText = "Description is required.";
      hasError = true;
    } else if (descriptionRef.current) {
      descriptionRef.current.innerText = "";
    }

    if (hasError) return;

    try {
      const _id = editProjectId
      const data = await putProject(_id,project_name,user_id,address,mobile_number,email,area,description,)
      if (data.success) {
        toast.success(data.message);
        setEnableEdit(false);
        onEditSuccess();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit project");
    }
  };

  if (!editEnable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
      <form
        onSubmit={editFormSubmit}
        className="bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl p-6 border border-gray-700/50 max-h-[95vh] overflow-y-auto"
      >
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
          Edit Project
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-200 mb-1">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={project_name}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            />
            <p ref={projectRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          {/* Client */}
          <div>
            <label htmlFor="clientSelect" className="block text-sm font-medium text-gray-200 mb-1">
              Client
            </label>
            <select
              id="clientSelect"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            >
              <option value="">Select a client</option>
              {userList.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            <p ref={userRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            />
            <p ref={addressRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-200 mb-1">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="text"
              value={mobile_number}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            />
            <p ref={mobileRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            />
            <p ref={emailRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          {/* Area */}
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-200 mb-1">
              Area (sqft)
            </label>
            <input
              id="area"
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              placeholder="Enter area"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            />
            <p ref={areaRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>
        </div>

        {/* Description (full width) */}
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm min-h-[100px]"
          />
          <p ref={descriptionRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => setEnableEdit(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;