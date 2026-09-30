import React, { useContext } from 'react';
import UserContext from '../Context/UserContext';

const getFirstAndLastName = (fullName = '') => {
  const [firstName, ...rest] = fullName.split(' ');
  return {
    firstName: firstName || '',
    lastName: rest.join(' ') || '',
  };
};

const Profile = () => {
  const { user } = useContext(UserContext);
  const { firstName, lastName } = getFirstAndLastName(user.fullName);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-24 w-24 rounded-full bg-[#e0e7ff] flex items-center justify-center text-4xl font-bold text-[#4f46e5]">
              {firstName.charAt(0)}
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">{user.fullName}</div>
              <div className="text-gray-500 text-sm">{user.Role || 'Product Designer'}</div>
              <div className="text-gray-400 text-xs">{user.location || 'Los Angeles, California, USA'}</div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#4f46e5] text-white hover:bg-[#4338ca] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" />
            </svg>
            Edit Profile
          </button>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-[#4f46e5] text-white hover:bg-[#4338ca] transition">Edit</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'First Name', value: firstName },
              { label: 'Last Name', value: lastName },
              { label: 'Email address', value: user.email },
              { label: 'Phone', value: user.phoneNumber || 'Add+' },
              { label: 'Room Number', value: user.RoomNumber || 'Add+' },
              { label: 'Role', value: user.Role || 'Product Designer' },
              { label: 'Profession', value: user.Role || 'Lecturer' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-xs text-gray-400 uppercase tracking-widest">{item.label}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-[#4f46e5] text-white hover:bg-[#4338ca] transition">Edit</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Country', value: user.country || 'Bangladesh' },
              { label: 'District', value: user.district || 'Not Added' },
              { label: 'Thana', value: user.thana || 'Belkuchi' },
              { label: 'Village', value: user.village || 'Belkuchi' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-xs text-gray-400 uppercase tracking-widest">{item.label}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
