import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";

import { MdEdit, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";

const MyBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: writerBooks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["writer-books", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/my-books");
      return result.data;
    },
  });

  const handlePublishOrUnpublish = async (id, status) => {
    try {
      const { data } = await axiosSecure.patch(`/books/update-status/${id}`, {
        status: status,
      });

      if (data.modifiedCount) {
        toast.success("Book status update successful!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to unpublish");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-6">📚 My Books</h2>

      {writerBooks.length === 0 && (
          <p className="text-lg text-center my-3">
            No Books Added Yet. Please Add Book!
          </p>
        )}

      <div className="overflow-x-auto shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-lg">
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Image</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {writerBooks.map((book, idx) => (
              <motion.tr
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <th>{idx + 1}</th>
                <td className="font-medium">{book.bookName}</td>

                {/* Image */}
                <td>
                  <img
                    src={book.image}
                    alt="Book"
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                </td>

                {/* Published Status */}
                <td>
                  {book.status === "published" ? (
                    <span className="badge badge-success">Published</span>
                  ) : (
                    <span className="badge badge-warning">Unpublished</span>
                  )}
                </td>

                {/* Edit Button */}
                <td>
                  <Link to={`/dashboard/edit-book/${book._id}`}>
                    <button className="btn btn-sm btn-info text-white flex items-center gap-1">
                      <MdEdit size={18} /> Edit
                    </button>
                  </Link>
                </td>

                {/* Unpublish Button */}
                <td>
                  {book.status === "published" && (
                    <button
                      // disabled={book.status !== 'published'}
                      onClick={() =>
                        handlePublishOrUnpublish(book._id, "unpublished")
                      }
                      className="btn btn-sm btn-warning flex items-center gap-1"
                    >
                      <MdVisibilityOff size={18} /> Unpublish
                    </button>
                  )}
                  {book.status === "unpublished" && (
                    <button
                      // disabled={book.status !== 'published'}
                      onClick={() =>
                        handlePublishOrUnpublish(book._id, "published")
                      }
                      className="btn btn-sm btn-warning flex items-center gap-1"
                    >
                      <FaEye size={18} /> Publish
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;
