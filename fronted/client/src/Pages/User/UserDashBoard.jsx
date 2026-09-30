import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import ToDayMeal from '../../components/ToDayMeal';
import Acount from '../../components/Acount';
import UserContext from '../../Context/UserContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../components/ErrorFallback';
import MealPlan from '../../components/MealPlan';
import SavedMeals from '../../components/SavedMeals';


const UserDashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const balanceData = location.state || {amount:null,date:null};
  const {user} = useContext( UserContext );

  // Mock user data (simulate logged-in user)
  // const [user, setUser] = useState({
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   role: 'user',
  // });

  // Handle logout
  // const handleLogout = () => {
  //   // setUser(null); // Clear mock user data
  //   navigate('/login'); // Redirect to login page
  // };

  // if (!user) {
  //   return <div className="text-center py-8">Loading...</div>; // Show loading state
  // }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-white shadow sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* User Info Card */}
          <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 sm:p-6'>
            <p className='text-green-800 font-bold text-2xl sm:text-4xl text-center'>{user.fullName}</p>
            <p className='text-orange-700 font-bold text-xl sm:text-4xl text-center mt-2'>{user.Role}</p>
          </div>

          <SavedMeals/>

          {/* <ToDayMeal/> */}
          <Acount balance={balanceData}/>
          {/* <MealPlan/> */}
            

          {/* Action Buttons Grid */}
          <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
            <button
              type="button"
              onClick={() => navigate('/borderlist')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer text-sm sm:text-base"
            >
              Border List
            </button>
            <button
              type="button"
              onClick={() => navigate('/bazarlist')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer text-sm sm:text-base"
            >
              Bazar List
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer text-sm sm:text-base"
            >
              See Profile
            </button>
            <button
              type="button"
              onClick={() => navigate('/mealmonth')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer text-sm sm:text-base"
            >
              Meal Details
            </button>
            <button
              type="button"
              onClick={() => navigate('/mealplan')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer text-sm sm:text-base"
            >
              Plan and Customize
            </button>
            <button
              type="button"
              onClick={() => navigate('/addbazarlist')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer text-sm sm:text-base"
            >
              AddBazarList
            </button>
            <button
              type="button"
              onClick={() => navigate('/managerdashbaord')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer text-sm sm:text-base"
            >
              ManagerDashBoard
            </button>
            <button
              type="button"
              onClick={() => navigate('/pendinglist')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer text-sm sm:text-base"
            >
              PendingList
            </button>
          </div>
        </div>
      </main>
    </div>
    </ErrorBoundary>
  );
};

export default UserDashBoard;



// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 mt-20">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
//         {/* Include the Profile component here */}
//         <Profile />
//             {/* Add other cards or components */} 
//         <Profile /> 
//       </div>
      
//     </div>
//   );
// };

// export default Dashboard;