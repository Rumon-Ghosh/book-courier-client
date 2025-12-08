import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";

const MyWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myWishlists = [], isLoading } = useQuery({
    queryKey: ["my-wishlist", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-wishlist/${user?.email}`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  // console.log(myWishlists)
  return (
    <div>
      <h3 className="text-3xl text-center font-bold my-5">
        Here Is Your WishList
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Book Name</th>
              <th>Price</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;
