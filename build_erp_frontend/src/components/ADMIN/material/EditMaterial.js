import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { editMaterialData, getaddMaterial, UpdateMaterialAPI } from "../../../api/Admin/material";
import Loading from "../../../components/Loading";
function EditMaterial({ setEditEnable, editEnable, setEditId, editId, refreshData }) {
    if (!editEnable)
        return null;
    const [categoryList, selectCategoryList] = useState([]);
    const [brandList, setBrandlist] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [projectList, setProjectlist] = useState([]);
    // Edit data state
    const [materialName, setMaterial] = useState("");
    const [selectCategoryId, setSelectCategory] = useState("");
    const [selectBrandId, setSelectedBrand] = useState("");
    const [selectUnitId, setSelectedUnit] = useState("");
    const [unit_rate, setUnitRate] = useState(0);
    const [totalOpeningStock, setTotalStock] = useState(0);
    const [row, SetRow] = useState([]);
    // Refs for validation messages
    const materialNameRef = useRef(null);
    const unitRef = useRef(null);
    const categoryRef = useRef(null);
    const brandRef = useRef(null);
    const unitRateRef = useRef(null);
    const [loadOn, setLoadOn] = useState(false);
    const addRow = () => {
        SetRow([...row, { project: "", stock: 0 }]);
    };
    const deletRow = (index) => {
        let updateRow = row.filter((_, i) => i !== index);
        SetRow(updateRow);
    };
    const fetchData = async () => {
        const data = await getaddMaterial();
        const editData = await editMaterialData(editId);
        // Set dropdown data
        selectCategoryList(data.data.categoryData);
        setBrandlist(data.data.brandData);
        setUnitList(data.data.unitData);
        setProjectlist(data.data.projectData || []);
        // Set edit data
        setMaterial(editData.data.materialData.material_name);
        setSelectCategory(editData.data.materialData.category_id);
        setSelectedBrand(editData.data.materialData.brand_id);
        setSelectedUnit(editData.data.materialData.unit_id);
        setUnitRate(editData.data.materialData.unit_rate);
        setTotalStock(editData.data.materialData.stock);
        // Transform project stock data to match addRowData format
        const transformedProjectData = editData.data.projectStockData.map((item) => ({
            project: item.project_id,
            stock: Number(item.stock),
            _id: item._id,
        }));
        SetRow(transformedProjectData);
    };
    useEffect(() => {
        fetchData();
    }, [editId]);
    const existproject = (project, currentIndex) => {
        for (let i = 0; i < row.length; i++) {
            if (i !== currentIndex && row[i].project === project) {
                toast.warning("Project already assigned to another row.");
                return true;
            }
        }
        return false;
    };
    const stockCheck = (data) => {
        let sum = data.reduce((acc, current) => acc + current.stock, 0);
        if (sum > totalOpeningStock) {
            toast.warning("Total allocated stock exceeds total opening stock.");
            return true;
        }
        return false;
    };
    const updateMaterial = async () => {
        let hasError = false;
        // Clear previous error messages
        if (materialNameRef.current)
            materialNameRef.current.innerText = "";
        if (unitRef.current)
            unitRef.current.innerText = "";
        if (categoryRef.current)
            categoryRef.current.innerText = "";
        if (brandRef.current)
            brandRef.current.innerText = "";
        if (unitRateRef.current)
            unitRateRef.current.innerText = "";
        // Client-side validations
        if (materialName.trim() === "") {
            if (materialNameRef.current)
                materialNameRef.current.innerText = "Material name is required.";
            hasError = true;
        }
        if (selectUnitId === "") {
            if (unitRef.current)
                unitRef.current.innerText = "Unit is required.";
            hasError = true;
        }
        if (selectCategoryId === "") {
            if (categoryRef.current)
                categoryRef.current.innerText = "Category is required.";
            hasError = true;
        }
        if (selectBrandId === "") {
            if (brandRef.current)
                brandRef.current.innerText = "Brand is required.";
            hasError = true;
        }
        if (unit_rate <= 0) {
            if (unitRateRef.current)
                unitRateRef.current.innerText = "Unit rate must be greater than 0.";
            hasError = true;
        }
        let sumStock = row.reduce((sum, num) => sum + num.stock, 0);
        if (sumStock !== totalOpeningStock) {
            toast.warning("The sum of project-wise stock does not match the total opening stock.");
            hasError = true;
        }
        if (row.some((element) => element.project === "")) {
            toast.warning("Please select a project for all added rows.");
            hasError = true;
        }
        if (row.some((element) => element.stock <= 0)) {
            toast.warning("Stock for each project must be greater than 0.");
            hasError = true;
        }
        if (hasError)
            return;
        try {
            setLoadOn(true);
            const response = await UpdateMaterialAPI({
                _id: editId,
                material_name: materialName,
                category_id: selectCategoryId,
                brand_id: selectBrandId,
                unit_id: selectUnitId,
                unit_rate,
                stock: totalOpeningStock,
                projectWiseStock: row,
            });
            setLoadOn(false);
            if (response.success) {
                toast.success(response.message);
                setEditEnable(false);
                setEditId("");
                refreshData();
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (error) {
            setLoadOn(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6", children: _jsxs("div", { className: "relative bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-gray-700/50", children: [_jsx("h1", { className: "text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4", children: "Edit Material" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "materialName", className: "block text-sm font-medium text-gray-200 mb-1", children: "Material Name" }), _jsx("input", { id: "materialName", type: "text", placeholder: "Enter material name", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => setMaterial(e.target.value), value: materialName, disabled: loadOn }), _jsx("p", { ref: materialNameRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "categorySelect", className: "block text-sm font-medium text-gray-200 mb-1", children: "Category" }), _jsxs("select", { id: "categorySelect", "aria-label": "Select a category", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => setSelectCategory(e.target.value), value: selectCategoryId, disabled: loadOn, children: [_jsx("option", { value: "", children: "Select Category" }), categoryList.map((cat) => (_jsx("option", { value: cat._id, children: cat.category_name }, cat._id)))] }), _jsx("p", { ref: categoryRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "brandSelect", className: "block text-sm font-medium text-gray-200 mb-1", children: "Brand" }), _jsxs("select", { id: "brandSelect", "aria-label": "Select a brand", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => setSelectedBrand(e.target.value), value: selectBrandId, disabled: loadOn, children: [_jsx("option", { value: "", children: "Select Brand" }), brandList.map((brand) => (_jsx("option", { value: brand._id, children: brand.brand_name }, brand._id)))] }), _jsx("p", { ref: brandRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "unitSelect", className: "block text-sm font-medium text-gray-200 mb-1", children: "Unit" }), _jsxs("select", { id: "unitSelect", "aria-label": "Select a unit", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => setSelectedUnit(e.target.value), value: selectUnitId, disabled: loadOn, children: [_jsx("option", { value: "", children: "Select Unit" }), unitList.map((unit) => (_jsx("option", { value: unit._id, children: unit.unit_name }, unit._id)))] }), _jsx("p", { ref: unitRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "unitRate", className: "block text-sm font-medium text-gray-200 mb-1", children: "Unit Rate" }), _jsx("input", { id: "unitRate", type: "number", placeholder: "Enter unit rate", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => setUnitRate(Number(e.target.value)), value: unit_rate === 0 ? "" : unit_rate, disabled: loadOn }), _jsx("p", { ref: unitRateRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "openingStock", className: "block text-sm font-medium text-gray-200 mb-1", children: "Total Opening Stock" }), _jsx("input", { id: "openingStock", type: "number", placeholder: "Enter opening stock", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => {
                                            setTotalStock(Number(e.target.value));
                                            SetRow([]);
                                        }, value: totalOpeningStock === 0 ? "" : totalOpeningStock, disabled: loadOn })] })] }), _jsxs("div", { className: "mb-4 pt-4 border-t border-gray-700", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-100", children: "Project-wise Stock Distribution" }), _jsxs("button", { onClick: addRow, type: "button", className: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2", disabled: loadOn, children: [_jsx(PlusCircleIcon, { className: "h-5 w-5" }), " Add Project Row"] })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "SL NO" }), _jsx("th", { className: "px-6 py-4", children: "Project Name" }), _jsx("th", { className: "px-6 py-4", children: "Opening Stock" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: row.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "text-center py-8 text-gray-400 text-sm font-medium", children: "Click \"Add Project Row\" to distribute stock to projects." }) })) : (row.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200 text-center", children: index + 1 }), _jsx("td", { className: "px-6 py-4", children: _jsxs("select", { "aria-label": "Select a project", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", value: element.project, onChange: (e) => {
                                                                if (e.target.value && existproject(e.target.value, index))
                                                                    return;
                                                                const updatedRow = [...row];
                                                                updatedRow[index].project = e.target.value;
                                                                SetRow(updatedRow);
                                                            }, disabled: loadOn, children: [_jsx("option", { value: "", children: "Select project" }), projectList.map((item) => (_jsx("option", { value: item._id, children: item.project_name }, item._id)))] }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("input", { type: "number", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", value: element.stock === 0 ? "" : element.stock, placeholder: "Enter stock", onChange: (e) => {
                                                                const updatedRow = [...row];
                                                                const newStock = Number(e.target.value);
                                                                updatedRow[index].stock = newStock;
                                                                SetRow(updatedRow);
                                                                if (stockCheck(updatedRow)) {
                                                                    updatedRow[index].stock = 0;
                                                                    SetRow([...updatedRow]);
                                                                }
                                                            }, disabled: loadOn }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("button", { "aria-label": "Delete button", onClick: () => deletRow(index), type: "button", className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", disabled: loadOn, children: _jsx(MinusCircleIcon, { className: "h-5 w-5" }) }) })] }, index)))) })] }) })] }), _jsxs("div", { className: "flex justify-end gap-4 mt-8 pt-4 border-t border-gray-700", children: [_jsx("button", { type: "button", className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: () => {
                                    setEditEnable(false);
                                    setEditId("");
                                }, disabled: loadOn, children: "Cancel" }), _jsx("button", { type: "button", onClick: updateMaterial, className: "bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", disabled: loadOn, children: "Update Material" })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }) }) }));
}
export default EditMaterial;
