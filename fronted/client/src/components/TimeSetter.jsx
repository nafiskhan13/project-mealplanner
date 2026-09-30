import React, { useState } from 'react';
import axios from 'axios';
import { FiClock } from 'react-icons/fi';

const TimeSetter = () => {
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!endTime.trim()) {
      alert('Please set an end time!');
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        'https://mealplannerserverside.onrender.com/api/v1/createtimer',
        { end: endTime },
        { withCredentials: true }
      );
      setEndTime(''); // clear input on success
      alert('Timer created successfully!');
    } catch (err) {
      console.error('Error creating timer:', err);
      alert('Failed to create timer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm mx-auto">
      <FiClock className="mx-auto text-[#5ba300] text-4xl" />
      <h3 className="text-lg font-semibold text-black mt-4">Set Meal Selection End Time</h3>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 text-black">
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-3 border bg-white border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#5ba300]"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#5ba300] text-white px-6 py-3 rounded-lg hover:bg-[#4e9200] transition disabled:bg-gray-400"
        >
          {loading ? 'Sending...' : 'Set Timer'}
        </button>
      </form>
    </div>
  );
};

export default TimeSetter;
