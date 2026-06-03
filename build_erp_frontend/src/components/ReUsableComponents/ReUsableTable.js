import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PencilIcon, TrashIcon } from "lucide-react";
function ReUsableTable({ heading, dataKey, data, page, setEditData, setEditEnable, setDeleteId, setDeleteEnable, renderCell, }) {
    return (_jsxs("table", { className: "min-w-full w-full table-fixed text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 border-b border-gray-700 w-[20%]", children: heading[0] || "SL No" }), heading.slice(1, -1).map((element, index) => (_jsx("th", { className: "px-6 py-4 border-b border-gray-700 w-[20%]", children: element }, index))), _jsx("th", { className: "px-6 py-4 border-b border-gray-700 w-[20%] text-center", children: heading[heading.length - 1] || "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: data.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: heading.length, className: "text-center py-12 text-gray-400 text-sm font-medium", children: "No Data Found." }) })) : (data.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200 w-[20%]", children: index + 1 + page * 5 }), dataKey.map((key) => (_jsx("td", { className: "px-6 py-4 text-gray-200 w-[20%]", children: renderCell
                                ? renderCell(key, element[key], element)
                                : element[key] }, key))), _jsxs("td", { className: "px-6 py-4 text-center space-x-3 w-[20%]", children: [_jsx("button", { onClick: () => {
                                        setEditData(element);
                                        setEditEnable(true);
                                    }, className: "text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Edit item`, children: _jsx(PencilIcon, { className: "h-5 w-5" }) }), _jsx("button", { onClick: () => {
                                        setDeleteEnable(true);
                                        setDeleteId(element._id);
                                    }, className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Delete item`, children: _jsx(TrashIcon, { className: "h-5 w-5" }) })] })] }, element._id)))) })] }));
}
export default ReUsableTable;
