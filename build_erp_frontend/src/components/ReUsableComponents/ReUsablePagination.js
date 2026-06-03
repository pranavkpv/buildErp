import { jsx as _jsx } from "react/jsx-runtime";
function ReUsablePagination({ totalPage, setPage, page }) {
    return (_jsx("div", { className: "flex justify-center gap-2 mt-6", children: Array.from({ length: totalPage }, (_, i) => (_jsx("button", { onClick: () => setPage(i), className: `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
        ${page === i
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white'}
      `, children: i + 1 }, i + 1))) }));
}
export default ReUsablePagination;
