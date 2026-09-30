import React from 'react';

const Card = ({ title, children, className }) => {
  return (
    <div className={`bg-gray-100 p-6 rounded-lg shadow-lg ${className}`}>
      {title && <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>}
      <div className="text-black  flex flex-col justify-center">{children}</div>
    </div>
  );
};

export default Card;