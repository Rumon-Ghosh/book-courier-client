import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: myWishlists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-wishlist", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-wishlist/${user?.email}`);
      return result.data;
    },
  });

  const handleDeleteWishList = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "WishList wil be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axiosSecure.delete(`/wishlist/${id}`);
          // console.log(result)
          if (result.data.deletedCount) {
            toast.success("WishList removed successfully");
            refetch();
          }
        } catch (error) {
          toast.error("WishList cannot delete -> error");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  // console.log(myWishlists)
  return (
    <div>
      <h3 className="text-3xl text-center font-bold my-5">
        Here Is Your WishList
      </h3>
      <div className="overflow-x-auto">
        {myWishlists.length === 0 && (
          <p className="text-lg text-center my-3">
            You Don't Add Any Book To WishList Yet! Make A WishLis Of Your
            Favorite Books!
          </p>
        )}

        <table className="table table-zebra overflow-x-scroll">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Book Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myWishlists.map((list, index) => (
              <tr key={list?._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="w-14 h-14 rounded-full"
                    src={list?.image}
                    alt="book_image"
                  />
                </td>
                <td>{list?.bookName}</td>
                <td>{list?.price}</td>
                <td>
                  <button
                    onClick={() => handleDeleteWishList(list._id)}
                    className="btn btn-primary btn-xs"
                  >
                    Remove
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

export default MyWishlist;
