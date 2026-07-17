import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const Notifications = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-500" size={20} />;
      case 'error':
        return <FiXCircle className="text-red-500" size={20} />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500" size={20} />;
      default:
        return <FiInfo className="text-blue-500" size={20} />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 p-4 rounded-lg border-l-4 shadow-lg ${getStyles(notification.type)} animate-slide-in`}
        >
          {getIcon(notification.type)}
          <p className="flex-1 text-sm font-medium text-secondary-900">
            {notification.message}
          </p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
