import React, { useState, useEffect } from 'react';
import { FiClock, FiEdit2 } from 'react-icons/fi';
import axios from 'axios';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    startTime: '12:00',
    endTime: '22:00'
  });

  useEffect(() => {
    // Load saved settings from backend
    const loadSettings = async () => {
      try {
        const response = await axios.get('https://mealplannerserverside.onrender.com/api/v1/users/timer-settings', {
          withCredentials: true
        });
        if (response.data) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error('Error loading timer settings:', error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const [startHours, startMinutes] = settings.startTime.split(':').map(Number);
      const [endHours, endMinutes] = settings.endTime.split(':').map(Number);

      const startTime = new Date(now);
      startTime.setHours(startHours, startMinutes, 0);

      const endTime = new Date(now);
      endTime.setHours(endHours, endMinutes, 0);

      // If current time is before start time, show time until start
      if (now < startTime) {
        const diff = startTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`Starts in ${hours}h ${minutes}m`);
        return;
      }

      // If current time is after end time, show time until next day's start
      if (now > endTime) {
        const nextStart = new Date(startTime);
        nextStart.setDate(nextStart.getDate() + 1);
        const diff = nextStart - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`Next meal starts in ${hours}h ${minutes}m`);
        return;
      }

      // If current time is between start and end, show time until end
      const diff = endTime - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m remaining`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [settings]);

  const handleSaveSettings = async () => {
    try {
      await axios.post('https://mealplannerserverside.onrender.com/api/v1/users/timer-settings', settings, {
        withCredentials: true
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving timer settings:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
          <FiClock className="mr-2" />
          Meal Time Countdown
        </h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <FiEdit2 />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={settings.startTime}
                onChange={(e) => setSettings(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={settings.endTime}
                onChange={(e) => setSettings(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-medium"
              />
            </div>
          </div>
          <button
            onClick={handleSaveSettings}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Save Settings
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">{timeLeft}</p>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            {settings.startTime} - {settings.endTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer; 