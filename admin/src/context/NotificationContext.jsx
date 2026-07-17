import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications((prev) => [...prev, notification]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const success = (message) => addNotification(message, 'success');
  const error = (message) => addNotification(message, 'error');
  const info = (message) => addNotification(message, 'info');
  const warning = (message) => addNotification(message, 'warning');

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
