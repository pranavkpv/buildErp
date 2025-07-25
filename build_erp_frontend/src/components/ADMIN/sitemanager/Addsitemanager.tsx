import { postSitemanager } from "../../../api/Admin/sitemanager";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type AddSitemanagerProps = {
  addEnable: boolean;
  setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onAddSuccess: () => void;
};

function AddSitemanager({ addEnable, setAddEnable, onAddSuccess }: AddSitemanagerProps) {
  const [sitemanager, setSitemanager] = useState("");
  const [email, setEmail] = useState("");
  const sitemanagerRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  

  const sitemanagerAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (sitemanager.trim() === "") {
      if (sitemanagerRef.current) sitemanagerRef.current.innerText = "Sitemanager is required";
      hasError = true;
    } else {
      if (sitemanagerRef.current) sitemanagerRef.current.innerText = "";
    }

    if (email.trim() === "") {
      if (emailRef.current) emailRef.current.innerText = "Email is required";
      hasError = true;
    } else {
      if (emailRef.current) emailRef.current.innerText = "";
    }


    if (hasError) return;

    try {
      const username = sitemanager
      const data = await postSitemanager(username,email)
      if (data.success) {
        toast.success(data.message);
        setAddEnable(false);
        onAddSuccess();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to add sitemanager");
    }
  };

  if (!addEnable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-center text-gray-100 mb-6">Add Site Manager</h2>
        <form onSubmit={sitemanagerAdd} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1.5">Name</label>
            <input
              type="text"
              placeholder="Enter site manager name"
              onChange={(e) => setSitemanager(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
            <p ref={sitemanagerRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
            <input
              type="text"
              placeholder="Enter site manager email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
            <p ref={emailRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setAddEnable(false)}
              className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSitemanager;