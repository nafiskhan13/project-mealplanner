import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const AddBazarList = () => {
    const [formData, setFormData] = useState({
        date: '',
        name: '',
        description: '',
        amount: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'error' or 'success'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.date || !formData.name || !formData.description || !formData.amount) {
            setMessageType('error');
            setMessage('All fields are required.');
            return;
        }

        try {
            setLoading(true);
            setMessage('');
            setMessageType('');

            await fetch('https://mealplannerserverside.onrender.com/api/v1/bazarlist/create', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: formData.date,
                    name: formData.name,
                    description: formData.description,
                    amount: Number(formData.amount)
                }),
            });

            setMessageType('success');
            setMessage('Bazar item added successfully!');
            setFormData({ date: '', name: '', description: '', amount: '' });
        } catch (error) {
            setMessageType('error');
            setMessage(error.message || 'Error adding bazar item.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-6">
                Add Bazar Item
            </h2>

            {message && (
                <div
                    className={`mb-5 text-center px-4 py-3 rounded-md text-sm ${
                        messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
                    }`}
                    role="alert"
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date */}
                <div>
                    <label htmlFor="date" className="block mb-1 font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g., Momin"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="e.g., Rice, Fish"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                </div>

                {/* Amount */}
                <div>
                    <label htmlFor="amount" className="block mb-1 font-medium text-gray-700">
                        Amount (BDT)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="e.g., 1500"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-white font-semibold transition ${
                        loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                    <AiOutlinePlus size={22} />
                    {loading ? 'Adding...' : 'Add Bazar Item'}
                </button>
            </form>
        </div>
    );
};

export default AddBazarList;
