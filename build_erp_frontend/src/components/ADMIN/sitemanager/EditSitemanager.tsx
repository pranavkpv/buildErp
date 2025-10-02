import type { SiteData } from "ApiInterface/sitemanager.interface";
import { editSitemanagerData } from "../../../api/Admin/sitemanager";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";

type EditSitemanagerProps = {
  editEnable: boolean;
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  editData: SiteData
  onEditSuccess: () => void;
};

function EditSitemanager({
  editEnable,
  setEditEnable,
  editData,
  onEditSuccess,
}: EditSitemanagerProps) {
  const [sitemanager, setSitemanager] = useState(editData.username);
  const [email, setEmail] = useState(editData.email);

  const sitemanagerRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const [loadOn, setLoadOn] = useState(false)



  useEffect(() => {
    setSitemanager(editData.username);
    setEmail(editData.email);
  }, [editData.username, editData.email]);

  const sitemanagerEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (sitemanager.trim() === "") {
      if (sitemanagerRef.current) sitemanagerRef.current.innerText = "Site manager name is required";
      hasError = true;
    } else if (sitemanagerRef.current) {
      sitemanagerRef.current.innerText = "";
    }

    if (email.trim() === "") {
      if (emailRef.current) emailRef.current.innerText = "Email is required";
      hasError = true;
    } else if (emailRef.current) {
      emailRef.current.innerText = "";
    }

    if (hasError) return;
    try {
      setLoadOn(true)
      const _id = editData._id
      const username = sitemanager

      const data = await editSitemanagerData(_id, username, email)
      if (data.success) {
        setLoadOn(false)
        toast.success(data.message);
        setEditEnable(false);
        onEditSuccess();
      } else {
        setLoadOn(false)
        toast.error(data.message);
      }
    } catch (error) {
      setLoadOn(false)
    }
  };

  if (!editEnable) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50">
          <h2 className="text-xl font-semibold text-center text-gray-100 mb-6">Edit Site Manager</h2>
          <form onSubmit={sitemanagerEdit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1.5">Site Manager Name</label>
              <input
                type="text"
                value={sitemanager}
                placeholder="Enter site manager name"
                onChange={(e) => setSitemanager(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
              />
              <p ref={sitemanagerRef} className="text-sm text-red-400 mt-1.5"></p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
              />
              <p ref={emailRef} className="text-sm text-red-400 mt-1.5"></p>
            </div>



            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setEditEnable(false)}
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
      <Loading loadOn={loadOn} />
    </>
  );
}

export default EditSitemanager;