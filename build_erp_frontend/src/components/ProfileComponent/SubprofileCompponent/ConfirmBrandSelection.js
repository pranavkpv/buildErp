import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useContext, useEffect, useState } from 'react';
import { X, Layers, Box, Check, ChevronLeft, ChevronRight, Ban } from 'lucide-react';
import RequirementContext from '../../../Context/RequirementContext';
import { toast } from 'react-toastify';
import { getMaterialsBySpecs } from '../../../api/Specification';
import { saveRequirement } from '../../../api/requirement';
function ConfirmBrandSelection({ confirmEnable, setConfirmEnable, projectId, setIsSubmitted }) {
    const { spec_id, setMaterialDetails } = useContext(RequirementContext);
    const [materials, setMaterials] = useState([]);
    const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
    const [selectedBrands, setSelectedBrands] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fetchMaterials = async () => {
        setIsLoading(true);
        try {
            const response = await getMaterialsBySpecs(spec_id);
            if (response.success) {
                setMaterials(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch materials.");
            console.error("Error fetching materials:", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (confirmEnable) {
            fetchMaterials();
        }
    }, [confirmEnable]);
    const handleBrandSelect = (materialName, brand) => {
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
        }
        else {
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
                        setIsSubmitted(false);
                    }, 3000);
                }
                else {
                    toast.error(response.message);
                }
            }
            catch (error) {
                toast.error("Failed to save requirements.");
                console.error("Error saving requirements:", error);
            }
            finally {
                setIsLoading(false);
            }
        }
    };
    const handlePrevious = () => {
        if (currentMaterialIndex > 0) {
            setCurrentMaterialIndex(currentMaterialIndex - 1);
        }
    };
    if (!confirmEnable)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" }), _jsx("button", { onClick: () => setConfirmEnable(false), "aria-label": "Close brand selection modal", className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-800", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(Layers, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-black text-white uppercase tracking-wider", children: "Material Specifications Setup" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "Assign structural component brand targets" })] })] }), isLoading ? (_jsxs("div", { className: "flex flex-col justify-center items-center h-48 gap-3", children: [_jsx("div", { className: "animate-spin rounded-full h-7 w-7 border-2 border-slate-800 border-t-orange-500" }), _jsx("span", { className: "text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest", children: "Compiling Indices..." })] })) : (_jsxs(_Fragment, { children: [materials.length > 0 && (_jsxs("div", { className: "flex justify-between items-center mb-4 bg-slate-950 p-2.5 px-3 rounded-xl border border-slate-850", children: [_jsxs("p", { className: "text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5", children: [_jsx(Box, { className: "w-3.5 h-3.5 text-orange-500" }), "Asset Frame ", currentMaterialIndex + 1, " ", _jsx("span", { className: "text-slate-600", children: "/" }), " ", materials.length] }), _jsx("button", { onClick: handleSelectDefault, className: "text-orange-500 hover:text-orange-400 text-[10px] font-mono font-black uppercase tracking-widest transition-colors bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/10", "aria-label": "Select default brands for remaining materials", children: "Auto Fill Rest" })] })), materials.length > 0 ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-sm font-black text-white uppercase font-mono tracking-wide bg-slate-950 p-3 rounded-xl border border-slate-850", children: [_jsx("span", { className: "text-slate-500 text-[11px] font-normal block mb-0.5 uppercase tracking-wider", children: "Active Group Parameter" }), materials[currentMaterialIndex].material_name] }), _jsx("div", { className: "flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar", children: materials[currentMaterialIndex].brand_name.map((brand) => {
                                                const isSelected = selectedBrands[materials[currentMaterialIndex].material_name] === brand;
                                                return (_jsxs("div", { className: `flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-150 ${isSelected
                                                        ? 'border-orange-500 bg-orange-500/5 shadow-inner'
                                                        : 'border-slate-800/60 bg-slate-950/40 hover:bg-slate-950/80 hover:border-slate-800'}`, onClick: () => handleBrandSelect(materials[currentMaterialIndex].material_name, brand), children: [_jsx("div", { className: `w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-orange-500 bg-orange-500 text-slate-950' : 'border-slate-700 bg-slate-900'}`, children: isSelected && _jsx(Check, { className: "w-2.5 h-2.5 stroke-[4]" }) }), _jsx("input", { type: "radio", id: `${materials[currentMaterialIndex].material_name}-${brand}`, name: materials[currentMaterialIndex].material_name, value: brand, checked: isSelected, onChange: () => { }, className: "sr-only" }), _jsx("label", { htmlFor: `${materials[currentMaterialIndex].material_name}-${brand}`, className: `text-xs font-bold uppercase tracking-wide cursor-pointer flex-1 select-none transition-colors ${isSelected ? 'text-white' : 'text-slate-400'}`, children: brand })] }, brand));
                                            }) })] })) : (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 gap-3 text-slate-500", children: [_jsx(Ban, { className: "w-8 h-8 text-slate-700" }), _jsx("p", { className: "text-xs font-mono font-bold uppercase tracking-widest text-slate-600", children: "No matching material metrics evaluated." })] })), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-8 pt-4 border-t border-slate-800 justify-between", children: [_jsxs("button", { onClick: handlePrevious, className: "w-full sm:w-auto px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:text-slate-700 disabled:border-transparent disabled:bg-transparent rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1", disabled: currentMaterialIndex === 0, "aria-label": "Previous material", children: [_jsx(ChevronLeft, { className: "w-3.5 h-3.5" }), " Prev Spec"] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [_jsx("button", { onClick: () => setConfirmEnable(false), className: "w-full sm:w-auto px-5 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors", "aria-label": "Cancel brand selection", children: "Abort Setup" }), _jsx("button", { onClick: handleNext, className: "w-full sm:w-auto px-5 py-2 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-1", disabled: (!selectedBrands[materials[currentMaterialIndex]?.material_name] && materials.length > 0) ||
                                                        (currentMaterialIndex === materials.length - 1 &&
                                                            Object.keys(selectedBrands).length < materials.length), "aria-label": currentMaterialIndex === materials.length - 1 ? 'Submit brand selection' : 'Next material', children: currentMaterialIndex === materials.length - 1 ? 'Commit Log' : (_jsxs(_Fragment, { children: ["Next Spec ", _jsx(ChevronRight, { className: "w-3.5 h-3.5" })] })) })] })] })] }))] })] }) }));
}
export default ConfirmBrandSelection;
