import { useEffect, useState } from "react";
import AddAttendance from "./addAttendance";
import { PencilIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import DeleteAttendance from "./DeleteAttendance";
import ApproveAttendance from "./ApproveAttendance";
import EditAttendance from "./EditAttendance";
import { fetchAttendanceAPI } from "../../../api/Sitemanager/attendance";

type attendanceData = {
  _id: string;
  project_name: string;
  project_id: string;
  date: string;
  netAmount: number;
};

function ListAttendance() {
  const [addEnable, setAddEnable] = useState(false);
  const [attendance, setAttendance] = useState<attendanceData[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalpage, setTotalpage] = useState(0);
  const itemsPerPage = 5;

  // delete
  const [deleteId, setDeleteId] = useState("");
  const [deleteEnable, setDeleteEnable] = useState(false);

  // approve
  const [approveId, setApproveId] = useState("");
  const [approveEnable, setApproveEnable] = useState(false);

  //edit
  const [editId, setEditId] = useState("")
  const [editEnable, setEditEnable] = useState(false)

  const fetchAttendance = async () => {
    const response = await fetchAttendanceAPI(search, page);
    setAttendance(response.data.result);
    setTotalpage(response.data.totalPage);
  };

  useEffect(() => {
    fetchAttendance();
  }, [search, page]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [date] = dateString.split("T");
    const [year, month, day] = date.split("-");
    return `${ day }-${ month }-${ year }`;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-100">Attendance List</h1>
          <div className="flex w-full sm:w-auto gap-4">
            <div className="w-full sm:w-96">
              <label htmlFor="search" className="sr-only">
                Search by project name
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search with project name"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setAddEnable(true)}
              type="button"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2"
            >
              <CheckCircleIcon className="h-5 w-5" /> Add Attendance
            </button>
          </div>
        </div>

        <AddAttendance addEnable={addEnable} setAddEnable={setAddEnable} onAddSuccess={fetchAttendance} />

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 w-[10%]">SL NO</th>
                <th className="px-6 py-4 w-[20%]">Date</th>
                <th className="px-6 py-4 w-[30%]">Project</th>
                <th className="px-6 py-4 w-[20%]">Net Amount</th>
                <th className="px-6 py-4 w-[20%] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {attendance.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400 text-sm font-medium">
                    No attendance records available. Click "Add Attendance" to create one.
                  </td>
                </tr>
              ) : (
                attendance.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1 + page * itemsPerPage}</td>
                    <td className="px-6 py-4 text-gray-100">{formatDate(element.date)}</td>
                    <td className="px-6 py-4 text-gray-100">{element.project_name}</td>
                    <td className="px-6 py-4 text-gray-100">₹{element.netAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button
                        type="button"
                        className="text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Edit attendance for ${ element.project_name }`}
                        onClick={() => {
                          setEditId(element._id)
                          setEditEnable(true)
                        }}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete attendance for ${ element.project_name }`}
                        onClick={() => {
                          setDeleteId(element._id);
                          setDeleteEnable(true);
                        }}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="text-green-400 hover:text-green-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Approve attendance for ${ element.project_name }`}
                        onClick={() => {
                          setApproveId(element._id);
                          setApproveEnable(true);
                        }}
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

        {totalpage >= 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalpage }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${ page === i
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-gray-700/50 text-gray-300 hover:bg-teal-500 hover:text-white hover:shadow-md"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <DeleteAttendance
          deleteId={deleteId}
          onDeleteSuccess={fetchAttendance}
          setDeleteEnable={setDeleteEnable}
          deleteEnable={deleteEnable}
        />
        <ApproveAttendance
          approveId={approveId}
          setApproveEnable={setApproveEnable}
          approveEnable={approveEnable}
          onApproveSuccess={fetchAttendance}
        />
        <EditAttendance
          editId={editId}
          editEnable={editEnable}
          setEditEnable={setEditEnable}
          onEditSuccess={fetchAttendance}
        />
      </div>
    </div>
  );
}

export default ListAttendance;