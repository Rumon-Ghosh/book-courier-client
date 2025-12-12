import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaBookReader, FaShieldAlt, FaHeadset } from "react-icons/fa";

const WhyUs = () => {
  const features = [
    {
      id: 1,
      title: "Fast Home Delivery",
      description:
        "Get your favorite books delivered right to your doorstep—quick, safe, and hassle-free.",
      icon: <FaTruck className="text-5xl text-primary" />,
    },
    {
      id: 2,
      title: "Access to Rare Books",
      description:
        "Explore thousands of books including rare editions available only in libraries.",
      icon: <FaBookReader className="text-5xl text-primary" />,
    },
    {
      id: 3,
      title: "Secure System",
      description:
        "Your orders, profile, and payments are fully protected with multi-layer security.",
      icon: <FaShieldAlt className="text-5xl text-primary" />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description:
        "Our support team is always ready to assist you with anything you need.",
      icon: <FaHeadset className="text-5xl text-primary" />,
    },
  ];

  return (
    <div className="py-8 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Why Choose BookCourier?</h2>
        <p className="mt-3 text-base max-w-2xl mx-auto">
          We make borrowing and delivering books easier, faster, and more reliable than ever.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: item.id * 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer text-center"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm opacity-75">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
