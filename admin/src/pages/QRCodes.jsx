import React, { useState } from 'react';
import { FiMonitor, FiDownload, FiCopy, FiRefreshCw } from 'react-icons/fi';
import api from '../lib/api';
import { useNotification } from '../context/NotificationContext';

const QRCodes = () => {
  const [qrData, setQrData] = useState({
    restaurantName: '',
    menuUrl: '',
    size: 'medium',
  });
  const [generatedQR, setGeneratedQR] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success, error } = useNotification();

  const handleGenerate = async () => {
    if (!qrData.restaurantName || !qrData.menuUrl) {
      error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/admin/qr/generate', qrData);
      setGeneratedQR(response.data.qrCode);
      success('QR code generated successfully');
    } catch (err) {
      error(err.response?.data?.message || 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get('/api/admin/qr/download', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `menu-qr-code.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      success('QR code downloaded successfully');
    } catch (err) {
      error('Failed to download QR code');
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(qrData.menuUrl);
    success('URL copied to clipboard');
  };

  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return 'w-32 h-32';
      case 'medium':
        return 'w-48 h-48';
      case 'large':
        return 'w-64 h-64';
      default:
        return 'w-48 h-48';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">QR Codes</h1>
        <p className="text-secondary-500 mt-1">Generate QR codes for your restaurant menu</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Generator Form */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-6">Generate QR Code</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Restaurant Name *
              </label>
              <input
                type="text"
                value={qrData.restaurantName}
                onChange={(e) => setQrData({ ...qrData, restaurantName: e.target.value })}
                className="input-field"
                placeholder="e.g., The Golden Fork"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Menu URL *
              </label>
              <input
                type="url"
                value={qrData.menuUrl}
                onChange={(e) => setQrData({ ...qrData, menuUrl: e.target.value })}
                className="input-field"
                placeholder="https://yourrestaurant.com/menu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                QR Code Size
              </label>
              <select
                value={qrData.size}
                onChange={(e) => setQrData({ ...qrData, size: e.target.value })}
                className="input-field"
              >
                <option value="small">Small (128x128)</option>
                <option value="medium">Medium (192x192)</option>
                <option value="large">Large (256x256)</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FiMonitor size={20} />
                  Generate QR Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* QR Code Preview */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-6">Preview</h2>
          
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            {generatedQR ? (
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
                  <img
                    src={generatedQR}
                    alt="Generated QR Code"
                    className={`${getSizeClass(qrData.size)} mx-auto`}
                  />
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handleDownload}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <FiDownload size={18} />
                    Download QR Code
                  </button>
                  <button
                    onClick={handleCopyUrl}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <FiCopy size={18} />
                    Copy Menu URL
                  </button>
                  <button
                    onClick={() => {
                      setGeneratedQR(null);
                      setQrData({ restaurantName: '', menuUrl: '', size: 'medium' });
                    }}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <FiRefreshCw size={18} />
                    Generate New
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-secondary-400">
                <FiMonitor size={64} className="mx-auto mb-4" />
                <p className="text-lg font-medium">No QR Code Generated</p>
                <p className="text-sm mt-2">Fill in the form and click generate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card mt-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">How to Use QR Codes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-medium text-secondary-900 mb-1">Generate</h3>
              <p className="text-sm text-secondary-500">Create a QR code for your restaurant menu using the form above</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium text-secondary-900 mb-1">Download</h3>
              <p className="text-sm text-secondary-500">Download the generated QR code image in high quality</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-medium text-secondary-900 mb-1">Display</h3>
              <p className="text-sm text-secondary-500">Print and place the QR code on tables for customers to scan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodes;
