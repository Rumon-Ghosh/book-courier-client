import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadImage } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const AddBook = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleBookSubmit = async (data) => {
    // console.log(data)
    const { bookName, author, image, price, status, category, description } = data;
    const imageData = image[0];
    try {
      setDataLoading(true);
      const imageURL = await uploadImage(imageData);
      const bookInfo = {
        bookName,
        author,
        image: imageURL,
        price: parseInt(price),
        status,
        category,
        description
      }
      const result = await axiosSecure.post('/books', bookInfo)
      if (result?.data?.insertedId) {
        toast.success("Book added successfully!")
        navigate('/')
        setDataLoading(false)
      }
    } catch (error) {
      toast(error)
    }
  }

  if(dataLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary">
          Add a New Book
        </h1>
        <p className="text-gray-500 mt-2">
          Fill out the form below to add a new book to the library.
        </p>
      </div>

      {/* Form Card */}
      <div className="card bg-base-100 shadow-xl p-8">
        <form
          onSubmit={handleSubmit(handleBookSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Book Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Book Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter book name"
              className="input input-bordered w-full"
              {...register('bookName', {required: true})}
            />
            {errors.bookName && <span className="text-red-500 mt-1">BooK Name is required</span>}
          </div>

          {/* Author */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Author</span>
            </label>
            <input
              type="text"
              placeholder="Enter author name"
              className="input input-bordered w-full"
              {...register('author', {required: true})}
            />
            {errors.author && <span className="text-red-500 mt-1">Author Name is required</span>}
          </div>

          {/* Book Image URL */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Book Image</span>
            </label>
            <input
              type="file"
              className="input input-bordered w-full"
              {...register('image', {required: true})}
            />
           {errors.image && <span className="text-red-500 mt-1">Image field is required</span>}

          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Price (৳)</span>
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="input input-bordered w-full"
              {...register('price', {required: true})}
            />
            {errors.price && <span className="text-red-500 mt-1">Price field cannot be empty</span>}
          </div>

          {/* Status Dropdown */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register('status', {required: true})}>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
            {errors.status && <span className="text-red-500 mt-1">Book status should be public or private</span>}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <input
              type="text"
              placeholder="Novel, Science, Politics, History..."
              className="input input-bordered w-full"
              {...register('category', {required: true})}
            />
            {errors.category && <span className="text-red-500 mt-1">Book category cannot be empty</span>}
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="Write a short description..."
              {...register('description', {required: true})}
            ></textarea>
            {errors.description && <span className="text-red-500 mt-1">Book description cannot be empty</span>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <input className="btn btn-primary w-full" type="submit" value="Add Book" />
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddBook;
