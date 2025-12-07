import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ashiq Rahman",
    role: "Student, Dhaka University",
    image: "https://i.ibb.co/HL4dcfq8/w-412-h-232-imgid-01hp8rzb4dfrdpd7cdeyv9eqq4-imgname-whatsapp-image-2024-02-10-at-11-10-31-am.jpg",
    review: "BookCourier made ordering books so easy! Fast delivery and great packaging. Highly recommended!",
    rating: 5
  },
  {
    name: "James Walker",
    role: "Teacher & Book Lover",
    image: "https://i.ibb.co/psthrDZ/photo-1507003211169-0a1dd7228f2d.jpg",
    review: "The best online book ordering experience. Huge collection and amazing customer support!",
    rating: 4
  },
  {
    name: "Mira Hasan",
    role: "Freelancer",
    image: "https://i.ibb.co/8nvcLgXJ/photo-1534528741775-53994a69daeb.jpg",
    review: "I love the clean interface and wishlist feature. Ordering books has never been this smooth.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Readers Say
          </h2>
          <p className="mt-3 max-w-2xl mx-auto">
            Real experiences from people who ordered books through BookCourier.
            Your satisfaction is our top priority.
          </p>
        </motion.div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-sm">{t.role}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="mb-3">“{t.review}”</p>

              {/* Star Rating */}
              <div className="flex text-yellow-500">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" size={18} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
