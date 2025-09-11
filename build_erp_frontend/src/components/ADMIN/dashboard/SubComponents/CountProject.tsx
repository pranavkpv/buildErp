import { getAllProjectInUserSideApi } from "../../../../api/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface project {
   status: string;
   count: number;
}
type projectData = {
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
};

function CountProject() {
   const [project, setProject] = useState<project[]>([]);
   const [allProjects, setAllProjects] = useState<projectData[]>([])


   const navigate = useNavigate()

   const fetchProjectAndItsStatus = async () => {
      const response = await getAllProjectInUserSideApi();

      if (response.success) {
         setAllProjects(response.data)
         let map = [
            { status: "processing", count: 0 },
            { status: "pending", count: 0 },
            { status: "completed", count: 0 }
         ];
         for (let element of response.data) {
            for (let item of map) {
               if (element.status === item.status) {
                  item.count += 1;
                  break;
               }
            }
         }
         setProject(map);
      } else {
         toast.error(response.message);
      }
   };

   useEffect(() => {
      fetchProjectAndItsStatus();
   }, []);

   const handleBoxClick = (status: string) => {
      let statusBaseProjects = allProjects.filter((element) => element.status == status)
      navigate('/admin/ProjectList',{state:statusBaseProjects})
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {project.map((element) => (
            <div
               key={element.status}
               className="bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-slate-700 hover:border-blue-500"
               onClick={() => handleBoxClick(element.status)}
            >
               <h1 className="text-xl font-semibold text-white capitalize">
                  {element.status} Projects
               </h1>
               <p className="text-3xl font-bold text-blue-400 mt-2">
                  {element.count}
               </p>
            </div>
         ))}
      </div>
   );
}

export default CountProject;