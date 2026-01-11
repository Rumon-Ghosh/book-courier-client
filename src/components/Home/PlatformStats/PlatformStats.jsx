import React from "react";
import { FaBook, FaUsers, FaTruck, FaShoppingCart } from "react-icons/fa";

const PlatformStats = () => {
  const stats = [
    {
      id: 1,
      title: "Books Available",
      value: "2,200+",
      icon: <FaBook className="text-4xl text-primary" />,
    },
    {
      id: 2,
      title: "Active Users",
      value: "1150+",
      icon: <FaUsers className="text-4xl text-primary" />,
    },
    {
      id: 3,
      title: "Orders Delivered",
      value: "3,500+",
      icon: <FaShoppingCart className="text-4xl text-primary" />,
    },
    {
      id: 4,
      title: "Service Centers",
      value: "45+",
      icon: <FaTruck className="text-4xl text-primary" />,
    },
  ];

  return (
    <section className="bg-base-200 my-5 md:my-10">
      <div className="w-11/12 mx-auto py-8 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Platform Statistics
        </h2>
        <p className="text-center text-lg mb-5">
          Trusted by readers across the country
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-base-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center"
            >
              {stat.icon}
              <h3 className="text-2xl font-bold mt-3">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
