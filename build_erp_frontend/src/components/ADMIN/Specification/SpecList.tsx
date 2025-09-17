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


export interface materialData {
  material_id: string;
  unitRate: number;
  quantity: number;
  material_info: {
    material_name: string
    brand: {
      brand_name: string
    }
    unit: {
      unit_name: string
    }
  }
}

export interface labourData {
  labour_id: string;
  numberoflabour: number;
  rate: number;
  labour_info: {
    labour_type: string
  }
}

type labourList = {
  sl: number;
  labour_type: string;
  quantity: number;
  daily_wage: number;
};

export interface specTable {
  _id: string;
  specId: string;
  specName: string;
  spec_unit: string;
  description: string;
  unitRate: number;
  materialDetails: materialData[];
  labourDetails: labourData[];
  additionalExpense_per: number;
  profit_per: number
}


type listMaterail = {
  sl: number;
  material_name: string;
  brand_name: string;
  unit_name: string;
  unit_rate: number;
  material_id: string;
  quantity: number;
};

function SpecList() {
  const [data, setData] = useState<specTable[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [response, setResponse] = useState<specTable[]>([]);
  const [editMaterialRow, setEditMaterialRow] = useState<listMaterail[]>([]);
  const [editLabourRow, setEditLabourRow] = useState<labourList[]>([]);
  const [total, setTotal] = useState(0)

  const {
    setEditSpecEnable,
    setAddEnable,
    setEditId,
    seteditSpec_id,
    setEditSpec_name,
    setEditSpecUnit,
    setEditDescription,
    setDeleteSpecEnable,
    setDeleteId,
    seteditadditionalExpense_per,
    seteditprofit_per
  } = useContext(AppContext);

  const fetchSpecList = async () => {
    const response = await fetchSpec(page, search);
    console.log(response)
    setTotal(response.data.totalPage)
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
      let materialSum = element.materialDetails.reduce(
        (sum: number, item: materialData) => sum + item.unitRate * item.quantity,
        0
      );
      let labourSum = element.labourDetails.reduce(
        (sum: number, item: labourData) => sum + item.rate * item.numberoflabour,
        0
      );
      let additionalExpense =
        ((materialSum + labourSum) * element.additionalExpense_per) / 100 || 0;
      let profitAmount =
        ((materialSum + labourSum +additionalExpense) * element.profit_per) / 100 || 0;
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
    setResponse(x)
  };

  useEffect(() => {
    let debounce = setTimeout(() => {
      fetchSpecList();
    }, 500)
    return () => {
      clearTimeout(debounce)
    }
  }, [page, search]);

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search specification
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by spec name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
          </div>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            onClick={() => setAddEnable(true)}
          >
            + Add Specification
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL No</th>
                <th className="px-6 py-4">Spec ID</th>
                <th className="px-6 py-4">Spec Name</th>
                <th className="px-6 py-4">Unit Rate</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-12 text-gray-400 text-sm font-medium"
                  >
                    No specifications found.
                  </td>
                </tr>
              ) : (
                data.map((element, index) => (
                  <tr
                    key={element._id}
                    className="hover:bg-gray-700/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-200">
                      {(index + 1) + page * 5}
                    </td>
                    <td className="px-6 py-4 text-gray-200">{element.specId}</td>
                    <td className="px-6 py-4 text-gray-200">
                      {element.specName}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {element.unitRate.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        className="text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Edit specification ${ element.specName }`}
                        onClick={() => {
                          setEditId(element._id);
                          seteditSpec_id(element.specId);
                          setEditSpec_name(element.specName);
                          setEditSpecUnit(element.spec_unit);
                          setEditDescription(element.description);
                          setEditSpecEnable(true);
                          let editMatRow: listMaterail[] = [];
                          for (let item of response.filter(
                            (x) => x._id == element._id
                          )[0].materialDetails) {
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

                          let editLabRow: labourList[] = [];
                          for (let item of response.filter(
                            (x) => x._id === element._id
                          )[0].labourDetails) {
                            editLabRow.push({
                              sl: editLabRow.length + 1,
                              labour_type: item.labour_info.labour_type,
                              quantity: item.numberoflabour,
                              daily_wage: item.rate,
                            });
                          }
                          setEditLabourRow(editLabRow);
                          seteditadditionalExpense_per(element.additionalExpense_per)
                          seteditprofit_per(element.profit_per)

                        }}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete specification ${ element.specName }`}
                        onClick={() => {
                          setDeleteSpecEnable(true)
                          setDeleteId(element._id)
                        }}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.length > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${ page === i
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <AddSpec />
      <AddSpecMaterial />
      <AddLabourSpec />
      <AddAdditionalSpec fetchSpecList={fetchSpecList} />
      <EditSpec />
      <EditSpecMaterial editrow={editMaterialRow} />
      <EditLabourSpec editrow={editLabourRow} />
      <EditAdditionalSpec fetchSpecList={fetchSpecList} />
      <DeleteSpec fetchSpecList={fetchSpecList} />
    </div>
  );
}

export default SpecList;