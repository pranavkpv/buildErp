import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../redux/slice/authslice";
import { UpdateProfileAPI } from "../../api/User/user";

function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [editAccess, setEditAccess] = useState(false);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || 0);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id || !username || !email || !phone) {
      toast.error("The Required Field is Missing");
      return;
    }

    try {
      const response = await UpdateProfileAPI(user._id, username, email, phone);
      console.log(response)
      if (response.success) {
        toast.success(response.message);
        dispatch(login({
          _id: response.userData._id,
          username: response.userData.username,
          email: response.userData.email,
          phone: response.userData.phone,
          profile_image: response.userData?.profile_image,
          token: localStorage.getItem("accessToken") || "",
        }));
        setEditAccess(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An Error Occurred");
    }
  };

  return (
    <div className="max-w-100 mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-full h-48 overflow-hidden bg-gray-200 mb-4">
          {user?.profile_image ? (
            <img
              src={user?.profile_image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
      </div>

      <form onSubmit={updateProfile} className="space-y-6 px-20">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            readOnly={!editAccess}
            className={`mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-[#04a09c] focus:border-[#04a09c] transition-colors ${
              editAccess ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            readOnly={!editAccess}
            className={`mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-[#04a09c] focus:border-[#04a09c] transition-colors ${
              editAccess ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(Number(e.target.value))}
            placeholder="Enter phone number"
            readOnly={!editAccess}
            className={`mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-[#04a09c] focus:border-[#04a09c] transition-colors ${
              editAccess ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div className="flex justify-end space-x-4">
          {editAccess ? (
            <>
              <button
                type="button"
                onClick={() => setEditAccess(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#04a09c] text-white rounded-md hover:bg-[#09928e] focus:outline-none focus:ring-2 focus:ring-[#04a09c] transition-colors"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditAccess(true)}
              className="px-4 py-2 bg-[#04a09c] text-white rounded-md hover:bg-[#09928e] focus:outline-none focus:ring-2 focus:ring-[#04a09c] transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;