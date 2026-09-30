import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MealWeightEditor = ({ onSave }) => {
  const [weights, setWeights] = useState({ breakfast: 1, lunch: 1, dinner: 1 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        const res = await axios.get(
          "https://mealplannerserverside.onrender.com/api/v1/mealplan/weight",
          { withCredentials: true }
        );
        const serverWeights = res.data; // Ensure your API returns { breakfast, lunch, dinner }
        setWeights(serverWeights);
        localStorage.setItem("mealWeights", JSON.stringify(serverWeights));
      } catch (error) {
        console.error("Failed to fetch weights, loading from localStorage", error);
        const stored = localStorage.getItem("mealWeights");
        if (stored) {
          setWeights(JSON.parse(stored));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeights();
  }, []);

  const handleChange = (type, value) => {
    const newWeights = {
      ...weights,
      [type]: parseFloat(value) || 0,
    };
    setWeights(newWeights);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const type of Object.keys(weights)) {
        await axios.post(
          "https://mealplannerserverside.onrender.com/api/v1/mealplan/weight",
          { type, weight: weights[type] },
          { withCredentials: true }
        );
      }
      localStorage.setItem("mealWeights", JSON.stringify(weights)); // ✅ Write after success
      if (onSave) onSave(weights);
      toast.success("✅ Meal weights saved successfully!");
    } catch (error) {
      console.error("❌ Failed to save weights:", error);
      if (error.response?.status === 403) {
        toast.error("Only Manager Can Set Weight");
      } else {
        toast.error("Failed to save weights, try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading meal weights...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-700 text-center">🍽️ Meal Weight Editor</h2>
      <div className="space-y-4">
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <div key={meal} className="flex justify-between items-center">
            <label className="capitalize text-gray-600">{meal}</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={weights[meal]}
              onChange={(e) => handleChange(meal, e.target.value)}
              className="w-24 px-3 py-1 text-black  border rounded-xl text-center text-semibold focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full py-2 px-4 rounded-xl text-white font-semibold ${
          saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default MealWeightEditor;
