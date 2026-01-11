import React from "react";
import { FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Browse & Choose Books",
      description:
        "Explore our wide collection of books, filter by category, price, or rating, and find the perfect book for you.",
      icon: <FaSearch className="text-4xl text-primary" />,
    },
    {
      id: 2,
      title: "Place Order & Pay Securely",
      description:
        "Add your selected book to the cart, checkout securely using Stripe, and confirm your order in minutes.",
      icon: <FaShoppingCart className="text-4xl text-primary" />,
    },
    {
      id: 3,
      title: "Fast & Reliable Delivery",
      description:
        "Your book will be delivered quickly through our trusted courier partners from the nearest service center.",
      icon: <FaTruck className="text-4xl text-primary" />,
    },
  ];

  return (
    <section className="py-5 md:py-10 bg-base-100">
      <div className="w-11/12 mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How BookCourier Works
        </h2>
        <p className="text-center mb-5 max-w-2xl mx-auto">
          Ordering books from BookCourier is fast, simple, and reliable. Follow
          these easy steps to get your favorite books delivered to your door.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-base-200 rounded-xl shadow-md p-8 text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
