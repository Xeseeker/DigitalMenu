import React from 'react';
import { FiStar, FiClock } from 'react-icons/fi';

const Ratings = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Ratings</h1>
        <p className="text-secondary-500 mt-1">View and analyze customer ratings</p>
      </div>

      <div className="card">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiStar size={40} className="text-secondary-400" />
          </div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Ratings Overview</h2>
          <p className="text-secondary-500 mb-6">
            This feature is coming soon. Backend endpoints are being implemented.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
            <FiClock size={18} />
            <span className="text-sm font-medium">Under Development</span>
          </div>
        </div>

        {/* Placeholder Statistics */}
        <div className="mt-8 border-t border-secondary-200 pt-8">
          <h3 className="text-sm font-medium text-secondary-500 mb-4">PREVIEW: Ratings Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-secondary-50 rounded-lg p-4 text-center opacity-50">
              <p className="text-2xl font-bold text-secondary-900">4.5</p>
              <p className="text-xs text-secondary-500">Average Rating</p>
            </div>
            <div className="bg-secondary-50 rounded-lg p-4 text-center opacity-50">
              <p className="text-2xl font-bold text-secondary-900">128</p>
              <p className="text-xs text-secondary-500">Total Ratings</p>
            </div>
            <div className="bg-secondary-50 rounded-lg p-4 text-center opacity-50">
              <p className="text-2xl font-bold text-secondary-900">5★</p>
              <p className="text-xs text-secondary-500">Highest Rated</p>
            </div>
            <div className="bg-secondary-50 rounded-lg p-4 text-center opacity-50">
              <p className="text-2xl font-bold text-secondary-900">1★</p>
              <p className="text-xs text-secondary-500">Lowest Rated</p>
            </div>
          </div>
        </div>

        {/* Placeholder Rating Distribution */}
        <div className="mt-8 border-t border-secondary-200 pt-8">
          <h3 className="text-sm font-medium text-secondary-500 mb-4">PREVIEW: Rating Distribution</h3>
          <div className="space-y-3 opacity-50">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm text-secondary-600 w-12">{star} ★</span>
                <div className="flex-1 bg-secondary-200 rounded-full h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded-full"
                    style={{ width: `${star * 20}%` }}
                  />
                </div>
                <span className="text-sm text-secondary-600 w-12">{star * 10}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
