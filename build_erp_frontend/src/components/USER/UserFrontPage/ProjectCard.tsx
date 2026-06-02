import { Link } from "react-router-dom";
import { MapPin, Maximize2, ChevronRight } from "lucide-react";

type projectProp = {
  _id: string;
  project_name: string;
  expected_image: string;
  finalImage: string;
  area: number;
  address: string;
  status: string;
  description: string;
  latitude: number;
  longitude: number;
  index: number;
};

function ProjectCard({
  _id,
  project_name,
  expected_image,
  area,
  address,
  status,
  description,
  latitude,
  longitude,
  index,
}: projectProp) {
  
  // Industrial color schemes allocated based on blueprint build phase
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "from-amber-500 to-orange-500",
          badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          accentLine: "from-amber-500 to-orange-500",
        };
      case "processing":
        return {
          bg: "from-orange-500 via-yellow-500 to-orange-600",
          badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
          accentLine: "from-orange-500 to-yellow-500",
        };
      default:
        return {
          bg: "from-emerald-500 to-teal-600",
          badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          accentLine: "from-emerald-500 to-teal-500",
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="group relative w-full max-w-sm mx-auto h-[30rem] flex flex-col justify-between bg-slate-900 rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl transition-all duration-300 hover:border-slate-700 hover:shadow-2xl">
      
      {/* Structural Card Status Edge Highlight */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${statusConfig.accentLine}`} />

      <div>
        {/* Media Block / Image Container */}
        <div className="relative overflow-hidden h-48 bg-slate-950">
          <img
            src={expected_image}
            alt={project_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
          
          {/* Construction Status Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider border backdrop-blur-sm ${statusConfig.badge}`}>
            {status}
          </div>
        </div>

        {/* Informational Core Section */}
        <div className="p-5 space-y-4">
          
          {/* Project Title Block */}
          <div>
            <h3 className="text-lg font-black text-white tracking-tight line-clamp-2 uppercase group-hover:text-orange-400 transition-colors duration-300">
              {project_name}  
            </h3>
            <div className={`w-12 h-0.5 mt-2 bg-gradient-to-r ${statusConfig.accentLine} group-hover:w-20 transition-all duration-300 rounded-full`}></div>
          </div>

          {/* Metric Field Details Layout */}
          <div className="space-y-2.5 font-medium text-slate-400 text-sm">
            
            {/* Coordinate Address Location */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
              <p className="line-clamp-2 leading-tight text-slate-300">{address}</p>
            </div>

            {/* Area Specification Index */}
            <div className="flex items-center gap-2.5">
              <Maximize2 className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="font-mono text-xs tracking-wider text-slate-300 uppercase">
                {area.toLocaleString()} SQFT Scope
              </span>
            </div>
            
          </div>

          {/* Text Summary Description */}
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed pt-1">
            {description}
          </p>
        </div>
      </div>

      {/* View Details CTA Section */}
      <div className="p-5 pt-0">
        <Link
          to="/projectDetail"
          state={{
            projectId: _id,
            projectname: project_name,
            expectedImage: expected_image,
            area,
            address,
            description,
            latitude,
            longitude,
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition-all duration-300 text-xs uppercase tracking-wider group/btn"
          aria-label={`View structural configuration details for ${project_name}`}
        >
          <span>Examine Specifications</span>
          <ChevronRight className="w-4 h-4 text-orange-500 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>

    </div>
  );
}

export default ProjectCard;