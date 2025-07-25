import { Link } from "react-router-dom";

type projectProp = {
  _id: string;
  project_name: string;
  expected_image: string;
  finalImage: string;
  area: number;
  address: string;
  status: string;
  description: string;
  index?: number;
};

function ProjectCard({
  _id,
  project_name,
  expected_image,
  finalImage,
  area,
  address,
  status,
  description,
  index,
}: projectProp) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-gradient-to-r from-amber-400 to-orange-500",
          glow: "shadow-amber-400/25",
          pulse: "animate-pulse",
        };
      case "processing":
        return {
          bg: "bg-gradient-to-r from-[#04a09c] to-[#22d6d1]",
          glow: "shadow-teal-400/25",
          pulse: "",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-emerald-500 to-[#04a09c]",
          glow: "shadow-emerald-400/25",
          pulse: "",
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="group relative w-full max-w-sm mx-auto">
      {/* Animated Background Glow */}
      <div className={`absolute -inset-0.5 ${statusConfig.bg} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-700 animate-tilt`}></div>
      
      <div className="relative backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:rotate-1 h-[28rem] flex flex-col">
        
        {/* Image Container with Fixed Height */}
        <div className="relative overflow-hidden h-56">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <img
            src={ expected_image }
            alt={project_name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Animated Corner Accent */}
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-b-[60px] border-b-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-80 transition-all duration-500"></div>
        </div>

        {/* Content Section with Fixed Height */}
        <div className="p-6 space-y-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 flex-1 flex flex-col justify-between">
          
          {/* Project Name with Animated Underline */}
          <div className="relative">
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent leading-tight line-clamp-2">
              {project_name}
            </h3>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] group-hover:w-full transition-all duration-500"></div>
          </div>

          {/* Location with Icon */}
          <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
            <svg className="w-4 h-4 mt-0.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm line-clamp-2 leading-relaxed">{address}</p>
          </div>

          {/* Area Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-dark border border-teal-200 dark:border-teal-700 rounded-lg">
            <svg className="w-4 h-4 text-[#04a09c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span className="text-sm font-semibold text-[#04a09c] dark:text-teal-300">
              {area.toLocaleString()} sqft
            </span>
          </div>

          {/* Description with Fixed Height */}
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed flex-grow">
            {description}
          </p>

          {/* View Details Button */}
          <Link
            to="/projectDetail"
            state={{
              projectId: _id,
              projectname: project_name,
              expectedImage: expected_image,
              area,
              address,
              description,
            }}
            className="group/link inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-gradient-to-r from-[#04a09c] to-[#22d6d1] bg-clip-text hover:from-[#03b7b1] hover:to-[#04a09c] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 rounded-md p-1"
            aria-label={`View details for ${project_name}`}
          >
            View Details
            <svg
              className="w-4 h-4 text-[#04a09c] transition-transform duration-300 group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {/* Subtle Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#04a09c] via-[#22d6d1] to-[#04a09c] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}

export default ProjectCard;