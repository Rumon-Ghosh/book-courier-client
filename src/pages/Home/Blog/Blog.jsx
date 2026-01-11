import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../provides/AuthContext";

const blogs = [
  {
    id: 1,
    title: "How Online Book Delivery Is Changing Reading Habits",
    date: "March 10, 2025",
    category: "Industry",
    description:
      "Discover how platforms like BookCourier are making books more accessible, faster, and easier for readers across the country.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    id: 2,
    title: "Top 5 Books Every Student Should Read in 2025",
    date: "March 5, 2025",
    category: "Recommendations",
    description:
      "A curated list of must-read books for students to build knowledge, mindset, and career readiness.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 3,
    title: "Why Fast & Reliable Book Delivery Matters",
    date: "February 25, 2025",
    category: "Logistics",
    description:
      "Timely book delivery ensures uninterrupted learning, especially for students and professionals.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  },
];

const Blog = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const onSubscription = () => {
    if (!user) {
      return navigate("/login")
    }
    return toast.success(`Thanks ${user?.displayName} for Subscription`);
  };

  const handleBlog1 = () => {
    window.open("https://www.dailysabah.com/feature/2017/08/29/how-technology-is-changing-our-reading-habits", "_blank");
  };

  const handleBlog2 = () => {
    window.open("https://fivebooks.com/books/best-books-of-2025", "_blank");
  }

  const handleBlog3 = () => {
    window.open("https://yuvraj07.wuaze.com/__trashed", "_blank");
  }

  return (
    <section className="bg-base-100 py-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Our Blog</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Insights, updates, and stories from BookCourier to keep readers and
            learners informed.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="card bg-base-200 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <figure>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>{blog.category}</span>
                  <span>{blog.date}</span>
                </div>

                <h2 className="card-title text-lg">{blog.title}</h2>

                <p className="text-gray-600 text-sm">{blog.description}</p>

                <div className="card-actions mt-4">
                  <button
                    onClick={() =>
                      blog.id === 1
                        ? handleBlog1()
                        : blog.id === 2
                        ? handleBlog2()
                        : handleBlog3()
                    }
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-base-200 p-10 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">
            Want More Reading Insights?
          </h2>
          <p className="text-gray-500 mb-4">
            Subscribe to our newsletter and stay updated with the latest book
            trends and delivery tips.
          </p>
          <button
            onClick={onSubscription}
            className="btn btn-primary">Subscribe Now</button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
