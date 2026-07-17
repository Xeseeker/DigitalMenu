import React from 'react';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white border-b border-secondary-200 shadow-sm fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
              DM
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">Digital Menu</h1>
              <p className="text-xs text-secondary-500">Admin Portal</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-secondary-900">{user?.full_name || 'Admin'}</p>
            <p className="text-xs text-secondary-500">{user?.email || ''}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-lg transition-colors font-medium"
          >
            <FiLogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
