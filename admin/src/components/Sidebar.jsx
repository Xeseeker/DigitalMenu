import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiLayout, FiGrid, FiFolder, FiMessageSquare, FiStar, FiMonitor } from 'react-icons/fi';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiLayout },
    { path: '/menu-items', label: 'Menu Items', icon: FiGrid },
    { path: '/categories', label: 'Categories', icon: FiFolder },
    { path: '/comments', label: 'Comments', icon: FiMessageSquare },
    { path: '/ratings', label: 'Ratings', icon: FiStar },
    { path: '/qr-codes', label: 'QR Codes', icon: FiMonitor },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-full bg-white border-r border-secondary-200 z-20 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:top-0 w-64`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => closeSidebar()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
