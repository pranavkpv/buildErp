import { getStage } from "../../../api/Sitemanager/stageStatus";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type imageProp = {
  imageEnable: boolean;
  setImageEnable: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
};

function ProjectImage({ imageEnable, setImageEnable, projectId }: imageProp) {
    if (!imageEnable) return null;
  const [stage, setStage] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const fetchStage = async (): Promise<void> => {
      const response = await getStage(projectId);
      if (response.data.success) {
        let x = [];
        for (let element of response.data.message) {
          for (let item of element.stage_image) {
            for (let char of item.image) {
              x.push({ date: item.date, image: char });
            }
          }
        }
        setStage(x);
        
      } else {
        toast.error(response.message);
      }
  };

  useEffect(() => {
    fetchStage();
  }, [projectId]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full relative shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.01]">
        <button
          title="Close"
          onClick={() => setImageEnable(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
              {stage[count]?.date}
            </p>
          </div>
          <div className="relative w-full h-[32rem] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={stage[count]?.image}
              alt="Project Image"
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex justify-between items-center mt-4 gap-4">
            <button
              onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
              disabled={count === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg disabled:from-gray-400 disabled:to-gray-400 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform disabled:cursor-not-allowed disabled:transform-none hover:-translate-y-0.5 shadow-md"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500 font-medium">
              {count + 1} / {stage.length}
            </span>
            <button
              onClick={() => setCount((prev) => Math.min(prev + 1, stage.length - 1))}
              disabled={count === stage.length - 1}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg disabled:from-gray-400 disabled:to-gray-400 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform disabled:cursor-not-allowed disabled:transform-none hover:-translate-y-0.5 shadow-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectImage;