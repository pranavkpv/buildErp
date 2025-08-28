import { changePassword } from "../../../api/Sitemanager/profile";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function DisplaySitemanagerData() {
   const [orinalpass, setOriginalPass] = useState("");
   const [changedpass, setChangedPass] = useState("");
   const [confirmpass, setConfirmPass] = useState("");
   const [ohide, setOhide] = useState(false)
   const [nhide, setNhide] = useState(false)
   const [chide,setChide] = useState(false)


   const passRef = useRef<HTMLParagraphElement>(null);




   const changePasswordFun = async (e: React.FormEvent) => {
      e.preventDefault();
      if (changedpass !== confirmpass) {
         return toast.error("Passwords do not match");
      }
      const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^])[a-zA-Z\d!@#$%^&*]{8,}$/;
      if (!passCheck.test(changedpass)) {
         return passRef.current ? (passRef.current.innerText = `Password must include uppercase, lowercase, number, special character, and be 8+ characters long.`) : "";
      }
         const password = orinalpass
         const changedpassword = changedpass
         const data = await changePassword({password, changedpassword})
         if (data.success) {
            toast.success(data.message);
            setOriginalPass("");
            setChangedPass("");
            setConfirmPass("");
         } else {
            toast.error(data.message);
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
               <label htmlFor="Originalpassword" className="block text-sm font-medium text-gray-300 mb-1">
                  original Password
               </label>
               <div className="relative w-full max-w-md">
                  <input
                     type={ohide ? "text" : "password"}
                     id="Originalpassword"
                     placeholder="Enter your original password"
                     onChange={(e) => setOriginalPass(e.target.value)}
                     value={orinalpass}
                     className="w-full px-4 py-2.5 bg-gray-800/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-100 placeholder-gray-400 text-sm pr-12"
                  />
                  <button type="button"
                     onClick={() => setOhide(!ohide)}
                     className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200 text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                     aria-label={ohide ? "Hide password" : "Show password"}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                     >
                        {ohide ? (
                           <>
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                           </>
                        ) : (
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.39 4.172 5.325 7.178 9.963 7.178 4.638 0 8.573-3.007 9.963-7.178a10.477 10.477 0 0 0-2.046-3.777m-6.917.557a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.095-2.223L3.98 8.223"
                           />
                        )}
                     </svg>
                  </button>
               </div>
               <p ref={passRef} className="text-red-400 text-sm mt-1"></p>
            </div>
            <div>
               <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  New Password
               </label>
               <div className="relative w-full max-w-md">
                  <input
                     type={nhide ? "text" : "password"}
                     id="password"
                     placeholder="Enter new password"
                     onChange={(e) => setChangedPass(e.target.value)}
                     value={changedpass}
                     className="w-full px-4 py-2.5 bg-gray-800/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-100 placeholder-gray-400 text-sm pr-12"
                  />
                  <button type="button"
                     onClick={() => setNhide(!nhide)}
                     className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200 text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                     aria-label={nhide ? "Hide password" : "Show password"}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                     >
                        {nhide ? (
                           <>
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                           </>
                        ) : (
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.39 4.172 5.325 7.178 9.963 7.178 4.638 0 8.573-3.007 9.963-7.178a10.477 10.477 0 0 0-2.046-3.777m-6.917.557a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.095-2.223L3.98 8.223"
                           />
                        )}
                     </svg>
                  </button>
               </div>
               <p ref={passRef} className="text-red-400 text-sm mt-1"></p>
            </div>
            <div>
               <label htmlFor="cpassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
               </label>
               <div className="relative w-full max-w-md">
                  <input
                     type={chide ? "text" : "password"}
                     id="cpassword"
                     placeholder="Enter confirm password"
                     onChange={(e) => setConfirmPass(e.target.value)}
                     value={confirmpass}
                     className="w-full px-4 py-2.5 bg-gray-800/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-100 placeholder-gray-400 text-sm pr-12"
                  />
                  <button type="button"
                     onClick={() => setChide(!chide)}
                     className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200 text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                     aria-label={chide ? "Hide password" : "Show password"}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                     >
                        {chide ? (
                           <>
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                           </>
                        ) : (
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.39 4.172 5.325 7.178 9.963 7.178 4.638 0 8.573-3.007 9.963-7.178a10.477 10.477 0 0 0-2.046-3.777m-6.917.557a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.095-2.223L3.98 8.223"
                           />
                        )}
                     </svg>
                  </button>
               </div>
               <p ref={passRef} className="text-red-400 text-sm mt-1"></p>
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