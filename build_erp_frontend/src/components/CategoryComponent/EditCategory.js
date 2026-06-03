import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { putCategory } from "../../api/CategoryApi/category";
import Loading from "../../components/Loading";
function EditCategory({ enable, setEnable, editData, onUpdate, }) {
    const [category, setCategory] = useState(editData.category_name);
    const [description, setDescription] = useState(editData.description);
    const catRef = useRef(null);
    const [loadOn, setLoadOn] = useState(false);
    // Update local state when props change (when a different category is selected for edit)
    useEffect(() => {
        setCategory(editData.category_name);
        setDescription(editData.description);
    }, [editData.category_name, editData.description]);
    const editSubmit = async (e) => {
        e.preventDefault();
        if (category.trim() === "") {
            if (catRef.current) {
                catRef.current.innerText = "Category name is required.";
            }
            return;
        }
        else {
            if (catRef.current) {
                catRef.current.innerText = "";
            }
        }
        try {
            setLoadOn(true);
            const _id = editData._id;
            const category_name = category;
            const data = await putCategory({ _id, category_name, description });
            if (data.success) {
                setLoadOn(false);
                toast.success(data.message);
                onUpdate();
                setEnable(false);
            }
            else {
                setLoadOn(false);
                toast.error(data.message);
            }
        }
        catch (error) {
            setLoadOn(false);
        }
    };
    if (!enable)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4", children: _jsxs("form", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md space-y-6 border border-gray-700/50", onSubmit: editSubmit, children: [_jsx("h2", { className: "text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4", children: "Edit Category" }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "categoryName", className: "block text-sm font-medium text-gray-200 mb-1", children: "Category Name" }), _jsx("input", { id: "categoryName", type: "text", value: category, placeholder: "Enter category name", onChange: (e) => setCategory(e.target.value), className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm" }), _jsx("p", { ref: catRef, className: "text-red-400 text-sm mt-1" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-200 mb-1", children: "Description" }), _jsx("input", { id: "description", type: "text", value: description, placeholder: "Enter description", onChange: (e) => setDescription(e.target.value), className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm" })] }), _jsxs("div", { className: "flex justify-end gap-4 mt-6", children: [_jsx("button", { type: "button", className: "bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold", onClick: () => setEnable(false), children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold", children: "Save Changes" })] })] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default EditCategory;
