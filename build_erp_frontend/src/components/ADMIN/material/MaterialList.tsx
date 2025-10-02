import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
import { useState } from "react";

type materialType = {
  _id: string;
  material_name: string;
  unit_rate: number;
  categoryDetails: {
    _id: string;
    category_name: string;
  }[];
  unitDetails: {
    _id: string;
    unit_name: string;
  }[];
  brandDetails: {
    _id: string;
    brand_name: string;
  }[];
};

type MaterialListProps = {
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  enable: boolean;
  materialData: materialType[];
  setDeleteEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  refreshData: () => void
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  page: number
  totalPage: number
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setEditId: React.Dispatch<React.SetStateAction<string>>
  editEnable: boolean
  loadOn:boolean
};

function MaterialList({ setEnable, enable, materialData, setDeleteEnable,
  setDeleteId, setPage, setSearch, search, page, totalPage, setEditEnable, setEditId, editEnable,loadOn }: MaterialListProps) {
  if (enable || editEnable) return null
  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <ReUsableSearch search={search} setSearch={setSearch} item="material" />
          <ReUsableAddButton addFuntion={() => setEnable(true)} item="Material" />
        </div>
        <Loading loadOn={loadOn} />

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL No</th>
                <th className="px-6 py-4">Material Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Unit Rate</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {materialData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No materials found.
                  </td>
                </tr>
              ) : (
                materialData.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200">{(index + 1) + (page * 5)}</td>
                    <td className="px-6 py-4 text-gray-200">{element.material_name}</td>
                    <td className="px-6 py-4 text-gray-200">{element.categoryDetails[0]?.category_name || "-"}</td>
                    <td className="px-6 py-4 text-gray-200">{element.brandDetails[0]?.brand_name || "-"}</td>
                    <td className="px-6 py-4 text-gray-200">{element.unitDetails[0]?.unit_name || "-"}</td>
                    <td className="px-6 py-4 text-gray-200">{element.unit_rate}</td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        className="text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Edit material ${ element.material_name }`}
                        onClick={() => {
                          setEditEnable(true)
                          setEditId(element._id)
                        }}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteEnable(true);
                          setDeleteId(element._id);
                        }}
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete material ${ element.material_name }`}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <ReUsablePagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      </div>
    </div>
  );
}

export default MaterialList;