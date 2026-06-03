import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Loading from "../../components/Loading";
import { postBrand } from "../../api/BrandApi/brand";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
function AddBrand({ enable, setEnable, onAdd }) {
    const [brand_name, setBrand] = useState("");
    const brandRef = useRef(null);
    const [loadOn, setLoadOn] = useState(false);
    const addBrand = async (e) => {
        e.preventDefault();
        if (brand_name.trim() === "") {
            if (brandRef.current) {
                brandRef.current.innerText = "Brand name is required.";
            }
            return;
        }
        else {
            if (brandRef.current)
                brandRef.current.innerText = "";
        }
        try {
            setLoadOn(true);
            const data = await postBrand({ brand_name });
            if (data.success) {
                setLoadOn(false);
                toast.success(data.message);
                onAdd();
                setEnable(false);
                setBrand("");
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
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4", children: _jsxs("form", { onSubmit: addBrand, className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-6 border border-gray-700/50", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4", children: "Add New Brand" }), _jsxs("div", { children: [_jsx("label", { htmlFor: "brandName", className: "block text-sm font-medium text-gray-200 mb-1", children: "Brand Name" }), _jsx("input", { id: "brandName", type: "text", placeholder: "Enter brand name", value: brand_name, className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => setBrand(e.target.value) }), _jsx("p", { ref: brandRef, className: "text-red-400 text-sm mt-1" })] }), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [_jsx("button", { type: "button", onClick: () => {
                                        setEnable(false);
                                        setBrand(""); // Clear input on cancel
                                        if (brandRef.current)
                                            brandRef.current.innerText = ""; // Clear validation message
                                    }, className: "bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold", children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold", children: "Add Brand" })] })] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default AddBrand;
