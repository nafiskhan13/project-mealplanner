import React, { useState } from "react";

export const NotificationList = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Message", description: "You have a new message from Alex." },
    { id: 2, title: "Payment Received", description: "Your payment has been received successfully." },
    { id: 3, title: "Update Available", description: "A new update is available for your app." },
  ]);

  const clearNotifications = () => setNotifications([]);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow max-w-md w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Notifications</h2>
        <button
          onClick={clearNotifications}
          className="text-sm text-white bg-transparent hover:bg-white/10 rounded-md px-3 py-1 transition"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
            >
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-gray-200">{notification.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-300">No notifications ✨</p>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
