import React from "react";

const BooksPageSkeleton = () => {
  return (
    <div className="w-11/12 mx-auto animate-pulse">
      {/* Heading */}
      <div className="my-7 text-center space-y-3">
        <div className="h-8 w-72 bg-base-300 mx-auto rounded"></div>
        <div className="h-4 w-96 bg-base-300 mx-auto rounded"></div>
      </div>

      {/* Search + Filter */}
      <div className="flex justify-between flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="h-12 bg-base-300 rounded w-full md:flex-1"></div>

        {/* Filter & Sort */}
        <div className="flex gap-2 w-full md:w-80">
          <div className="h-12 bg-base-300 rounded w-full"></div>
          <div className="h-12 bg-base-300 rounded w-full"></div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl border border-base-300"
          >
            {/* Image */}
            <div className="h-56 bg-base-300 rounded-t-xl"></div>

            {/* Content */}
            <div className="card-body space-y-3">
              <div className="h-4 w-20 bg-base-300 rounded"></div>
              <div className="h-6 w-3/4 bg-base-300 rounded"></div>
              <div className="h-4 w-1/2 bg-base-300 rounded"></div>

              <div className="space-y-2">
                <div className="h-4 w-full bg-base-300 rounded"></div>
                <div className="h-4 w-5/6 bg-base-300 rounded"></div>
              </div>

              <div className="h-6 w-24 bg-base-300 rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPageSkeleton;
