import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
    >
      <Link to={`/book/${book._id}`}>
        {/* Image */}
        <figure className="h-56">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            src={book.image}
            alt={book.bookName}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Content */}
        <div className="card-body">
          {/* Category + Status */}
          <div className="flex justify-between items-center">
            <span className="badge badge-primary uppercase">
              {book.category}
            </span>

            <span
              className={`badge ${
                book.status === "published" ? "badge-success" : "badge-warning"
              }`}
            >
              {book.status}
            </span>
          </div>

          {/* Title */}
          <h2 className="card-title text-xl font-bold">{book.bookName}</h2>

          {/* Author */}
          <p className="text-sm opacity-70">by {book.author}</p>

          {/* Description */}
          <p className="text-sm mt-2 line-clamp-2">{book.description}</p>

          {/* Price + Button */}
          <div className="card-actions justify-between items-center mt-4">
            <p className="font-semibold text-lg">৳ {book.price}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
