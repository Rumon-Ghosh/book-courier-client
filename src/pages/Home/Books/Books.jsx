import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookCard from "../../../components/BookCard/BookCard";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const Books = () => {
  const [searchText, setSearchText] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1)
  const limit = 10;

  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["all-books", searchText, price, page, limit],
    queryFn: async () => {
      const result = await axiosSecure(
        `/books?search=${searchText}&sort=${price}&page=${page}&limit=${limit}`
      );
      return result.data;
    },
  });

  const books = data?.books || [];
  const totalPage = data?.totalPages || 1


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setSearchText(searchValue);
    e.target.reset();
  };

  
// console.log(totalPage)
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-11/12 mx-auto">
      <div className="my-7">
        <h3 className="text-4xl font-bold text-center mb-3">
          Our Complete Library
        </h3>
        <p className="text-center">
          Browse all available books curated just for you.
        </p>
      </div>

      {/* Search & Sort */}
      <div className="flex justify-between flex-col md:flex-row gap-4">

        {/* Search Form */}
        <form
          className="flex-1"
          onSubmit={handleSearchSubmit}>
          <label className="input flex items-center gap-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              name="search"
              defaultValue={searchText}
              type="text"
              className="grow"
              placeholder="Search"
            />
          </label>
        </form>

        {/* Sort Form */}
        <form className="w-48">
          <select
            onChange={(e) => setPrice(e.target.value)}
            className="select w-full">
            <option value="">Sort By</option>
            <option value="low-to-high">Price — Low to High</option>
            <option value="high-to-low">Price — High to Low</option>
          </select>
        </form>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary">Prev
        </button>
        <p className="text-lg font-bold"> {page}</p>
        <button
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
          className="btn btn-primary">Next</button>
      </div>
    </div>
  );
};

export default Books;
