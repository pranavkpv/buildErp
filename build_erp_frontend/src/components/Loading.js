import { jsx as _jsx } from "react/jsx-runtime";
const Loading = () => {
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]", children: _jsx("div", { className: "h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" }) }));
};
export default Loading;
