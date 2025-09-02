import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../redux/slice/authslice";
import { UpdateProfileAPI } from "../../api/userprofile";
import EditEmailModal from "./SubprofileCompponent/EditEmailModal";
import EditVarifyOTPModal from "./SubprofileCompponent/EditVerifyOTPModal";


function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [editAccess, setEditAccess] = useState(false);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || 0);

  const [emailEnable, setEmailEnable] = useState<boolean>(false)
  const [OtpEnable, setOtpEnable] = useState<boolean>(false)

  const updateProfile = async () => {
    if (!user?._id || !username || !email || !phone) {
      toast.error("The Required Field is Missing");
      return;
    }
    const response = await UpdateProfileAPI({ username, email, phone });
    if (response.success) {
      toast.success(response.message);
      dispatch(login({
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email,
        phone: response.data.phone,
        profile_image: response.data?.profile_image,
        token: localStorage.getItem("accessToken") || "",
      }));
      setEditAccess(false);
    } else {
      toast.error(response.message);
    }
  };

  const handleCancel = () => {
    // Reset form values to original user data
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || 0);
    setEditAccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover/Header Area */}
          <div className="h-32 bg-gradient-to-r from-teal-500 to-teal-600"></div>

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Profile Image */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white p-2 shadow-lg mb-4 sm:mb-0">
                {user?.profile_image ? (
                  <img
                    src={user?.profile_image}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium">
                    No Image
                  </div>
                )}
              </div>

              {/* Name and Edit Button */}
              <div className="sm:ml-6 text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {user?.username || "User"}
                </h1>
                <p className="text-gray-600 mb-4">Member Profile</p>

                {!editAccess && (
                  <button
                    onClick={() => setEditAccess(true)}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                      focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="md:col-span-2">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    {editAccess ? "Edit Profile Information" : "Profile Information"}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Username
                      </label>
                      {editAccess ? (
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter username"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-800
                            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white"
                        />
                      ) : (
                        <div className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800">
                          {user?.username || "Not provided"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>

                      {editAccess ? (
                        <input
                          readOnly
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 
        focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
        transition-all duration-200 bg-white shadow-sm"
                        />
                      ) : (
                        <div
                          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 
        text-gray-800 shadow-sm"
                        >
                          {user?.email || "Not provided"}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setEmailEnable(true)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium 
      text-teal-600 hover:text-teal-800 
      bg-teal-50 hover:bg-teal-100 
      border border-teal-200 rounded-md 
      transition-colors duration-200"
                      >
                        ✏️ Edit
                      </button>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      {editAccess ? (
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(Number(e.target.value))}
                          placeholder="Enter phone number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-800
                            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white"
                        />
                      ) : (
                        <div className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800">
                          {user?.phone || "Not provided"}
                        </div>
                      )}
                    </div>

                    {editAccess && (
                      <div className="flex justify-end space-x-4 pt-4">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={updateProfile}
                          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                            focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EditEmailModal
            emailEnable={emailEnable}
            setEmailEnable={setEmailEnable}
            setOtpEnable={setOtpEnable}
          />
          <EditVarifyOTPModal
            setOtpEnable={setOtpEnable}
            OtpEnable={OtpEnable}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;