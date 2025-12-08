import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useForm } from "react-hook-form";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  // Fetch single book
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/books/${id}`);
      return data;
    },
  });

  const { register, handleSubmit, formState: {errors}, reset } = useForm()

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const handlePlaceOrder = async (data) => {
    // console.log(data)
    const orderInfo = {
      bookId: book._id,
      bookName: book.bookName,
      price: book.price,
      userName: user.displayName,
      userEmail: user.email,
      phone: data.phone,
      address: data.address,
      owner: book.createdBy,
    };

    try {
      const { data } = await axiosSecure.post("/orders", orderInfo);
      if (data.insertedId) {
        toast.success("Order Placed Successfully!");
        setOpenModal(false);
        navigate('/dashboard/my-orders')
        reset();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleAddWishlist = async () => {
    try {
      const wishlistItem = {
        bookId: book._id,
        bookName: book.bookName,
        image: book.image,
        price: book.price,
        userEmail: user.email,
        username: user.displayName
      };

      const result = await axiosSecure.post("/wishlist", wishlistItem);
      if (result.data.message) {
        return toast.error("This items already added to your wishlist")
      } else {
        toast.success("Added to Wishlist!");
      }
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Book Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        {/* Image */}
        <div className="flex items-center justify-center bg-base-300 py-5 rounded-3xl">
          <img
            src={book.image}
            className="rounded-xl shadow-lg w-42 h-full text-center object-cover"
            alt=""
          />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.bookName}</h1>
          <p className="text-lg opacity-75">by {book.author}</p>

          <span className="badge badge-primary">{book.category}</span>

          <p className="mt-2">{book.description}</p>

          <p className="text-2xl font-semibold">৳ {book.price}</p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setOpenModal(true)}
              className="btn btn-primary"
            >
              Order Now
            </button>

            <button onClick={handleAddWishlist} className="btn btn-secondary">
              Add to Wishlist
            </button>
          </div>
        </div>
      </motion.div>

      {/* Review Section */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-3">Reviews & Ratings</h2>
        <p className="opacity-70">
          If you have ordered this book, you can submit your review.
        </p>

        {/* Review form structure (you can expand later) */}
        <div className="p-5 bg-base-200 rounded-xl mt-4">
          <h3 className="font-semibold mb-3">Write a Review</h3>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your thoughts..."
          ></textarea>

          <div className="mt-4">
            <button className="btn btn-primary">Submit Review</button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {openModal && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4">Place Your Order</h3>

            <form onSubmit={handleSubmit(handlePlaceOrder)} className="space-y-4">
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />

              <input
                type="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                {...register('phone', {required: "Phone Number is required"})}
              />
              {errors.phone && <span className="text-red-500 mt-1">{ errors.phone.message}</span>}

              <textarea
                placeholder="Address"
                className="textarea textarea-bordered w-full"
                {...register('address', {required: 'Address field is required'})}
              ></textarea>
              {errors.address && <span className="text-red-500 mt-1">{ errors.address.message}</span>}

              <button className="btn btn-primary w-full">Place Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
