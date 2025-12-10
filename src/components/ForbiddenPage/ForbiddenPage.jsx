import React from 'react';
import { Link } from 'react-router';

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-6">
      <title>Error</title>
      <h1 className="text-9xl font-extrabold text-error drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-bold mt-2">
        Oops! Forbidden Access
      </h2>
      <p className="mt-3 max-w-md">
        This Page You Are Looking For Isn't Allowed For You. Forbidden Access Blocked by Security!.
      </p>

      {/* Back button */}
      <Link to="/" className="btn btn-primary mt-10">
        ⬅ Back to Home
      </Link>

      {/* Small CSS animation (add to global.css or tailwind base layer) */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ForbiddenPage;