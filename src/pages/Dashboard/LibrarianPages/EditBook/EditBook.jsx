import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { MdCancel } from "react-icons/md";

const EditBook = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch single book
  const { data: book = {}, isLoading, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/books/${id}`);
      return data;
    },
  });

  const handleUpdateBook = async (event) => {
    event.preventDefault();

    const form = event.target;

    const updatedBook = {
      bookName: form.bookName.value,
      author: form.author.value,
      price: Number(form.price.value),
      category: form.category.value,
      description: form.description.value,
    };

    try {
      const { data } = await axiosSecure.patch(`/books/update/${id}`, updatedBook);

      if (data.modifiedCount > 0) {
        toast.success("Book updated successfully!");
        navigate("/dashboard/my-books");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update the book.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-xl bg-base-100 rounded-xl mt-5">
      <h2 className="text-3xl font-bold text-center mb-6">✏️ Edit Book</h2>

      <form onSubmit={handleUpdateBook} className="space-y-4 relative">
        {/* Book Name */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Book Name</span>
          </label>
          <input
            type="text"
            name="bookName"
            defaultValue={book.bookName}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Author</span>
          </label>
          <input
            type="text"
            name="author"
            defaultValue={book.author}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Price ($)</span>
          </label>
          <input
            type="number"
            name="price"
            defaultValue={book.price}
            min="1"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Category</span>
          </label>
          <input
            type="text"
            name="category"
            defaultValue={book.category}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            name="description"
            defaultValue={book.description}
            rows="4"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-full mt-4">Update Book</button>
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="btn-xs btn-outline absolute right-2.5 -top-10">
          <MdCancel /></button>
      </form>
    </div>
  );
};

export default EditBook;
