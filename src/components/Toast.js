import React from 'react';

export const Toast = ({ messages }) => {
  const getToastClasses = (isError) => {
    return isError
      ? 'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800'
      : 'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
  };

  const getButtonClasses = (isError) => {
    return isError
      ? 'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:text-red-400 dark:bg-gray-800 dark:hover:bg-gray-700'
      : 'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:text-green-400 dark:bg-gray-800 dark:hover:bg-gray-700';
  };

  return messages.map((msg, index) => (
    <div 
      id={`alert-${index}`} 
      key={`alert-${index}`} 
      className={`flex items-center p-4 mb-4 border-t-4 ${getToastClasses(msg.isError)}`} 
      role="alert"
    >
      <div className="ml-3 text-sm font-medium">{msg.message}</div>
      <button 
        type="button" 
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${getButtonClasses(msg.isError)}`}
        data-dismiss-target={`#alert-${index}`} 
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
      </button>
    </div>
  ));
};
