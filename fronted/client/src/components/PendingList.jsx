import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const PendingDepositList = () => {
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState(null);

  const fetchPendingDeposits = async () => {
    try {
      const pendingData = await axios.get(
        `https://mealplannerserverside.onrender.com/api/v1/pending-deposits`,
        { withCredentials: true }
      );
      setPendingDeposits(pendingData.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error fetching deposits");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (depositId) => {
    if (!window.confirm("Are you sure you want to approve this deposit?")) return;
    try {
      setApprovingId(depositId);
      await axios.post(
        `https://mealplannerserverside.onrender.com/api/v1/approve-pending-deposit/${depositId}`,
        {},
        { withCredentials: true }
      );
      await fetchPendingDeposits();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error approving deposit");
    } finally {
      setApprovingId(null);
    }
  };

  useEffect(() => {
    fetchPendingDeposits();
  }, []);

  if (loading) return <p className="text-center mt-8 text-gray-500">Loading pending deposits...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl bg-[#a6e9de] text-black font-bold mb-6 text-center">🪙 Pending Deposits</h2>

      <div className="overflow-x-auto shadow-lg rounded-2xl">
        <table className="min-w-full bg-white border border-gray-200 rounded-2xl">
          <thead className="bg-[#cff0fb] text-black">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Amount</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingDeposits.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No pending deposits found.
                </td>
              </tr>
            ) : (
              pendingDeposits.map((deposit) => (
                <tr
                  key={deposit._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4 border-t border-gray-200 text-black">
                    {deposit.userId?.fullName || deposit.userId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 border-t text-black border-gray-200">
                    {dayjs(deposit.date).format("YYYY-MM-DD")}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-black">
                    ৳ {deposit.amount}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-black">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        deposit.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : deposit.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {deposit.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200">
                    {deposit.status === "pending" ? (
                      <button
                        onClick={() => handleApprove(deposit._id)}
                        disabled={approvingId === deposit._id}
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          approvingId === deposit._id
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                        } transition-colors duration-200`}
                      >
                        {approvingId === deposit._id ? "Approving..." : "Approve"}
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDepositList;
