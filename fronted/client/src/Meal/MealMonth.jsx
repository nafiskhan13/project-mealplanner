import React, { useEffect, useState } from "react";
import { getMealPlanByMonth } from "../api/Api.jsx";
import {} from "date-fns";

const MonthlyMealTable = () => {
  const [monthData, setMonthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalWeight, setTotalWeight] = useState(0);

  // Dummy data generator for testing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // getMonth() is zero-based

        const res = await getMealPlanByMonth(year, month);
        const mealPlans = res.data;
        const total = mealPlans.reduce((sum, plan) => {
          const mealsWeight = plan.meals.reduce(
            (innerSum, meal) => innerSum + meal.weight,
            0
          );
          return sum + mealsWeight;
        }, 0);
        setTotalWeight(total);

        const tableData = mealPlans.map((item) => {
          const breakfast = item.meals
            .filter((m) => m.type === "breakfast")
            .reduce((sum, m) => sum + (m.weight || 0), 0);
          const lunch = item.meals
            .filter((m) => m.type === "lunch")
            .reduce((sum, m) => sum + (m.weight || 0), 0);
          const dinner = item.meals
            .filter((m) => m.type === "dinner")
            .reduce((sum, m) => sum + (m.weight || 0), 0);
          const dailyTotal = breakfast + lunch + dinner;
          return {
            date: new Date(item.date).toISOString().split("T")[0],
            breakfast,
            lunch,
            dinner,
            dailyTotal,
          };
        });
        setMonthData(tableData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 overflow-x-auto">
      <h2 className="text-xl font-extrabold text-black text-center mb-4">
        📅 Current Month Meal Summary
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-[#2546f0] text-white">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Breakfast</th>
            <th className="p-3">Lunch</th>
            <th className="p-3">Dinner</th>
            <th className="p-3">Daily Total</th>
          </tr>
        </thead>
        <tbody>
          {monthData.map((day, index) => (
            <tr key={index} className="text-center text-black font-semibold border-b hover:bg-indigo-50">
              <td className="p-2">{day.date}</td>
              <td className="p-2">{day.breakfast}</td>
              <td className="p-2">{day.lunch}</td>
              <td className="p-2">{day.dinner}</td>
              <td className="p-2 font-semibold">{day.dailyTotal}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-[#009eb0] font-bold text-lg">
            <td colSpan="4" className="text-right p-3 rounded-bl-lg text-black font-extrabold">
              Total Meal:
            </td>
            <td className="p-3 text-center rounded-br-lg text-black font-extrabold">{totalWeight}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MonthlyMealTable;
