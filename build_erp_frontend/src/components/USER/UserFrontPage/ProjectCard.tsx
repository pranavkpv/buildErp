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
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-gradient-to-r from-amber-500 to-orange-500",
          badge: "bg-amber-100 text-amber-700",
          glow: "shadow-amber-400/20",
        };
      case "processing":
        return {
          bg: "bg-gradient-to-r from-blue-600 to-emerald-600",
          badge: "bg-blue-100 text-blue-700",
          glow: "shadow-blue-400/20",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-emerald-500 to-blue-500",
          badge: "bg-emerald-100 text-emerald-700",
          glow: "shadow-emerald-400/20",
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="group relative w-full max-w-sm mx-auto">
      {/* Background Glow */}
      <div className={`absolute -inset-1 ${statusConfig.bg} rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

      <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-500 hover:-translate-y-1 flex flex-col h-[28rem]">
        {/* Image Container */}
        <div className="relative overflow-hidden h-48">
          <img
            src={expected_image}
            alt={project_name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Status Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.badge}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          {/* Project Name */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {project_name}
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 mb-3 group-hover:w-16 transition-all duration-300"></div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-gray-600 mb-3">
            <svg className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm line-clamp-2">{address}</p>
          </div>

          {/* Area */}
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">
              {area.toLocaleString()} sqft
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-3 flex-grow mb-3">
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
              latitude,
              longitude,
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`View details for ${project_name}`}
          >
            View Details
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;