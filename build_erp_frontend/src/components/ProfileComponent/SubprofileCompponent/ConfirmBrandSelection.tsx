import React, { useContext, useEffect, useState } from 'react';
import { X, Layers, Box, Check, ChevronLeft, ChevronRight, Ban } from 'lucide-react';
import RequirementContext from '../../../Context/RequirementContext';
import { toast } from 'react-toastify';
import { getMaterialsBySpecs } from '../../../api/Specification';
import { saveRequirement } from '../../../api/requirement';

// ProjectData type remains preserved to match parent module schemas
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
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

interface MaterialData {
  material_name: string;
  brand_name: string[];
}

interface BrandSelection {
  [material_name: string]: string;
}

function ConfirmBrandSelection({ confirmEnable, setConfirmEnable, projectId, setIsSubmitted }: Prop) {
  const { spec_id, setMaterialDetails } = useContext(RequirementContext);
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
          setConfirmEnable(false);
          setTimeout(() => {
            setIsSubmitted(false)
          }, 3000)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white">
      <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Structural Orange Architectural Ribbon Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" />

        {/* Exit Window Button Anchor */}
        <button
          onClick={() => setConfirmEnable(false)}
          aria-label="Close brand selection modal"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Title Grid */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Material Specifications Setup
              </h2>
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Assign structural component brand targets
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-48 gap-3">
              <div className="animate-spin rounded-full h-7 w-7 border-2 border-slate-800 border-t-orange-500"></div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Compiling Indices...</span>
            </div>
          ) : (
            <>
              {materials.length > 0 && (
                <div className="flex justify-between items-center mb-4 bg-slate-950 p-2.5 px-3 rounded-xl border border-slate-850">
                  <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-orange-500" />
                    Asset Frame {currentMaterialIndex + 1} <span className="text-slate-600">/</span> {materials.length}
                  </p>
                  <button
                    onClick={handleSelectDefault}
                    className="text-orange-500 hover:text-orange-400 text-[10px] font-mono font-black uppercase tracking-widest transition-colors bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/10"
                    aria-label="Select default brands for remaining materials"
                  >
                    Auto Fill Rest
                  </button>
                </div>
              )}

              {materials.length > 0 ? (
                <div className="space-y-4">
                  {/* Current Active Material Headline label */}
                  <h3 className="text-sm font-black text-white uppercase font-mono tracking-wide bg-slate-950 p-3 rounded-xl border border-slate-850">
                    <span className="text-slate-500 text-[11px] font-normal block mb-0.5 uppercase tracking-wider">Active Group Parameter</span>
                    {materials[currentMaterialIndex].material_name}
                  </h3>

                  {/* Brand Iteration Matrix Selection */}
                  <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
                    {materials[currentMaterialIndex].brand_name.map((brand) => {
                      const isSelected = selectedBrands[materials[currentMaterialIndex].material_name] === brand;
                      return (
                        <div
                          key={brand}
                          className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500/5 shadow-inner'
                              : 'border-slate-800/60 bg-slate-950/40 hover:bg-slate-950/80 hover:border-slate-800'
                          }`}
                          onClick={() => handleBrandSelect(materials[currentMaterialIndex].material_name, brand)}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'border-orange-500 bg-orange-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                          </div>
                          
                          <input
                            type="radio"
                            id={`${materials[currentMaterialIndex].material_name}-${brand}`}
                            name={materials[currentMaterialIndex].material_name}
                            value={brand}
                            checked={isSelected}
                            onChange={() => {}} // Controlled click handoff goes to container div wrapper
                            className="sr-only"
                          />
                          
                          <label
                            htmlFor={`${materials[currentMaterialIndex].material_name}-${brand}`}
                            className={`text-xs font-bold uppercase tracking-wide cursor-pointer flex-1 select-none transition-colors ${
                              isSelected ? 'text-white' : 'text-slate-400'
                            }`}
                          >
                            {brand}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-500">
                  <Ban className="w-8 h-8 text-slate-700" />
                  <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-600">
                    No matching material metrics evaluated.
                  </p>
                </div>
              )}

              {/* Interface Pagination Deck and Controls */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-4 border-t border-slate-800 justify-between">
                <button
                  onClick={handlePrevious}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:text-slate-700 disabled:border-transparent disabled:bg-transparent rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                  disabled={currentMaterialIndex === 0}
                  aria-label="Previous material"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev Spec
                </button>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setConfirmEnable(false)}
                    className="w-full sm:w-auto px-5 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                    aria-label="Cancel brand selection"
                  >
                    Abort Setup
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-5 py-2 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                    disabled={
                      (!selectedBrands[materials[currentMaterialIndex]?.material_name] && materials.length > 0) ||
                      (currentMaterialIndex === materials.length - 1 &&
                        Object.keys(selectedBrands).length < materials.length)
                    }
                    aria-label={currentMaterialIndex === materials.length - 1 ? 'Submit brand selection' : 'Next material'}
                  >
                    {currentMaterialIndex === materials.length - 1 ? 'Commit Log' : (
                      <>Next Spec <ChevronRight className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmBrandSelection;