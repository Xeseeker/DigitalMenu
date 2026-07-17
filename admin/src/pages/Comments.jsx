import React from 'react';
import { FiMessageSquare, FiClock } from 'react-icons/fi';

const Comments = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Comments</h1>
        <p className="text-secondary-500 mt-1">Manage customer feedback and comments</p>
      </div>

      <div className="card">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMessageSquare size={40} className="text-secondary-400" />
          </div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Comments Management</h2>
          <p className="text-secondary-500 mb-6">
            This feature is coming soon. Backend endpoints are being implemented.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
            <FiClock size={18} />
            <span className="text-sm font-medium">Under Development</span>
          </div>
        </div>

        {/* Placeholder Table Structure */}
        <div className="mt-8 border-t border-secondary-200 pt-8">
          <h3 className="text-sm font-medium text-secondary-500 mb-4">PREVIEW: Comments Table Structure</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Comment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Item</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-secondary-100 opacity-50">
                  <td className="py-3 px-4 text-sm text-secondary-400">John Doe</td>
                  <td className="py-3 px-4 text-sm text-secondary-400">Great dish!</td>
                  <td className="py-3 px-4 text-sm text-secondary-400">Grilled Salmon</td>
                  <td className="py-3 px-4 text-sm text-secondary-400">2024-01-15</td>
                  <td className="py-3 px-4 text-sm text-secondary-400">Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
