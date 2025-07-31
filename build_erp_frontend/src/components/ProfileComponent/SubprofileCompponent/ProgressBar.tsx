import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"
import { getStage } from "../../../api/Sitemanager/stageStatus"

type progressProp = {
  progressEnable: boolean
  projectId: string
}

type StageData = {
  _id: string;
  stage_name: string;
  start_date: string;
  end_date: string;
  stage_amount: number;
  progress: number;
  status_date: string;
};

function ProgressBar({ progressEnable, projectId }: progressProp) {
  if (!progressEnable) return null

  const [stage, setStage] = useState<StageData[]>([]);


  const fetchStage = async (): Promise<void> => {
    const response = await getStage(projectId);
    if (response.success) {
      setStage(response.message);
    }
  };

  const calculateProjectProgress = () => {
    if (stage.length > 0) {
      const totalProgress = stage.reduce((sum, num) => sum += num.progress, 0) || 0
      return (totalProgress / (stage.length * 100)) * 100
    }
    return 0

  }

  useEffect(() => {
    fetchStage()
  }, [progressEnable])
  return (
    <>
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h4>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className={`bg-blue-600 h-4 rounded-full transition-all duration-300 w-[${ calculateProjectProgress() }%]`}
          />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Overall Progress: {calculateProjectProgress()}%
        </p>
        <div className="space-y-4">
          {stage.map((element, index) => (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <p className="text-gray-700 font-medium">{element.stage_name}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {element.start_date} - {element.end_date}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className={`bg-blue-600 h-2.5 rounded-full transition-all duration-300 w-[${ element.progress }%]`}
                  />

                </div>
                <p className="text-sm text-gray-600 mt-1">Progress: {element.progress}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProgressBar