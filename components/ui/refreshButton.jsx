import React from 'react';
import { RefreshCw } from 'lucide-react';

const RefreshButton = ({ onClick }) => {
  return (
    <button
      className="p-4 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300 "
      onClick={onClick}
      aria-label="Refresh"
    >
      <RefreshCw className="h-5 w-5" />
    </button>
  );
};

export default RefreshButton;