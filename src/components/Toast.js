import React from 'react';

export const Toast = ({ messages }) => {
  const getToastClasses = (isError) => {
    return isError
      ? 'text-red-8000 border-red-3000 bg-red-500 dark:text-red-400 dark:bg-gray-800 dark:border-red-800'
      : 'text-green-8000 border-green-3000 bg-green-500 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
  };

  const getButtonClasses = (isError) => {
    return isError
      ? 'bg-red-5000 text-red-5000 focus:ring-red-400 hover:bg-red-400 dark:text-red-400 dark:bg-gray-800 dark:hover:bg-gray-700'
      : 'bg-green-5000 text-green-5000 focus:ring-green-400 hover:bg-green-200 dark:text-green-400 dark:bg-gray-800 dark:hover:bg-gray-700';
  };

  return messages.map((msg, index) => (
    <div 
      id={`alert-${index}`} 
      className={`flex items-center p-4 mb-4 ${getToastClasses(msg.isError)}`} 
      role="alert"
    >
      <div className="ml-3 text-ml font-medium">{msg.message}</div>
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
