import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../redux/slice/authslice";
import { UpdateProfileAPI } from "../../api/userprofile";
import EditEmailModal from "./SubprofileCompponent/EditEmailModal";
import EditVarifyOTPModal from "./SubprofileCompponent/EditVerifyOTPModal";
import { User, Mail, Phone, Hammer, Edit3 } from "lucide-react";

function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [editAccess, setEditAccess] = useState(false);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [emailEnable, setEmailEnable] = useState<boolean>(false);
  const [OtpEnable, setOtpEnable] = useState<boolean>(false);

  const updateProfile = async () => {
    if (!user?._id || !username || !email || !phone) {
      toast.error("The Required Data Node Payload field is Missing");
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
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setEditAccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Terminal Core Profile Container Frame */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden">
          
          {/* Structural Top Accent Banner Edge Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600" />

          {/* Graphical Construction Header Mesh Canvas Background */}
          <div className="h-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60 relative flex items-center px-6">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />
            <div className="flex items-center gap-2 text-orange-500/30 font-mono font-black select-none pointer-events-none text-xl tracking-widest uppercase">
              <Hammer className="w-5 h-5" /> HQ_SYS_CON_NODE
            </div>
          </div>

          {/* Profile Core Component Blocks */}
          <div className="relative px-6 pb-6">
            
            {/* Identity Grid Meta Block */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-8 gap-4 sm:gap-6">
              <div className="relative w-32 h-32 rounded-xl bg-slate-950 border-2 border-slate-800 p-1.5 shadow-xl shrink-0 group">
                {user?.profile_image ? (
                  <img
                    src={user?.profile_image}
                    alt="profile node identifier"
                    className="w-full h-full object-cover rounded-lg filter brightness-90"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 text-xs font-mono font-bold uppercase tracking-wider">
                    Null Media
                  </div>
                )}
                <span className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-emerald-500 border border-slate-950" />
              </div>

              {/* Title Action Block */}
              <div className="text-center sm:text-left flex-1 pb-1">
                <h1 className="text-2xl font-black text-white uppercase tracking-wider">
                  {user?.username || "Identity Operator"}
                </h1>
                <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Personnel Node Identity Card
                </p>

                {!editAccess && (
                  <button
                    onClick={() => setEditAccess(true)}
                    className="mt-4 px-5 py-2 bg-slate-950 border border-slate-800 text-orange-500 hover:text-orange-400 font-mono font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-200 shadow-md hover:border-slate-700 hover:bg-slate-900/60 flex items-center gap-2 mx-auto sm:mx-0"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Modify Parameters
                  </button>
                )}
              </div>
            </div>

            {/* Parameter Entry Fields Configuration Index Layout */}
            <div className="w-full">
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-5 md:p-6">
                
                <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-6 pb-2 border-b border-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  {editAccess ? "Overwrite Configuration Registry" : "Registry Information Fields Data"}
                </h2> 

                <div className="space-y-5">
                  
                  {/* Parameter Block: Username */}
                  <div className="space-y-1.5">
                    <label htmlFor="username" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
                      System Operator Call-sign
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                        <User className="w-4 h-4" />
                      </span>
                      {editAccess ? (
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter new terminal callsign"
                          className="w-full pl-10 pr-4 py-3 bg-slate-950 text-slate-200 border-2 border-slate-800 rounded-xl placeholder-slate-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
                        />
                      ) : (
                        <div className="w-full pl-10 pr-4 py-3 bg-slate-950/30 border border-slate-800 text-slate-400 rounded-xl text-sm font-medium">
                          {user?.username || "Call-sign entry empty"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Parameter Block: Email Address Link */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
                      Communications Relay Routing (Email)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                          <Mail className="w-4 h-4" />
                        </span>
                        {editAccess ? (
                          <input
                            readOnly
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Data relay network identifier"
                            className="w-full pl-10 pr-4 py-3 bg-slate-950 text-slate-400 border-2 border-slate-800 rounded-xl placeholder-slate-700 text-sm focus:outline-none font-medium opacity-60 cursor-not-allowed"
                          />
                        ) : (
                          <div className="w-full pl-10 pr-4 py-3 bg-slate-950/30 border border-slate-800 text-slate-400 rounded-xl text-sm font-medium">
                            {user?.email || "Relay route destination empty"}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setEmailEnable(true)}
                        className="px-4 py-2 bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-orange-500 rounded-xl hover:bg-slate-900 hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-center"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Re-route Link
                      </button>
                    </div>
                  </div>

                  {/* Parameter Block: Phone Line Node */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
                      Direct Comms Audio Node Dial (Phone)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                        <Phone className="w-4 h-4" />
                      </span>
                      {editAccess ? (
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value ? Number(e.target.value) : "")}
                          placeholder="Enter current numeric voice dial"
                          className="w-full pl-10 pr-4 py-3 bg-slate-950 text-slate-200 border-2 border-slate-800 rounded-xl placeholder-slate-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
                        />
                      ) : (
                        <div className="w-full pl-10 pr-4 py-3 bg-slate-950/30 border border-slate-800 text-slate-400 rounded-xl text-sm font-medium">
                          {user?.phone || "Audio node line offline"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interactive Save/Abort Trigger Controls */}
                  {editAccess && (
                    <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-800/80">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-5 py-2.5 bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-400 hover:text-slate-200 rounded-xl hover:border-slate-700 hover:bg-slate-900 transition-colors uppercase tracking-wider"
                      >
                        Abort Changes
                      </button>
                      <button
                        type="button"
                        onClick={updateProfile}
                        className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-mono font-black rounded-xl transition-all shadow-md uppercase tracking-wider hover:from-orange-600 hover:to-orange-700"
                      >
                        Commit Overwrites
                      </button>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
          
          {/* Sub-component Modal Layers */}
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