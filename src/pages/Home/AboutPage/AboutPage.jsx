import { FaBook, FaUsers, FaShippingFast, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">About BookCourier</h1>
        <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
          BookCourier is a modern platform built to connect book lovers, librarians, and readers 
          through a seamless and fast book marketplace experience.
        </p>
      </div>

      {/* Who We Are */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-base-content/70 leading-relaxed">
          We are a passionate team dedicated to making books more accessible. Whether you're a reader looking 
          for your next great story, a librarian publishing new books, or someone managing orders, BookCourier 
          ensures a smooth and user-friendly experience.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-base-content/70 leading-relaxed">
          Our mission is simple — to bring books closer to people. We aim to provide a reliable platform where 
          users can discover, buy, sell, and manage books effortlessly. With secure payments, fast delivery, and 
          clean interface, we empower book lovers everywhere.
        </p>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">What Makes Us Different</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-base-100 shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
            <FaBook className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Wide Book Collection</h3>
            <p className="text-base-content/70">Thousands of books across various genres.</p>
          </div>

          <div className="bg-base-100 shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
            <FaUsers className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Community Driven</h3>
            <p className="text-base-content/70">Readers, admins, and librarians working together.</p>
          </div>

          <div className="bg-base-100 shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
            <FaShippingFast className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
            <p className="text-base-content/70">Your books, delivered swiftly and safely.</p>
          </div>

          <div className="bg-base-100 shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
            <FaShieldAlt className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Secure Payments</h3>
            <p className="text-base-content/70">Protected purchases with trusted payment systems.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-16">
        <Link
          to={`/books`}
          className="btn btn-primary btn-lg">Explore Books</Link>
      </div>
    </div>
  );
};

export default AboutPage;
