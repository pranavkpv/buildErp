import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppContext from "../../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
import AddSpec from "./AddSpec";
import AddSpecMaterial from "./AddSpecMaterial";
import AddLabourSpec from "./AddLabourSpec";
import AddAdditionalSpec from "./AddAdditional";
import EditSpec from "./EditSpec";
import EditSpecMaterial from "./EditMaterialSpec";
import EditLabourSpec from "./EditLabourSpec";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteSpec from "./DeleteSpec";
import EditAdditionalSpec from "./EditAdditional";
import { fetchSpec } from "../../../api/Specification";
import { findMaterialById } from "../../../api/Admin/material";
import { getLabourData } from "../../../api/Admin/labour";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
function SpecList() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [response, setResponse] = useState([]);
    const [editMaterialRow, setEditMaterialRow] = useState([]);
    const [editLabourRow, setEditLabourRow] = useState([]);
    const [total, setTotal] = useState(0);
    const [loadOn, setLoadOn] = useState(false);
    const { setEditSpecEnable, setAddEnable, setEditId, seteditSpec_id, setEditSpec_name, setEditSpecUnit, setEditDescription, setDeleteSpecEnable, setDeleteId, seteditadditionalExpense_per, seteditprofit_per } = useContext(AppContext);
    const fetchSpecList = async () => {
        setLoadOn(true);
        const response = await fetchSpec(page, search);
        setLoadOn(false);
        setTotal(response.data.totalPage);
        for (let element of response.data.data) {
            for (let item of element.materialDetails) {
                const Materialdata = await findMaterialById(item.material_id);
                item.unitRate = Materialdata.data.unit_rate;
            }
            for (let labours of element.labourDetails) {
                const labourData = await getLabourData(labours.labour_id);
                labours.rate = labourData.data.daily_wage;
            }
        }
        let x = [];
        for (let element of response.data.data) {
            let materialSum = element.materialDetails.reduce((sum, item) => sum + item.unitRate * item.quantity, 0);
            let labourSum = element.labourDetails.reduce((sum, item) => sum + item.rate * item.numberoflabour, 0);
            let additionalExpense = ((materialSum + labourSum) * element.additionalExpense_per) / 100 || 0;
            let profitAmount = ((materialSum + labourSum + additionalExpense) * element.profit_per) / 100 || 0;
            x.push({
                specId: element.spec_id,
                specName: element.spec_name,
                unitRate: materialSum + labourSum + additionalExpense + profitAmount,
                spec_unit: element.spec_unit,
                description: element.description,
                _id: element._id,
                materialDetails: element.materialDetails,
                labourDetails: element.labourDetails,
                additionalExpense_per: element.additionalExpense_per,
                profit_per: element.profit_per
            });
        }
        setData(x);
        setResponse(x);
    };
    useEffect(() => {
        let debounce = setTimeout(() => {
            fetchSpecList();
        }, 500);
        return () => {
            clearTimeout(debounce);
        };
    }, [page, search]);
    return (_jsxs("div", { className: "p-6 sm:p-8 min-h-screen bg-gray-900", children: [_jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto border border-gray-700/50", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: [_jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "Specification" }), _jsx(ReUsableAddButton, { addFuntion: () => setAddEnable(true), item: "Specification" })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "SL No" }), _jsx("th", { className: "px-6 py-4", children: "Spec ID" }), _jsx("th", { className: "px-6 py-4", children: "Spec Name" }), _jsx("th", { className: "px-6 py-4", children: "Unit Rate" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: data.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-12 text-gray-400 text-sm font-medium", children: "No specifications found." }) })) : (data.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200", children: (index + 1) + page * 5 }), _jsx("td", { className: "px-6 py-4 text-gray-200", children: element.specId }), _jsx("td", { className: "px-6 py-4 text-gray-200", children: element.specName }), _jsx("td", { className: "px-6 py-4 text-gray-200", children: element.unitRate.toFixed(2) }), _jsxs("td", { className: "px-6 py-4 text-center space-x-3", children: [_jsx("button", { className: "text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Edit specification ${element.specName}`, onClick: () => {
                                                            setEditId(element._id);
                                                            seteditSpec_id(element.specId);
                                                            setEditSpec_name(element.specName);
                                                            setEditSpecUnit(element.spec_unit);
                                                            setEditDescription(element.description);
                                                            setEditSpecEnable(true);
                                                            let editMatRow = [];
                                                            for (let item of response.filter((x) => x._id == element._id)[0].materialDetails) {
                                                                editMatRow.push({
                                                                    sl: editMatRow.length + 1,
                                                                    material_name: item.material_info.material_name,
                                                                    brand_name: item.material_info.brand.brand_name,
                                                                    unit_name: item.material_info.unit.unit_name,
                                                                    unit_rate: item.unitRate,
                                                                    material_id: item.material_id,
                                                                    quantity: item.quantity,
                                                                });
                                                            }
                                                            setEditMaterialRow(editMatRow);
                                                            let editLabRow = [];
                                                            for (let item of response.filter((x) => x._id === element._id)[0].labourDetails) {
                                                                editLabRow.push({
                                                                    sl: editLabRow.length + 1,
                                                                    labour_type: item.labour_info.labour_type,
                                                                    quantity: item.numberoflabour,
                                                                    daily_wage: item.rate,
                                                                });
                                                            }
                                                            setEditLabourRow(editLabRow);
                                                            seteditadditionalExpense_per(element.additionalExpense_per);
                                                            seteditprofit_per(element.profit_per);
                                                        }, children: _jsx(PencilIcon, { className: "h-5 w-5" }) }), _jsx("button", { className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Delete specification ${element.specName}`, onClick: () => {
                                                            setDeleteSpecEnable(true);
                                                            setDeleteId(element._id);
                                                        }, children: _jsx(TrashIcon, { className: "h-5 w-5" }) })] })] }, element._id)))) })] }) }), data.length > 0 && (_jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: total }))] }), _jsx(AddSpec, {}), _jsx(AddSpecMaterial, {}), _jsx(AddLabourSpec, {}), _jsx(AddAdditionalSpec, { fetchSpecList: fetchSpecList }), _jsx(EditSpec, {}), _jsx(EditSpecMaterial, { editrow: editMaterialRow }), _jsx(EditLabourSpec, { editrow: editLabourRow }), _jsx(EditAdditionalSpec, { fetchSpecList: fetchSpecList }), _jsx(DeleteSpec, { fetchSpecList: fetchSpecList })] }));
}
export default SpecList;
