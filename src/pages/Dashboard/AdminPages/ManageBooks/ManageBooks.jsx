import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading, refetch } = useQuery({
    queryKey: ["manage-books"],
    queryFn: async () => {
      try {
        const result = await axiosSecure.get("/all-books");
        return result.data;
      } catch (error) {
        toast.error("Failed to fetch books!");
      }
    },
  });

 
  // Publish / Unpublish Handler
  const handlePublishOrUnpublish = async (id, status) => {
    try {
      const { data } = await axiosSecure.patch(
        `/books/update-status/${id}`,
        { status }
      );

      if (data.modifiedCount > 0) {
        toast.success(`Book ${status} successfully!`);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update status!");
    }
  };

  // -------------------------------
  // DELETE BOOK + Related Orders
  // -------------------------------
  const handleDeleteBook = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this book will also delete all orders related to this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/books/delete/${id}`);

          if (data.deletedBooks && data.deletedOrders) {
            toast.success("Book & related orders deleted!");
            refetch();
          }
        } catch (error) {
          toast.error("Delete failed!");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-11/12 mx-auto mt-6">
      <h2 className="text-3xl font-bold text-center mb-5">📚 Manage Books</h2>

      <div className="overflow-x-auto shadow-lg border rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Image</th>
              <th>Price</th>
              <th>Status</th>
              <th>Publish</th>
              <th>Unpublish</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="hover">
                <td>{index + 1}</td>

                {/* Name */}
                <td className="font-semibold">{book.bookName}</td>

                {/* Image */}
                <td>
                  <img
                    src={book.image}
                    className="w-16 h-16 rounded-md object-cover border"
                    alt=""
                  />
                </td>

                {/* Price */}
                <td>${book.price}</td>

                {/* Status */}
                <td>
                  <span
                    className={`badge ${
                      book.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    } badge-lg`}
                  >
                    {book.status}
                  </span>
                </td>

                {/* PUBLISH */}
                <td>
                  <button
                    onClick={() =>
                      handlePublishOrUnpublish(book._id, "published")
                    }
                    disabled={book.status === "published"}
                    className="btn btn-sm btn-success text-white"
                  >
                    Publish
                  </button>
                </td>

                {/* UNPUBLISH */}
                <td>
                  <button
                    onClick={() =>
                      handlePublishOrUnpublish(book._id, "unpublished")
                    }
                    disabled={book.status === "unpublished"}
                    className="btn btn-sm btn-warning"
                  >
                    Unpublish
                  </button>
                </td>

                {/* DELETE */}
                <td>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
