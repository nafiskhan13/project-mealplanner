import React, { useEffect, useState } from 'react';

const Countdown = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      if (!initialTime || isNaN(new Date(initialTime).getTime())) {
        return 0;
      }
      const difference = new Date(initialTime) - now;
      return Math.floor(difference / 1000);
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const scnd = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${scnd.toString().padStart(2, "0")}`;
  };

  return (
    <h1>
      Time Left: <span className='font-bold text-red-600'>{formatTime(timeLeft)}</span> to select your meal
    </h1>
  );
};

export default Countdown;
