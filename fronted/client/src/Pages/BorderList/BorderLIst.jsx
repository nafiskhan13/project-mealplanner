import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const BorderList = () => {
  const [borders, setBorders] = useState([]); // State to store the border list
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(''); // State to manage errors
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filterBy, setFilterBy] = useState('all'); // State for filter
  const [showFilter, setShowFilter] = useState(false); // State to control filter dropdown

  // Fetch data from the API
  useEffect(() => {
    axios.get('https://mealplannerserverside.onrender.com/api/v1/users/register')
      .then((response) => {
        setBorders(response.data);
        console.log(response.data[0]._id);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch border data');
        setLoading(false);
      });
  }, []);

  // Filter borders based on search term and filter
  const filteredBorders = borders.filter((border) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      border.fullName?.toLowerCase().includes(searchTermLower) ||
      border.email?.toLowerCase().includes(searchTermLower) ||
      border.phoneNumber?.toLowerCase().includes(searchTermLower) ||
      border.Role?.toLowerCase().includes(searchTermLower) ||
      border.RoomNumber?.toString().includes(searchTermLower);

    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'hasDue') return matchesSearch && (border.dueAmount > 0);
    if (filterBy === 'noDue') return matchesSearch && (!border.dueAmount || border.dueAmount === 0);
    if (filterBy === 'active') return matchesSearch && border.Role?.toLowerCase() === 'active';
    if (filterBy === 'inactive') return matchesSearch && border.Role?.toLowerCase() === 'inactive';
    if (filterBy === 'dueLess500') return matchesSearch && (border.dueAmount > 0 && border.dueAmount < 500);
    
    return matchesSearch;
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to Delete this user.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete!"
    });
    if(result.isConfirmed){
      try {
        await axios.delete(`https://mealplannerserverside.onrender.com/api/v1/deleteuser/${id}`,{withCredentials:true})
        toast.success("Deleted successfully");
        
      } catch (error) {
        console.error("Faild to delete",error);
        toast.error("Error");
      }

    }
  };

  const handleSetManager = async (id) => {

    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to promote this user to manager.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, promote!"
    });
    if(result.isConfirmed){
      try {
        await axios.patch(`https://mealplannerserverside.onrender.com/api/v1/setmanager/${id}`,{},{withCredentials:true})
        toast.success("User Set as a Manager");
        
      } catch (error) {
        console.error("Failed to promote",error);
        toast.error("Failed");
      }

    }
  };

  const handleRemoveManager = async (id) =>{
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to Remove this user from  manager.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove!"
    });
    if(result.isConfirmed){
      try {
        await axios.patch(`https://mealplannerserverside.onrender.com/api/v1/removemanager/${id}`,{},{withCredentials:true})
        toast.success("User Set as a Manager");
        
      } catch (error) {
        console.error("Failed to promote",error);
        toast.error("Failed");
      }

    }

  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <section className="bg-white  p-2 sm:p-3 md:p-5">
      <div className="mx-auto max-w-screen-xl px-2 sm:px-4 lg:px-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f57600] dark:text-white mb-4 sm:mb-6 text-center py-2 rounded-lg bg-white">Border Lists</h1>
        <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col space-y-3 p-3 sm:p-4">
            <div className="w-full">
              <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-grow">
                  <label htmlFor="simple-search" className="sr-only text-white">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      id="simple-search" 
                      className="bg-gray-50 border border-gray-300 font-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                      placeholder="Search by name, email, phone, role or room..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <button 
                      type="button" 
                      onClick={() => setShowFilter(!showFilter)}
                      className="flex items-center justify-center text-white bg-[#00b4c5] hover:bg-[#0095a3] focus:ring-4 focus:ring-[#00b4c5] font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200 cursor-pointer w-full sm:w-auto"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                      </svg>
                      Filter
                    </button>
                    {showFilter && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                        <div className="py-2">
                          <button
                            onClick={() => { setFilterBy('all'); setShowFilter(false); }}
                            className={`block w-full text-left px-4 py-2 text-sm ${filterBy === 'all' ? 'bg-gray-100 text-[#00b4c5]' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            All Borders
                          </button>
                          <button
                            onClick={() => { setFilterBy('hasDue'); setShowFilter(false); }}
                            className={`block w-full text-left px-4 py-2 text-sm ${filterBy === 'hasDue' ? 'bg-gray-100 text-[#00b4c5]' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            Has Due Amount
                          </button>
                          <button
                            onClick={() => { setFilterBy('dueLess500'); setShowFilter(false); }}
                            className={`block w-full text-left px-4 py-2 text-sm ${filterBy === 'dueLess500' ? 'bg-gray-100 text-[#00b4c5]' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            Due Amount &lt; 500 Tk
                          </button>
                          <button
                            onClick={() => { setFilterBy('noDue'); setShowFilter(false); }}
                            className={`block w-full text-left px-4 py-2 text-sm ${filterBy === 'noDue' ? 'bg-gray-100 text-[#00b4c5]' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            No Due Amount
                          </button>
                          <button
                            onClick={() => { setFilterBy('active'); setShowFilter(false); }}
                            className={`block w-full text-left px-4 py-2 text-sm ${filterBy === 'active' ? 'bg-gray-100 text-[#00b4c5]' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            Active Borders
                          </button>
                          <button
                            onClick={() => { setFilterBy('inactive'); setShowFilter(false); }}
                            className={`block w-full text-left px-4 py-2 text-sm ${filterBy === 'inactive' ? 'bg-gray-100 text-[#00b4c5]' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            Inactive Borders
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button 
                    type="button" 
                    className="flex items-center justify-center text-white bg-[#00b4c5] hover:bg-[#0095a3] focus:ring-4 focus:ring-[#00b4c5] font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200 cursor-pointer w-full sm:w-auto"
                  >
                    <Link to="/signup" className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add New Border
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    <thead className="text-xs text-black uppercase bg-white font-extrabold dark:bg-gray-700 dark:text-gray-400  sticky top-0">
                      <tr>
                        <th key="sl-no" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">SL NO</th>
                        <th key="full-name" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Full Name</th>
                        <th key="email" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Email</th>
                        <th key="phone" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Phone Number</th>
                        <th key="role" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Role</th>
                        <th key="room" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Room Number</th>
                        <th key="amount" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Amount</th>
                        <th key="due-amount" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Due Amount</th>
                        <th key="actions" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBorders.map((border, index) => (
                        <tr key={`border-${border.id || index}`} className={`border-b dark:border-gray-700 ${index % 2 === 0 ? 'bg-[#00b4c5] text-white font-bold' : 'bg-[#5ba300] text-black font-bold'}`}>
                          <td key={`sl-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{index + 1}</td>
                          <td key={`name-${border.id || index}`} scope="row" className="px-3 py-2 sm:px-4 sm:py-3 font-medium">
                            {border.fullName}
                          </td>
                          <td key={`email-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.email}</td>
                          <td key={`phone-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.phoneNumber || 'N/A'}</td>
                          <td key={`role-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.Role}</td>
                          <td key={`room-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.RoomNumber}</td>
                          <td key={`amount-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.amount || '0'} Tk</td>
                          <td key={`due-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.dueAmount || '0'} Tk</td>
                          <td key={`actions-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-end space-x-2">
                            {/* Conditional Rendaring */}
                            {
                              border.Role === "User" ? (<button 
                              key={`manager-${border.id || index}`}
                              onClick={() => handleSetManager(border._id)} 
                              className="px-2 sm:px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                            >
                              Set As Manager
                            </button>)
                              : border.Role === "Manager" ? (<button 
                              key={`manager-${border.id || index}`}
                              onClick={() => handleRemoveManager(border._id)} 
                              className="px-2 sm:px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                            >
                              Remove Manager
                            </button> ) 
                              : null
                            }
                            <button 
                              key={`delete-${border.id || index}`}
                              onClick={() => handleDelete(border._id)} 
                              className="px-2 sm:px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                            >
                              Delete
                            </button>
                            <button 
                              key={`dropdown-${border.id || index}`}
                              id={`${border.id}-dropdown-button`} 
                              data-dropdown-toggle={`${border.id}-dropdown`} 
                              className="inline-flex items-center p-0.5 text-sm font-medium text-center text-white hover:text-gray-200 rounded-lg focus:outline-none" 
                              type="button"
                            >
                              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 p-3 sm:p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white mx-1">1-{filteredBorders.length}</span>
              of
              <span className="font-semibold text-gray-900 dark:text-white mx-1">{filteredBorders.length}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px text-black bg-white">
              <li>
                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default BorderList;
