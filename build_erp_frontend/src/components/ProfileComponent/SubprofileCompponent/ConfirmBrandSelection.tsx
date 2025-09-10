import React, { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import RequirementContext from '../../../Context/RequirementContext';
import { toast } from 'react-toastify';
import { getMaterialsBySpecs } from '../../../api/Specification';
import { saveRequirement } from '../../../api/requirement';

type ProjectData = {
  _id: string;
  project_name: string;
  address: string;
  area: number;
  description: string;
  expected_image: string;
  budgeted_cost: number;
  status: "pending" | "processing" | "completed";
  estimateBy: string | null;
  estimateStatus: boolean;
  start_date: string;
  end_date: string;
};

interface Prop {
  confirmEnable: boolean;
  setConfirmEnable: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  onSuccess: (updatedProject: ProjectData) => void;
}

interface MaterialData {
  material_name: string;
  brand_name: string[];
}

interface BrandSelection {
  [material_name: string]: string;
}

function ConfirmBrandSelection({ confirmEnable, setConfirmEnable, projectId, onSuccess }: Prop) {
  const { spec_id, materialDetails, setMaterialDetails } = useContext(RequirementContext);
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<BrandSelection>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const response = await getMaterialsBySpecs(spec_id);
      if (response.success) {
        setMaterials(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch materials.");
      console.error("Error fetching materials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (confirmEnable) {
      fetchMaterials();
    }
  }, [confirmEnable]);

  const handleBrandSelect = (materialName: string, brand: string) => {
    setSelectedBrands((prev) => ({
      ...prev,
      [materialName]: brand,
    }));
  };

  const handleSelectDefault = () => {
    const updatedBrands = { ...selectedBrands };
    materials.forEach((material, index) => {
      if (!updatedBrands[material.material_name] && index >= currentMaterialIndex) {
        updatedBrands[material.material_name] = material.brand_name[0] || "";
      }
    });
    setSelectedBrands(updatedBrands);
  };

  const handleNext = async () => {
    if (currentMaterialIndex < materials.length - 1) {
      setCurrentMaterialIndex(currentMaterialIndex + 1);
    } else {
      setIsLoading(true);
      try {
        const materialBrands = Object.entries(selectedBrands).map(([material_name, brand_name]) => ({
          material_name,
          brand_name,
        }));
        setMaterialDetails(materialBrands);
        const response = await saveRequirement({ materialDetails: materialBrands, spec_id, projectId });
        if (response.success) {
          toast.success(response.message);
          onSuccess(response.data);
          setConfirmEnable(false);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to save requirements.");
        console.error("Error saving requirements:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentMaterialIndex > 0) {
      setCurrentMaterialIndex(currentMaterialIndex - 1);
    }
  };

  if (!confirmEnable) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative max-w-lg w-full mx-4 bg-white rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 scale-100">
        <button
          onClick={() => setConfirmEnable(false)}
          aria-label="Close brand selection modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 tracking-tight">
          Select Material Brands
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {materials.length > 0 && (
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 text-sm sm:text-base">
                  Material {currentMaterialIndex + 1} of {materials.length}
                </p>
                <button
                  onClick={handleSelectDefault}
                  className="text-indigo-600 hover:text-indigo-700 text-sm sm:text-base font-medium transition-colors duration-200"
                  aria-label="Select default brands for remaining materials"
                >
                  Select Default
                </button>
              </div>
            )}
            {materials.length > 0 ? (
              <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {materials[currentMaterialIndex].material_name}
                </h3>
                <div className="flex flex-col gap-3">
                  {materials[currentMaterialIndex].brand_name.map((brand) => (
                    <div
                      key={brand}
                      className={`flex items-center gap-3 p-3 border rounded-lg transition-colors duration-200 ${
                        selectedBrands[materials[currentMaterialIndex].material_name] === brand
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        id={`${materials[currentMaterialIndex].material_name}-${brand}`}
                        name={materials[currentMaterialIndex].material_name}
                        value={brand}
                        checked={selectedBrands[materials[currentMaterialIndex].material_name] === brand}
                        onChange={() => handleBrandSelect(materials[currentMaterialIndex].material_name, brand)}
                        className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                      />
                      <label
                        htmlFor={`${materials[currentMaterialIndex].material_name}-${brand}`}
                        className="text-gray-700 text-base sm:text-lg font-medium cursor-pointer flex-1"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center text-base sm:text-lg font-medium">
                No materials available.
              </p>
            )}
            <div className="flex gap-4 mt-6 justify-between">
              <button
                onClick={handlePrevious}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={currentMaterialIndex === 0}
                aria-label="Previous material"
              >
                Previous
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setConfirmEnable(false)}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base font-medium"
                  aria-label="Cancel brand selection"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 text-sm sm:text-base font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={
                    (!selectedBrands[materials[currentMaterialIndex]?.material_name] && materials.length > 0) ||
                    (currentMaterialIndex === materials.length - 1 &&
                      Object.keys(selectedBrands).length < materials.length)
                  }
                  aria-label={currentMaterialIndex === materials.length - 1 ? 'Submit brand selection' : 'Next material'}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white inline-block"></div>
                  ) : currentMaterialIndex === materials.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ConfirmBrandSelection;