import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../ErrorPage/ErrorPage";

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role, roleLoading] = useRole();
  const [openModal, setOpenModal] = useState(false);

  /* ---------------- Fetch Book ---------------- */
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book-details", id],
    enabled: isValidObjectId(id),
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  // related book fetch
  const { data: relatedBooks = [], isLoading: relatedLoading } = useQuery({
    queryKey: ["related-books", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/related-books/${id}`);
      return res.data;
    },
  });

  /* ---------------- Fetch Reviews ---------------- */
  const {
    data: reviews = [],
    isLoading: reviewLoading,
    refetch,
  } = useQuery({
    queryKey: ["book-reviews", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-review/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (!isValidObjectId(id)) return <ErrorPage />;
  if (isLoading || reviewLoading || roleLoading || relatedLoading)
    return <LoadingSpinner />;

  /* ---------------- Order ---------------- */
  const handleOrderSubmit = async (data) => {
    if (!user) return navigate("/login");

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

    const res = await axiosSecure.post("/orders", orderInfo);
    if (res.data.insertedId) {
      toast.success("Order placed successfully");
      setOpenModal(false);
      navigate("/dashboard/my-orders");
      reset();
    }
  };

  /* ---------------- Wishlist ---------------- */
  const handleWishlist = async () => {
    if (!user) return navigate("/login");

    const wishlistItem = {
      bookId: book._id,
      bookName: book.bookName,
      image: book.image,
      price: book.price,
      userEmail: user.email,
    };

    const res = await axiosSecure.post("/wishlist", wishlistItem);
    if (res.data.message) {
      toast.error(res.data.message);
    } else {
      toast.success("Added to wishlist");
    }
  };

  // reviews handling function
  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    const reviewText = e.target.review.value;
    if (!reviewText) return toast.error("Review is required");

    const res = await axiosSecure.post("/book-review", {
      bookId: id,
      review: reviewText,
      reviewedBy: user.displayName,
    });

    if (res.data.insertedId) {
      toast.success("Review submitted");
      e.target.reset();
      refetch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
      {/* OVERVIEW */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 gap-10"
      >
        <div className="bg-base-200 rounded-2xl p-6 flex justify-center">
          <img
            src={book.image}
            alt={book.bookName}
            className="rounded-xl max-h-105 object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.bookName}</h1>
          <p className="opacity-70">Author: {book.author}</p>

          <div className="flex gap-3">
            <span className="badge badge-primary">{book.category}</span>
            <span className="badge badge-info">{book.createdBy}</span>
          </div>

          <p className="leading-relaxed">{book.description}</p>

          <p className="text-2xl font-semibold">৳ {book.price}</p>

          <div className="flex gap-3 pt-4">
            <button
              disabled={role !== "user" || book.status === "unpublished"}
              onClick={() => setOpenModal(true)}
              className="btn btn-primary"
            >
              Order Now
            </button>

            <button
              disabled={role !== "user" || book.status === "unpublished"}
              onClick={handleWishlist}
              className="btn btn-secondary"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </motion.section>

      {/* SPECIFICATIONS */}
      <section className="bg-base-200 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Book Information</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          <li>
            <strong>Category:</strong> {book.category}
          </li>
          <li>
            <strong>Status:</strong> {book.status}
          </li>
          <li>
            <strong>Price:</strong> ৳ {book.price}
          </li>
          <li>
            <strong>Added By:</strong> {book.createdBy}
          </li>
        </ul>
      </section>

      {/* REVIEWS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>

        <form
          onSubmit={handleReview}
          className="bg-base-200 p-5 rounded-xl mb-6"
        >
          <textarea
            name="review"
            className="textarea textarea-bordered w-full"
            placeholder="Write your review"
          />
          <button className="btn btn-primary mt-3">Submit Review</button>
        </form>

        {reviews.length === 0 && <p>No reviews yet. Be the first!</p>}

        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="bg-base-100 border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle className="text-3xl" />
                <div>
                  <p className="font-semibold">{r.reviewedBy}</p>
                  <p className="text-sm opacity-60">
                    {new Date(r.reviewedAt).toLocaleDateString()}
                  </p>
                </div>
                <AiFillStar className="text-yellow-500 ml-auto" />
              </div>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED ITEMS */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-6">Related Books</h2>

        {relatedLoading && <LoadingSpinner />}

        {!relatedLoading && relatedBooks.length === 0 && (
          <p className="opacity-70">No related books found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedBooks.map((book) => (
            <div
              key={book._id}
              className="card bg-base-100 shadow-md border rounded-xl"
            >
              <figure className="h-48">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body p-4">
                <h3 className="font-semibold line-clamp-1">{book.bookName}</h3>

                <p className="text-sm opacity-70">৳ {book.price}</p>

                <Link
                  to={`/book/${book._id}`}
                  className="btn btn-primary btn-sm mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  ORDER MODAL  */}
      {openModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Place Order</h3>

            <form
              onSubmit={handleSubmit(handleOrderSubmit)}
              className="space-y-4"
            >
              <input
                readOnly
                value={user?.displayName}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={user?.email}
                className="input input-bordered w-full"
              />

              <input
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">Phone required</p>
              )}

              <textarea
                {...register("address", { required: true })}
                placeholder="Address"
                className="textarea textarea-bordered w-full"
              />

              <button className="btn btn-primary w-full">Confirm Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
