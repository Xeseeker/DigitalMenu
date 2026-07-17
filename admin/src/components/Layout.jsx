import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex pt-16">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
