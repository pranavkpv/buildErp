

type projectProp={
  _id:string
   project_name:string
   expected_image:string
   finalImage:string
   area:number
   address:string
}

function ProjectCard({_id,project_name,expected_image,finalImage,area,address}:projectProp) {
 
  return (
    <div className="rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 border">
      <img src={expected_image} alt={project_name} className="w-full h-56 object-cover" />
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold">{project_name}</h3>
        <p className="text-sm text-gray-500">{address}</p>
        <p className="text-xs mt-2 text-teal-600">AREA: {area}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
