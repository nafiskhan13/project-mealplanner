import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const BazarList = () => {
  const [bazarList, setBazarList] = useState([]); // List data
  const [totalAmount, setTotalAmount] = useState(0); // Total amount
  const [totalBazar, setTotalBazar] = useState(0);   // Total count
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://mealplannerserverside.onrender.com/api/v1/bazarlist', { withCredentials: true })
      .then((response) => {
        setBazarList(response.data.bazarlist);
        setTotalAmount(response.data.totalAmount);
        setTotalBazar(response.data.totalBazar);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch bazarlist data');
        setLoading(false);
      });
  }, []);

  const filteredBazarList = bazarList.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      dayjs(item.date).format('DD/MM/YYYY').includes(search) ||
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.amount.toString().includes(search)
    );
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <section className="bg-gray-50  p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f57600] dark:text-white text-center mb-6">
          Bazar Lists
        </h1>

        <input
          type="text"
          placeholder="Search by name, date, description..."
          className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f57600]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow">
          <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-700 font-bold">
              <tr>
                <th className="px-4 py-2">SL NO</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount (Tk)</th>
              </tr>
            </thead>
            <tbody>
              {filteredBazarList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No data found.
                  </td>
                </tr>
              ) : (
                filteredBazarList.map((item, index) => (
                  <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{dayjs(item.date).format('DD/MM/YYYY')}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.description}</td>
                    <td className="px-4 py-2">{item.amount} Tk</td>
                  </tr>
                ))
              )}
              {/* Total Row */}
              <tr className="bg-[#00b4c5] text-white font-bold">
                <td colSpan="3" className="px-4 py-2 text-right">Total</td>
                <td className="px-4 py-2">{totalBazar} items</td>
                <td className="px-4 py-2">{totalAmount} Tk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BazarList;
