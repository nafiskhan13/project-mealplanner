import React, { useEffect, useState, useCallback } from 'react';
import Card from './card/Card';
import MealSwitch from './MealSwitch';
import Countdown from './Countdown';
import axios from 'axios';

const ToDayMeal = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[tomorrow.getDay()];
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mealSelection, setMealSelection] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [mealItem, setMealItem] = useState({
    breakfastItem: "",
    lunchItem: "",
    dinnerItem: ""
  });
  const [timeSettings, setTimeSettings] = useState({
    startTime: '00:00',
    endTime: '22:00'
  });

  // Fetch user's time settings
  useEffect(() => {
    const fetchTimeSettings = async () => {
      try {
        const response = await axios.post('https://mealplannerserverside.onrender.com/api/v1/users/timer-settings', {}, { withCredentials: true });
        if (response.data) {
          setTimeSettings(response.data);
        }
      } catch (error) {
        console.error('Error loading timer settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTimeSettings();
  }, []);

  const handleMealToggle = (mealName, isChecked) => {
    setMealSelection(prev => ({
      ...prev,
      [mealName.toLowerCase()]: isChecked
    }));
  };

  const getEndTimeToday = () => {
    const endTime = new Date();
    const [hours, minutes] = (timeSettings?.endTime || '22:00').split(':').map(Number);
    endTime.setHours(hours, minutes, 0, 0);
    return endTime;
  };

  const isMealSelectionTime = useCallback(() => {
    const now = new Date();
    const [startHours, startMinutes] = (timeSettings?.startTime || '00:00').split(':').map(Number);
    const [endHours, endMinutes] = (timeSettings?.endTime || '22:00').split(':').map(Number);

    const startTime = new Date(now);
    startTime.setHours(startHours, startMinutes, 0, 0);

    const endTime = new Date(now);
    endTime.setHours(endHours, endMinutes, 0, 0);

    return now >= startTime && now <= endTime;
  }, [timeSettings]);

  useEffect(() => {
    const checkTime = () => {
      setIsDisabled(!isMealSelectionTime());
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, [timeSettings, isMealSelectionTime]);

  const handleSaveSelection = async () => {
    try {
      const response = await axios.post(
        'https://mealplannerserverside.onrender.com/api/v1/users/dailymeal',
        { date: tomorrow, selection: mealSelection },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsSaved(true);
        setIsDisabled(true);
      }
    } catch (error) {
      console.error('❌ Failed to save meal selection:', error);
    }
  };

  useEffect(() => {
    const fetchSaveMeal = async () => {
      try {
        const response = await axios.get('https://mealplannerserverside.onrender.com/api/v1/users/dailymeal?date', {
          withCredentials: true
        });
        if (response.data) {
          setMealSelection(response.data.selection);
          setIsSaved(true);
          setIsDisabled(true);
        }
      } catch (error) {
        console.log("Meal not selected yet:", error);
      }
    };
    fetchSaveMeal();
  }, []);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const res = await axios.get('https://mealplannerserverside.onrender.com/api/v1/users/mealplan', { withCredentials: true });
        const mealData = res.data?.data?.mealPlans?.[0]?.meals || {};
        console.log(mealData);
        setMealItem({
          breakfastItem: mealData?.breakfast || "",
          lunchItem: mealData?.lunch || "",
          dinnerItem: mealData?.dinner || ""
        });
      } catch (err) {
        console.log("Failed to fetch meal plan", err);
      }
    };
    fetchMealPlan();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center items-center p-4">
          <p>Loading meal information...</p>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <h1 className="text-black font-bold text-xl mb-2">Select Your Meal : {dayName}</h1>
        <h2 className="text-gray-700">Date: {tomorrow.toLocaleDateString()}</h2>
        <div>
          <Countdown initialTime={getEndTimeToday()} />
        </div>
        <div>
          <ul>
            <li><strong>Breakfast: {mealItem?.breakfastItem || 'Not set'}</strong></li>
            <li><strong>Lunch: {mealItem?.lunchItem || 'Not set'}</strong></li>
            <li><strong>Dinner: {mealItem?.dinnerItem || 'Not set'}</strong></li>
          </ul>
        </div>
        <MealSwitch
          mealName="Breakfast"
          defaultChecked={mealSelection?.breakfast}
          onChange={(isChecked) => handleMealToggle('Breakfast', isChecked)}
          disabled={isDisabled}
        />
        <MealSwitch
          mealName="Lunch"
          defaultChecked={mealSelection?.lunch}
          onChange={(isChecked) => handleMealToggle('Lunch', isChecked)}
          disabled={isDisabled}
        />
        <MealSwitch
          mealName="Dinner"
          defaultChecked={mealSelection?.dinner}
          onChange={(isChecked) => handleMealToggle('Dinner', isChecked)}
          disabled={isDisabled}
        />
        {!isSaved ? (
          <button
            onClick={handleSaveSelection}
            disabled={isDisabled}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
          >
            Save Selection
          </button>
        ) : (
          <p className='mt-4 text-green-600 font-semibold'>You Selected your meal</p>
        )}
      </Card>
    </div>
  );
};

export default ToDayMeal;
