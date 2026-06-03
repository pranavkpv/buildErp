import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchBrandCorrespondingMaterial, fetchUniqueMaterial, fetchUnitCorrespondingMaterial, fetchUnitRate } from "../../../api/Admin/material";
import AppContext from "../../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
function AddSpecMaterial() {
    const { AddMaterialEnable, setAddMaterialEnable, setAddLabourEnable, setMaterialDetails } = useContext(AppContext);
    if (!AddMaterialEnable)
        return null;
    const [material, setMaterial] = useState([]);
    const [row, setRow] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const fetchMaterial = async () => {
        const materialList = await fetchUniqueMaterial();
        setMaterial(materialList.data);
    };
    useEffect(() => {
        fetchMaterial();
    }, []);
    const checkForDuplicate = (idx, newMaterial, newBrand, newUnit) => {
        return row.some((item, i) => {
            if (i === idx)
                return false; // Skip the current row
            return (item.material_name === newMaterial &&
                item.brand_name === newBrand &&
                item.unit_name === newUnit &&
                newMaterial !== "" &&
                newBrand !== "" &&
                newUnit !== "");
        });
    };
    const giveBrandAndUnit = async (materialValue, idx) => {
        // Check for duplicate material before updating
        if (materialValue && row[idx].brand_name && row[idx].unit_name) {
            const isDuplicate = checkForDuplicate(idx, materialValue, row[idx].brand_name, row[idx].unit_name);
            if (isDuplicate) {
                setPopupMessage(`The combination of ${materialValue}, ${row[idx].brand_name}, and ${row[idx].unit_name} is already added.`);
                setShowPopup(true);
                const newRow = [...row];
                newRow[idx].material_name = "";
                newRow[idx].brands = [];
                newRow[idx].units = [];
                setRow(newRow);
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[idx];
                    return newErrors;
                });
                return;
            }
        }
        const brandData = await fetchBrandCorrespondingMaterial(materialValue);
        console.log(brandData);
        const unitData = await fetchUnitCorrespondingMaterial(materialValue);
        const newRow = [...row];
        newRow[idx] = {
            ...newRow[idx],
            material_name: materialValue,
            brand_name: "",
            unit_name: "",
            unit_rate: 0,
            material_id: "",
            brands: brandData.data || [],
            units: unitData.data || [],
        };
        setRow(newRow);
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[idx];
            return newErrors;
        });
    };
    const unitRateFetch = async (index) => {
        const { material_name, brand_name, unit_name } = row[index];
        if (!material_name || !brand_name || !unit_name)
            return;
        // Check for duplicate before fetching unit rate
        const isDuplicate = checkForDuplicate(index, material_name, brand_name, unit_name);
        if (isDuplicate) {
            setPopupMessage(`The combination of ${material_name}, ${brand_name}, and ${unit_name} is already added.`);
            setShowPopup(true);
            const newRow = [...row];
            newRow[index].unit_name = "";
            newRow[index].unit_rate = 0;
            newRow[index].material_id = "";
            setRow(newRow);
            return;
        }
        try {
            const response = await fetchUnitRate(material_name, unit_name, brand_name);
            const newRow = [...row];
            newRow[index].unit_rate = response.data.unit_rate || 0;
            newRow[index].material_id = response.data.material_id || "";
            setRow(newRow);
        }
        catch (error) {
            console.error("Error fetching unit rate:", error);
        }
    };
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        row.forEach((element, idx) => {
            const rowErrors = {};
            if (!element.material_name) {
                rowErrors.material_name = "Material is required";
                isValid = false;
            }
            if (!element.brand_name) {
                rowErrors.brand_name = "Brand is required";
                isValid = false;
            }
            if (!element.unit_name) {
                rowErrors.unit_name = "Unit is required";
                isValid = false;
            }
            if (!element.quantity || element.quantity <= 0) {
                rowErrors.quantity = "Quantity must be greater than 0";
                isValid = false;
            }
            if (Object.keys(rowErrors).length > 0) {
                newErrors[idx] = rowErrors;
            }
        });
        setErrors(newErrors);
        return isValid;
    };
    const handleNext = () => {
        if (validateForm()) {
            setAddMaterialEnable(false);
            setAddLabourEnable(true);
            const x = row.map((element) => ({
                material_id: element.material_id,
                quantity: element.quantity,
                unit_rate: element.unit_rate,
            }));
            setMaterialDetails(x);
        }
    };
    const calculateNetAmount = () => {
        return row.reduce((sum, item) => sum + (item.quantity * item.unit_rate), 0).toFixed(2);
    };
    return (_jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-6xl w-full mx-4 shadow-2xl", children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-100 mb-6", children: "Add Material Details" }), showPopup && (_jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700/50 shadow-xl", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-100 mb-4", children: "Duplicate Material" }), _jsx("p", { className: "text-gray-300 text-sm mb-6", children: popupMessage }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: () => setShowPopup(false), className: "px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm", children: "OK" }) })] }) })), _jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "SL No" }), _jsx("th", { className: "px-6 py-4", children: "Material Name" }), _jsx("th", { className: "px-6 py-4", children: "Brand Name" }), _jsx("th", { className: "px-6 py-4", children: "Unit Name" }), _jsx("th", { className: "px-6 py-4", children: "Quantity" }), _jsx("th", { className: "px-6 py-4", children: "Unit Rate" }), _jsx("th", { className: "px-6 py-4", children: "Total" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: row.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-12 text-gray-400 text-sm font-medium", children: "No materials added. Click \"Add Material\" to start." }) })) : (row.map((element, idx) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200", children: element.sl }), _jsxs("td", { className: "px-6 py-4", children: [_jsxs("select", { "aria-label": "Select material", value: element.material_name, onChange: (e) => giveBrandAndUnit(e.target.value, idx), className: `w-full px-4 py-2 bg-gray-800/50 border ${errors[idx]?.material_name ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`, children: [_jsx("option", { value: "", className: "text-gray-400", children: "Select Material" }), material.map((mat) => (_jsx("option", { value: mat, className: "text-gray-100", children: mat }, mat)))] }), errors[idx]?.material_name && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors[idx].material_name }))] }), _jsxs("td", { className: "px-6 py-4", children: [_jsxs("select", { "aria-label": "Select brand", value: element.brand_name, onChange: (e) => {
                                                        const newRow = [...row];
                                                        const newBrand = e.target.value;
                                                        if (newRow[idx].material_name && newBrand && newRow[idx].unit_name) {
                                                            const isDuplicate = checkForDuplicate(idx, newRow[idx].material_name, newBrand, newRow[idx].unit_name);
                                                            if (isDuplicate) {
                                                                setPopupMessage(`The combination of ${newRow[idx].material_name}, ${newBrand}, and ${newRow[idx].unit_name} is already added.`);
                                                                setShowPopup(true);
                                                                newRow[idx].brand_name = "";
                                                                newRow[idx].unit_name = "";
                                                                newRow[idx].unit_rate = 0;
                                                                newRow[idx].material_id = "";
                                                                setRow(newRow);
                                                                return;
                                                            }
                                                        }
                                                        newRow[idx].brand_name = newBrand;
                                                        newRow[idx].unit_name = "";
                                                        newRow[idx].unit_rate = 0;
                                                        newRow[idx].material_id = "";
                                                        setRow(newRow);
                                                        unitRateFetch(idx);
                                                    }, className: `w-full px-4 py-2 bg-gray-800/50 border ${errors[idx]?.brand_name ? "border-red-500" : "border-gray-600"} rounde
d-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`, children: [_jsx("option", { value: "", className: "text-gray-400", children: "Select Brand" }), element.brands.map((br) => (_jsx("option", { value: br, className: "text-gray-100", children: br }, br)))] }), errors[idx]?.brand_name && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors[idx].brand_name }))] }), _jsxs("td", { className: "px-6 py-4", children: [_jsxs("select", { "aria-label": "Select unit", value: element.unit_name, onChange: (e) => {
                                                        const newRow = [...row];
                                                        const newUnit = e.target.value;
                                                        if (newRow[idx].material_name && newRow[idx].brand_name && newUnit) {
                                                            const isDuplicate = checkForDuplicate(idx, newRow[idx].material_name, newRow[idx].brand_name, newUnit);
                                                            if (isDuplicate) {
                                                                setPopupMessage(`The combination of ${newRow[idx].material_name}, ${newRow[idx].brand_name}, and ${newUnit} is already added.`);
                                                                setShowPopup(true);
                                                                newRow[idx].unit_name = "";
                                                                newRow[idx].unit_rate = 0;
                                                                newRow[idx].material_id = "";
                                                                setRow(newRow);
                                                                return;
                                                            }
                                                        }
                                                        newRow[idx].unit_name = newUnit;
                                                        setRow(newRow);
                                                        unitRateFetch(idx);
                                                    }, className: `w-full px-4 py-2 bg-gray-800/50 border ${errors[idx]?.unit_name ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`, children: [_jsx("option", { value: "", className: "text-gray-400", children: "Select Unit" }), element.units.map((un) => (_jsx("option", { value: un, className: "text-gray-100", children: un }, un)))] }), errors[idx]?.unit_name && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors[idx].unit_name }))] }), _jsxs("td", { className: "px-6 py-4", children: [_jsx("input", { type: "number", value: element.quantity || "", placeholder: "Quantity", onChange: (e) => {
                                                        const newRow = [...row];
                                                        newRow[idx].quantity = Number(e.target.value);
                                                        setRow(newRow);
                                                    }, className: `w-full px-4 py-2 bg-gray-800/50 border ${errors[idx]?.quantity ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium` }), errors[idx]?.quantity && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors[idx].quantity }))] }), _jsx("td", { className: "px-6 py-4", children: _jsx("input", { type: "number", value: element.unit_rate || "", placeholder: "Unit Rate", readOnly: true, className: "w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm font-medium" }) }), _jsx("td", { className: "px-6 py-4 text-gray-200", children: (element.quantity * element.unit_rate).toFixed(2) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("button", { onClick: () => {
                                                    const newRow = row.filter((_, i) => i !== idx);
                                                    setRow(newRow.map((item, i) => ({ ...item, sl: i + 1 })));
                                                    setErrors({});
                                                }, className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Delete material ${element.material_name || "row"}`, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }) })] }, element.sl)))) })] }) }), row.length > 0 && (_jsx("div", { className: "mt-4 text-right", children: _jsxs("p", { className: "text-gray-200 text-sm font-semibold", children: ["Net Amount: ", _jsxs("span", { className: "text-teal-400", children: ["\u20B9", calculateNetAmount()] })] }) })), _jsxs("div", { className: "flex justify-between mt-6 gap-3", children: [_jsx("button", { onClick: () => {
                                const newRow = [...row, { sl: row.length + 1, material_name: "", brand_name: "", unit_name: "", unit_rate: 0, material_id: "", quantity: 0, brands: [], units: [] }];
                                setRow(newRow);
                            }, className: "px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm", children: "+ Add Material" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setAddMaterialEnable(false), className: "px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm", children: "Cancel" }), _jsx("button", { onClick: handleNext, className: "px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm", children: "Next" })] })] })] }) }));
}
export default AddSpecMaterial;
