import { PencilIcon, TrashIcon } from "lucide-react";

interface Prop<T extends { _id: string }> {
  heading: string[];
  dataKey: (keyof T)[];
  data: T[];
  page: number;
  setEditData: React.Dispatch<React.SetStateAction<T>>;
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  setDeleteEnable: React.Dispatch<React.SetStateAction<boolean>>;
  renderCell?: (key: keyof T, value: any, item: T) => React.ReactNode;
}

function ReUsableTable<T extends { _id: string }>({
  heading,
  dataKey,
  data,
  page,
  setEditData,
  setEditEnable,
  setDeleteId,
  setDeleteEnable,
  renderCell,
}: Prop<T>) {
  return (
    <table className="min-w-full w-full table-fixed text-sm text-left bg-gray-800/50">
      <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
        <tr>
          {/* SL No column */}
          <th className="px-6 py-4 border-b border-gray-700 w-[20%]">
            {heading[0] || "SL No"}
          </th>
          {/* Data columns */}
          {heading.slice(1, -1).map((element: string, index: number) => (
            <th key={index} className="px-6 py-4 border-b border-gray-700 w-[20%]">
              {element}
            </th>
          ))}
          {/* Action column */}
          <th className="px-6 py-4 border-b border-gray-700 w-[20%] text-center">
            {heading[heading.length - 1] || "Action"}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700/50">
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={heading.length}
              className="text-center py-12 text-gray-400 text-sm font-medium"
            >
              No Data Found.
            </td>
          </tr>
        ) : (
          data.map((element, index) => (
            <tr
              key={element._id}
              className="hover:bg-gray-700/50 transition-colors duration-150"
            >
              {/* SL No column */}
              <td className="px-6 py-4 font-medium text-gray-200 w-[20%]">
                {index + 1 + page * 5}
              </td>
              {/* Data columns */}
              {dataKey.map((key) => (
                <td key={key as string} className="px-6 py-4 text-gray-200 w-[20%]">
                  {renderCell
                    ? renderCell(key, element[key], element)
                    : (element[key] as string | number)}
                </td>
              ))}
              {/* Action column */}
              <td className="px-6 py-4 text-center space-x-3 w-[20%]">
                <button
                  onClick={() => {
                    setEditData(element);
                    setEditEnable(true);
                  }}
                  className="text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                  aria-label={`Edit item`}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    setDeleteEnable(true);
                    setDeleteId(element._id);
                  }}
                  className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                  aria-label={`Delete item`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ReUsableTable;