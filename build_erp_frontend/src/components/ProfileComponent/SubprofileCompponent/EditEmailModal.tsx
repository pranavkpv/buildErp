import { useState } from "react";
import { toast } from "react-toastify";
import { editEmailApi } from "../../../api/userprofile";

type EditEmailProp = {
  emailEnable: boolean;
  setEmailEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setOtpEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditEmailModal({ emailEnable, setEmailEnable, setOtpEnable }: EditEmailProp) {
   if (!emailEnable) return null;
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await editEmailApi(email);
      if (response.success) {
        toast.success(response.message);
        setEmailEnable(false);
        setOtpEnable(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to request email update");
      console.error("Error requesting email update:", error);
    }
  };

  

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white-800/90 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-700/50">
        <h2 className="text-xl font-semibold text-gray-100 mb-6">Update Email Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              New Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setEmailEnable(false)}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmailModal;