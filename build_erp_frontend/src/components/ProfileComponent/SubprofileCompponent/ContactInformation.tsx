import { Clock, Mail, MapPin, Phone, Building2 } from "lucide-react"

function ContactInformation(){
   return(
      <>
      <div className="lg:col-span-1 selection:bg-orange-500 selection:text-white">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
              
              {/* Structural Orange Ribbon Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" />
              
              {/* Panel Header */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
                <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white uppercase tracking-wider">Contact Information</h3>
                  <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                    HQ Communications Directory
                  </p>
                </div>
              </div>
              
              {/* Directory Entry Grid */}
              <div className="space-y-6">
                
                {/* Email Node */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-orange-500 group-hover:border-orange-500/30 rounded-xl flex items-center justify-center transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-wider">Email Channels</h4>
                    <div className="mt-1 space-y-0.5 text-xs font-medium text-slate-200">
                      <p className="hover:text-orange-400 transition-colors cursor-pointer">info@builderp.com</p>
                      <p className="hover:text-orange-400 transition-colors cursor-pointer">support@builderp.com</p>
                    </div>
                  </div>
                </div>

                {/* Phone Comms Node */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-orange-500 group-hover:border-orange-500/30 rounded-xl flex items-center justify-center transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-wider">Direct Comms</h4>
                    <div className="mt-1 space-y-0.5 text-xs font-mono font-bold text-slate-300">
                      <p>+1 (555) 123-4567</p>
                      <p>+1 (555) 765-4321</p>
                    </div>
                  </div>
                </div>

                {/* Physical Location Node */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-orange-500 group-hover:border-orange-500/30 rounded-xl flex items-center justify-center transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-wider">Physical Site</h4>
                    <p className="mt-1 text-xs font-medium text-slate-300 leading-relaxed">
                      123 Business Avenue<br />
                      Suite 456<br />
                      <span className="text-slate-400 font-mono text-[11px] font-bold uppercase tracking-wider">Tech City, TC 12345</span>
                    </p>
                  </div>
                </div>

                {/* Operations Window Node */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-orange-500 group-hover:border-orange-500/30 rounded-xl flex items-center justify-center transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-wider">Operating Window</h4>
                    <div className="mt-1 text-xs font-medium text-slate-300 space-y-1">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Mon - Fri:</span>
                        <span className="font-mono font-bold text-slate-200">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Saturday:</span>
                        <span className="font-mono font-bold text-slate-200">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Sunday:</span>
                        <span className="text-red-400 font-mono font-black uppercase tracking-wider text-[10px] bg-red-500/5 px-1.5 py-0.5 rounded border border-red-500/10">Offline</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
      </>
   )
}

export default ContactInformation