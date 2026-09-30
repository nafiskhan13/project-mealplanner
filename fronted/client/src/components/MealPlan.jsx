import React, { useState } from "react";
import axios from "axios";
import { FiCheckCircle, FiAlertCircle, FiSunrise, FiSun, FiMoon, FiArrowLeft, FiClock } from "react-icons/fi";
import MealWeightEditor from "./MealWeightEditor";
import { useNavigate } from "react-router";
import TimeSetter from "./TimeSetter";

const MealPlan = () => {
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState({
    breakfast: { name: "" },
    lunch: { name: "" },
    dinner: { name: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealPlan((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        name: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!mealPlan.breakfast.name && !mealPlan.lunch.name && !mealPlan.dinner.name) {
      setStatus({ type: "error", message: "Please enter at least one meal" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      // const now = new Date();
      // now.setDate(now.getDate() + 1);
      // now.setHours(0, 0, 0, 0);
      // const offset = now.getTimezoneOffset() * 60000;
      // const adjustedDate = new Date(now.getTime() - offset);
      // const formattedDate = adjustedDate.toISOString().split("T")[0];

      const formattedDate = selectedDate;
      if(!formattedDate){
        setStatus({ type: "error", message: "Please select a date before saving." });
        setIsSubmitting(false);
  return;
      }

      const mealsArray = [];
      if (mealPlan.breakfast.name.trim()) {
        mealsArray.push({ type: "breakfast", name: mealPlan.breakfast.name.trim() });
      }
      if (mealPlan.lunch.name.trim()) {
        mealsArray.push({ type: "lunch", name: mealPlan.lunch.name.trim() });
      }
      if (mealPlan.dinner.name.trim()) {
        mealsArray.push({ type: "dinner", name: mealPlan.dinner.name.trim() });
      }

      const response = await axios.post("https://mealplannerserverside.onrender.com/api/v1/mealplan", {
        date: formattedDate,
        meals: mealsArray,
      }, { withCredentials: true });

      setStatus({ type: "success", message: response.data.message || "Meal plan saved successfully!" });
      setMealPlan({ breakfast: { name: "" }, lunch: { name: "" }, dinner: { name: "" } });
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Failed to save meal plan. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);
  // const tomorrowFormatted = tomorrow.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg px-4 py-2 mb-4">
          <FiArrowLeft className="mr-2" /> <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 flex items-center space-x-2">
            <span>Set Meal Plan</span>
            {/* <FiClock className="text-gray-500" /> */}
            <div>
              <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="w-full border text-black border-black rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
            </div>
            {/* <span className="text-sm text-gray-500">{tomorrowFormatted}</span> */}
          </h2>

          {['breakfast', 'lunch', 'dinner'].map((meal) => (
            <div key={meal} className="mb-4">
              <label className="block mb-1 capitalize font-bold text-black">{meal}</label>
              <input
                type="text"
                name={meal}
                value={mealPlan[meal].name}
                onChange={handleChange}
                placeholder={`What's for ${meal}?`}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {status.type && (
            <div className={`mt-4 p-3 rounded ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className="flex items-center">
                {status.type === 'success' ? <FiCheckCircle className="mr-2" /> : <FiAlertCircle className="mr-2" />}
                <span>{status.message}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`mt-4 w-full p-2 rounded text-white font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isSubmitting ? 'Saving...' : 'Save Meal Plan'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white rounded-lg shadow p-4 sm:p-6 lg:p-8">
            <MealWeightEditor />
          </div>
          <div className="flex-1 bg-white rounded-lg shadow p-4 sm:p-6 lg:p-8">
            <TimeSetter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;