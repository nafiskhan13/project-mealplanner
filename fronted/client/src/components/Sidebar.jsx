import {
    FaUser,
    FaThLarge,
    FaUtensils,
    FaListAlt,
    FaEnvelope,
    FaBullhorn,
    FaInfoCircle,
    FaSignOutAlt,
  } from 'react-icons/fa';
  import { IoMdClose } from 'react-icons/io';
  
  const Sidebar = ({ isMobile = false, onClose }) => {
    return (
      <div
        className={`bg-white min-h-screen p-4 flex flex-col justify-between shadow-lg transition-transform duration-300
          ${isMobile ? 'w-64 fixed top-0 left-0 z-50 transform translate-x-0' : 'w-64'}
        `}
      >
        {/* Close Button on Mobile */}
        {isMobile && (
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-2xl text-[#1C5D79]">
              <IoMdClose />
            </button>
          </div>
        )}
  
        {/* Top Section */}
        <div>
          {/* Profile */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#D9D9D9] flex items-center justify-center text-[#1C5D79] text-2xl mb-2">
              <FaUser />
            </div>
            <p className="text-sm font-semibold text-center text-[#1C5D79]">Hello! Monin Sheikh</p>
          </div>
  
          {/* Menu */}
          <nav className="space-y-3">
            {[
              { icon: <FaThLarge />, label: 'Dashboard' },
              { icon: <FaUser />, label: 'Your Profile', active: true },
              { icon: <FaUtensils />, label: 'Recipes' },
              { icon: <FaListAlt />, label: 'Plans' },
              { icon: <FaUser />, label: 'Border Lists' },
              { icon: <FaEnvelope />, label: 'Messages' },
              { icon: <FaBullhorn />, label: 'Announcement Bar' },
              { icon: <FaInfoCircle />, label: 'About Us' },
            ].map(({ icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  active
                    ? 'bg-gradient-to-r from-[#1C5D79] to-[#A6CDBA] text-white shadow-lg'
                    : 'text-[#1C5D79] hover:bg-[#A6CDBA]/20'
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </nav>
        </div>
  
        {/* Logout */}
        <div className="mt-6">
          <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#F8F8F8] text-[#1C5D79] text-sm font-medium hover:bg-[#A6CDBA]/20 transition">
            <FaSignOutAlt className="text-lg" />
            <span>Log out</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  