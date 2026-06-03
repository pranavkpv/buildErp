import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PlusCircleIcon } from "lucide-react";
function ReUsableAddButton({ item, addFuntion }) {
    return (_jsxs("button", { className: "w-full sm:w-48 bg-gradient-to-r from-teal-500 to-teal-600 \r\n             hover:from-teal-600 hover:to-teal-700 text-white \r\n             px-8 py-3 rounded-lg shadow-md hover:shadow-xl \r\n             transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2", onClick: addFuntion, children: [_jsx(PlusCircleIcon, { className: "h-5 w-5" }), " Add ", item] }));
}
export default ReUsableAddButton;
