import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookCard from "../../BookCard/BookCard";

// get latest books
const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: latestBools = [] } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const result = await axiosSecure("/latest-books");
      return result.data;
    },
  });
  // console.log(latestBools);
  return (
    <div className="w-11/12 mx-auto mb-14">
      <h3 className="text-4xl text-center font-bold mb-3">
        Explore Our Latest Arrivals
      </h3>
      <p className="text-center mb-10">
        Dive into a curated collection of new fiction, non-fiction, and
        bestsellers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        {latestBools.map((book) => (
          <BookCard key={book._id} book={book}></BookCard>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
