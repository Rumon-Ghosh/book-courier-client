import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useForm } from "react-hook-form";
import useRole from "../../../hooks/useRole";
import { AiFillStar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import ErrorPage from "../../ErrorPage/ErrorPage";

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();

  const [openModal, setOpenModal] = useState(false);

  // Fetch single book
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/books/${id}`);
      return data;
    },
  });

  // bookReview connect from database
  const {
    data: reviews = [],
    isLoading: reviewLoading,
    refetch,
  } = useQuery({
    queryKey: ["book-review", id],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/book-review/${id}`);
        return data;
      } catch (error) {
        toast.error("Cannot get reviews from server!");
        console.log(error);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (!isValidObjectId(id)) return <ErrorPage></ErrorPage>
  
  if (isLoading || isRoleLoading) return <LoadingSpinner></LoadingSpinner>;

  // order send to database the get in the payment page
  const handlePlaceOrder = async (data) => {
    // console.log(data)
    const orderInfo = {
      bookId: book._id,
      bookName: book.bookName,
      image: book.image,
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
        navigate("/dashboard/my-orders");
        reset();
      }
    } catch (err) {
      toast.error("Error-> Order can't send!");
    }
  };

  // wishlist send to database
  const handleAddWishlist = async () => {
    try {
      const wishlistItem = {
        bookId: book._id,
        bookName: book.bookName,
        image: book.image,
        price: book.price,
        userEmail: user.email,
        username: user.displayName,
      };

      const result = await axiosSecure.post("/wishlist", wishlistItem);
      if (result.data.message) {
        return toast.error("This items already added to your wishlist");
      } else {
        toast.success("Added to Wishlist!");
      }
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  // bookReview send to database
  const handleAddReview = async (e) => {
    try {
      e.preventDefault();
      const reviewData = e.target.review.value;
      const reviewInfo = {
        bookId: id,
        review: reviewData,
        reviewedBy: user?.displayName,
      };
      const { data } = await axiosSecure.post("/book-review", reviewInfo);
      if (data.insertedId) {
        toast.success("Thanks for your feedback!");
        e.target.reset();
        refetch();
      }
    } catch (error) {
      toast.error("Error on sending reviews!");
      console.log(error);
    }
  };

  if (reviewLoading) return <LoadingSpinner></LoadingSpinner>;

  // console.log(reviews)
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

          <div className="flex gap-5 items-center">
            <p className="text-lg font-medium">Category: </p>
            <span className="badge badge-primary">{book.category}</span>
          </div>

          <p className="mt-2">{book.description}</p>

          <p className="text-2xl font-semibold">৳ {book.price}</p>

          <div className="flex gap-3 mt-5">
            <button
            disabled={role !== "user" || book.status === "unpublished"}
              onClick={() => setOpenModal(true)}
              className="btn btn-primary"
            >
              Order Now
            </button>

            <button
              disabled={role !== "user" || book.status === "unpublished"}
              onClick={handleAddWishlist}
              className="btn btn-secondary"
            >
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
          <form onSubmit={handleAddReview}>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your thoughts..."
              name="review"
            ></textarea>

            <div className="mt-4">
              <button className="btn btn-primary">Submit Review</button>
            </div>
          </form>
        </div>
      </div>

      {/* Reviews List */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <AiFillStar className="text-yellow-500 text-3xl" />
          Here Is Latest 5 Reviews Of This Book
        </h3>

        {reviews.length === 0 && (
          <p className="text-lg">
            No reviews yet. Be the first to review!
          </p>
        )}

        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-base-100 shadow-xl border rounded-xl p-5"
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-4xl" />

                <div className="flex-1">
                  <p className="font-semibold text-lg">{review.reviewedBy}</p>
                  <p className="text-sm">
                    {new Date(review.reviewedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Star (visual review indicator) */}
                <AiFillStar className="text-yellow-500 text-2xl" />
              </div>

              {/* Review text */}
              <p className="mt-3 leading-relaxed">
                {review.review}
              </p>
            </div>
          ))}
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

            <form
              onSubmit={handleSubmit(handlePlaceOrder)}
              className="space-y-4"
            >
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
                {...register("phone", { required: "Phone Number is required" })}
              />
              {errors.phone && (
                <span className="text-red-500 mt-1">
                  {errors.phone.message}
                </span>
              )}

              <textarea
                placeholder="Address"
                className="textarea textarea-bordered w-full"
                {...register("address", {
                  required: "Address field is required",
                })}
              ></textarea>
              {errors.address && (
                <span className="text-red-500 mt-1">
                  {errors.address.message}
                </span>
              )}

              <button className="btn btn-primary w-full">Place Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
