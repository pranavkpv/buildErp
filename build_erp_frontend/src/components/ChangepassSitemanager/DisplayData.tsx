import { changePassword } from "../../api/Sitemanager/profile";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function DisplaySitemanagerData() {
   const [orinalpass, setOriginalPass] = useState("");
   const [changedpass, setChangedPass] = useState("");
   const [confirmpass, setConfirmPass] = useState("");
   const passRef = useRef<HTMLParagraphElement>(null);
   const token = localStorage.getItem("accessToken");
   const [sitemanagerId, setSitemanagerId] = useState("");

   useEffect(() => {
      if (token) {
         const payload = token.split('.')[1];
         const decodedPayload = JSON.parse(atob(payload));
         setSitemanagerId(decodedPayload.userId);
      }
   }, [token]);

   const changePasswordFun = async (e: React.FormEvent) => {
      e.preventDefault();
      if (changedpass !== confirmpass) {
         return toast.error("Passwords do not match");
      }
      const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^])[a-zA-Z\d!@#$%^&*]{8,}$/;
      if (!passCheck.test(changedpass)) {
         return passRef.current ? (passRef.current.innerText = `Password must include uppercase, lowercase, number, special character, and be 8+ characters long.`) : "";
      }
      try {
         const _id = sitemanagerId
         const password = orinalpass
         const changedpassword = changedpass
         const data = await changePassword(_id, password, changedpassword)
         if (data.success) {
            toast.success(data.message);
            setOriginalPass("");
            setChangedPass("");
            setConfirmPass("");
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         toast.error("An error occurred while changing the password");
      }
   };

   const handleCancel = () => {
      setOriginalPass("");
      setChangedPass("");
      setConfirmPass("");
      if (passRef.current) passRef.current.innerText = "";
   };

   return (
      <div className=" inset-0  md:left-64  z-50 flex items-center justify-center p-4">
         <form
            onSubmit={changePasswordFun}
            className="bg-gray-800/90  top-10 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-6 border border-gray-700/50"
         >
            <h2 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
               Change Password
            </h2>
            <div>
               <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-200 mb-1">
                  Current Password
               </label>
               <input
                  id="currentPassword"
                  type="text"
                  placeholder="Enter current password"
                  value={orinalpass}
                  onChange={(e) => setOriginalPass(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
               />
            </div>
            <div>
               <label htmlFor="text" className="block text-sm font-medium text-gray-200 mb-1">
                  New Password
               </label>
               <input
                  id="newPassword"
                  type="text"
                  placeholder="Enter new password"
                  value={changedpass}
                  onChange={(e) => setChangedPass(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
               />
               <p ref={passRef} className="text-red-400 text-sm mt-1 min-h-[20px]"></p>
            </div>
            <div>
               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                  Confirm New Password
               </label>
               <input
                  id="confirmPassword"
                  type="text"
                  placeholder="Confirm new password"
                  value={confirmpass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
               />
            </div>
            <div className="flex justify-end gap-4 pt-4">
               <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
               >
                  Change Password
               </button>
            </div>
         </form>
      </div>
   );
}

export default DisplaySitemanagerData;