import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Notifications from './components/Notifications';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MenuItems from './pages/MenuItems';
import Categories from './pages/Categories';
import Comments from './pages/Comments';
import Ratings from './pages/Ratings';
import QRCodes from './pages/QRCodes';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/menu-items" element={<MenuItems />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/comments" element={<Comments />} />
                      <Route path="/ratings" element={<Ratings />} />
                      <Route path="/qr-codes" element={<QRCodes />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
          <Notifications />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
