import React from "react";
import { FaRegSmile, FaRegFolderOpen, FaRegClock, FaChartLine } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div className="p-8 min-h-[70vh] flex flex-col items-center justify-center text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-3">
        Welcome to Your Dashboard ✨
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-xl mb-10">
        Access your workspace, manage your activity and stay organized — all in one
        place. Use the sidebar to explore available options.
      </p>

      {/* Neutral Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

        {/* Card 1 */}
        <div className="card bg-base-100 shadow-md hover:shadow-xl p-6 transition-all">
          <FaRegFolderOpen className="text-4xl mx-auto text-primary mb-3" />
          <h3 className="font-semibold text-xl mb-2">Workspace</h3>
          <p className="text-gray-500">
            Navigate through different sections and manage your dashboard content smoothly.
          </p>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-100 shadow-md hover:shadow-xl p-6 transition-all">
          <FaRegClock className="text-4xl mx-auto text-secondary mb-3" />
          <h3 className="font-semibold text-xl mb-2">Recent Activity</h3>
          <p className="text-gray-500">
            Quickly revisit your latest interactions and keep track of updates.
          </p>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 shadow-md hover:shadow-xl p-6 transition-all">
          <FaChartLine className="text-4xl mx-auto text-accent mb-3" />
          <h3 className="font-semibold text-xl mb-2">Insights</h3>
          <p className="text-gray-500">
            View helpful summaries and stay informed about your overall progress.
          </p>
        </div>

      </div>

      {/* Footer message */}
      <p className="mt-10 text-gray-500 text-sm flex items-center gap-1">
        <FaRegSmile /> Have a great experience using your dashboard!
      </p>
    </div>
  );
};

export default DashboardHome;
