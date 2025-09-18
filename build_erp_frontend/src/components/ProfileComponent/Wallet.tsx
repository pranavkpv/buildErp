import { getUserWalletHistoryApi } from "../../api/payment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface wallet {
  date: Date;
  purpose: string;
  paymentStatus: string;
  stage_name: string;
  project_name: string;
  payment_amount: number;
}

function Wallet() {
  const [walletData, setWalletData] = useState<wallet[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchUserWallet = async () => {
    try {
      const response = await getUserWalletHistoryApi(page, search);
      if (response.success) {
        setWalletData(response.data.data);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch wallet history");
    }
  };

  useEffect(() => {
    fetchUserWallet();
  }, [page, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Wallet History</h2>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by project name..."
            className="w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">SL No</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Project Name</th>
                <th className="px-6 py-3">Stage Name</th>
                <th className="px-6 py-3">Purpose</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {walletData.length > 0 ? (
                walletData.map((element, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{(page - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-6 py-4">
                      {new Date(element.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{element.project_name}</td>
                    <td className="px-6 py-4">{element.stage_name}</td>
                    <td className="px-6 py-4">{element.purpose}</td>
                    <td className="px-6 py-4">${element.payment_amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          element.paymentStatus.toLowerCase() === "success"
                            ? "bg-green-100 text-green-800"
                            : element.paymentStatus.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {element.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No wallet history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wallet;