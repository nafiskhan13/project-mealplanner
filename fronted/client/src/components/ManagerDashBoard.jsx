import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiLoader,
  FiCoffee,
  FiSun,
  FiMoon,
  FiPieChart,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";
import { GiTakeMyMoney } from "react-icons/gi";
import toast from "react-hot-toast";

const getMealIcon = (type) => {
  switch (type.toLowerCase()) {
    case "breakfast":
      return <FiCoffee className="text-amber-500 inline" />;
    case "lunch":
      return <FiSun className="text-orange-500 inline" />;
    case "dinner":
      return <FiMoon className="text-indigo-500 inline" />;
    default:
      return null;
  }
};

const TotalMealsDashboard = () => {
  const [monthData, setMonthData] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [fetchTime, setFetchTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestDate, setLatestDate] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);
  const [mealRate, setMealRate] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const month = now.toISOString().slice(0, 7);

        const monthRes = await axios.get(`https://mealplannerserverside.onrender.com/api/v1/totalmealsofmonth/${month}`, { withCredentials: true });
        setMonthData(monthRes.data.data);

        const resLatestDate = await axios.get("https://mealplannerserverside.onrender.com/api/v1/mealplan/latest", { withCredentials: true });
        const todayStr = resLatestDate.data.data.date;
        const formattedDate = new Date(todayStr).toISOString().split("T")[0];
        setLatestDate(formattedDate);

        const res = await axios.get(`https://mealplannerserverside.onrender.com/api/v1/totalweights/${todayStr}`, { withCredentials: true });
        setMealData({ ...res.data.data, date: todayStr });
        setFetchTime(new Date().toLocaleTimeString());

        const costRes = await axios.get(`https://mealplannerserverside.onrender.com/api/v1/bazarlist?month=${month}`, { withCredentials: true });
        setTotalCost(costRes.data.totalAmount);

        const balanceRes = await axios.get(`https://mealplannerserverside.onrender.com/api/v1/allusercurrentbalance?month=${month}`, { withCredentials: true });
        setTotalBalance(balanceRes.data.totalDeposit);

        const totalCostVal = costRes.data.totalAmount;
        const totalDeposit = balanceRes.data.totalDeposit;
        const totalWeight = monthRes.data.data.totalWeight;

        if (totalCostVal && totalWeight) {
          const rate = (totalCostVal / totalWeight).toFixed(2);
          setMealRate(rate);
        }

        if (totalCostVal && totalDeposit) {
          const currentBalance = totalDeposit - totalCostVal;
          setCurrentBalance(currentBalance);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <FiLoader className="animate-spin text-indigo-600 text-5xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {monthData && (
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-2 text-indigo-700">📊 Total Meals This Month</h2>
              <p className="text-gray-700 mb-1"><span className="font-bold">Total Weight:</span> {monthData.totalWeight}</p>
              <div className="space-y-0.5">
                {Object.entries(monthData.byType).map(([type, weight], idx) => (
                  <p key={idx} className="text-gray-600">{getMealIcon(type)} <span className="capitalize">{type}:</span> {weight}</p>
                ))}
              </div>
            </div>
          )}

          {mealData && (
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-2 text-indigo-700">🍽️ Total Meal Weights</h2>
              <p className="text-gray-700 mb-1">Date: {latestDate}</p>
              <p className="text-gray-500 text-sm mb-2">Fetched at: {fetchTime}</p>
              <div className="space-y-0.5 text-gray-700">
                <p><span className="font-semibold">Total Weight:</span> {mealData.totalWeight}</p>
                <p>{<FiCoffee className="inline mr-1 text-amber-500" />} <span className="font-semibold">Breakfast:</span> {mealData.breakfastWeight}</p>
                <p>{<FiSun className="inline mr-1 text-orange-500" />} <span className="font-semibold">Lunch:</span> {mealData.lunchWeight}</p>
                <p>{<FiMoon className="inline mr-1 text-indigo-500" />} <span className="font-semibold">Dinner:</span> {mealData.dinnerWeight}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <FiPieChart className="mx-auto text-[#f57600] text-3xl" />
            <h3 className="text-lg font-semibold mt-1 text-black">Meal Rate</h3>
            <p className="text-xl font-bold text-black">{mealRate ? `${mealRate} Tk/meal` : "--"}</p>
            <p className="text-gray-500 text-sm">This Month</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <FiTrendingUp className="mx-auto text-green-600 text-3xl" />
            <h3 className="text-lg font-semibold mt-1 text-black">Total Deposit</h3>
            <p className="text-xl font-bold text-black">{totalBalance !== null ? `${totalBalance} Tk` : "--"}</p>
            <p className="text-gray-500 text-sm">This Month</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <GiTakeMyMoney className="mx-auto text-[#5ba300] text-3xl" />
            <h3 className="text-lg font-semibold mt-1 text-black">Current Balance</h3>
            <p className="text-xl font-bold text-black">{currentBalance !== null ? `${currentBalance} Tk` : "--"}</p>
            <p className="text-gray-500 text-sm">This Month</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <FiDollarSign className="mx-auto text-indigo-600 text-3xl" />
            <h3 className="text-lg font-semibold mt-1 text-black">Total Cost</h3>
            <p className="text-xl font-bold text-black">{totalCost !== null ? `${totalCost} Tk` : "--"}</p>
            <p className="text-gray-500 text-sm">This Month</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TotalMealsDashboard;
