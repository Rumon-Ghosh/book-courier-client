import React from 'react';
import { Link } from 'react-router';

const CallToAction = () => {
  return (
     <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Discover Your Next Favorite Book?
        </h2>

        {/* Subheading */}
        <p className="mt-4 text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          Explore thousands of books across all genres. Order now and enjoy fast
          delivery right to your doorstep.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/books"
            className="btn btn-warning text-black font-semibold px-8"
          >
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
