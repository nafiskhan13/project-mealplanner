const MealSwitch = ({ mealName, checked = false, onChange, disabled }) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-black font-medium">{mealName}</span>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="sr-only"
          disabled={disabled}
        />
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
            checked ? 'bg-green-500' : 'bg-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default MealSwitch;
