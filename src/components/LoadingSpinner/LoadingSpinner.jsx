import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className='h-[40vh] w-full flex items-center justify-center'>
      <span className="loading loading-spinner loading-5xl"></span>
    </div>
  );
};

export default LoadingSpinner;