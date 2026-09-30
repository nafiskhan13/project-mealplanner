import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';
import PendingCard from './BalanceDetails';

const ADDBalance = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Load pending state from localStorage on mount
  useEffect(() => {
    const pending = localStorage.getItem('pendingDeposit');
    if (pending) {
      const { amount, date } = JSON.parse(pending);
      setAmount(amount);
      setDate(date);
    }
  }, []);

  // Confirm Manual Balance Add
  const handleConfirmAddBalance = async () => {
    try {
      const response = await axios.put(
        "https://mealplannerserverside.onrender.com/api/v1/addbalance",
        { amount: Number(amount), date },
        { withCredentials: true }
      );
      console.log("Response:", response.data);
      toast.success("Your Balance Added successfully! Wait for Manager Approval.");
    } catch (error) {
      console.error("Error adding balance:", error);
      alert(error.response?.data?.message || "Failed to add balance.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleBack = () => {
    navigate('/dashboard', { state: { amount, date } });
  };

  // Handle SSLCommerz Online Payment
  const handleOnlinePayment = async () => {
    try {
      const response = await axios.post(
        "https://mealplannerserverside.onrender.com/api/v1/payment/initiate",
        {
          amount: Number(amount),
          customerName: "John Doe", // Replace with actual logged-in user name
          customerEmail: "john@example.com", // Replace with actual user email
          customerPhone: "017XXXXXXXX", // Replace with actual user phone
        }
      );
      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to SSLCommerz Gateway
      }
    } catch (err) {
      toast.error("Failed to start online payment");
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-neutral-800 mb-6">
        💸 Add Balance
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400 bg-white transition"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-white transition"
          />
        </div>

        <div className="space-y-3">
          {/* Manual Add Balance */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <AiOutlinePlusCircle size={20} />
            Submit (Manual)
          </button>

          {/* Online Payment (SSLCommerz) */}
          <button
            type="button"
            onClick={handleOnlinePayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            💳 Pay Online (SSLCommerz)
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MdArrowBack size={20} />
            Back to Dashboard
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Confirm Add Balance"
        description={`Add ₹${amount} for ${date}?`}
        onConfirm={handleConfirmAddBalance}
      />
    </div>
  );
};

export default ADDBalance;
