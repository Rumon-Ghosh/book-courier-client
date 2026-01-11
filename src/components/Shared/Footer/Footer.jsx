import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content py-10 px-6 mt-10">
      <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-10">

        {/* Quick Links */}
        <div>
          <h3 className="footer-title mb-3">Quick Links</h3>
          <nav className="flex flex-col space-y-2">
            <Link to={`/`} className="link link-hover">Home</Link>
            <Link to={`books`} className="link link-hover">Books</Link>
            <Link to={`/about`} className="link link-hover">About</Link>
            <Link to={`/blog`} className="link link-hover">Blogs</Link>
          </nav>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="footer-title mb-3">Contact</h3>
          <p className="mb-1">📍 123 Library Street, BookTown</p>
          <a href="tel:+880 1234-567890" className="mb-1">📞 +880 1234-567890</a>
          <br />
          <a href="mailto:support@bookverse.com" className="mb-1">✉ support@bookverse.com</a>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="footer-title mb-3">Follow Us</h3>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://www.facebook.com" target="_blank" className="text-xl hover:text-primary cursor-pointer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com" target="_blank" className="text-xl hover:text-primary cursor-pointer">
              <FaInstagram />
            </a>
            <a href="https://x.com" target="_blank" className="text-xl hover:text-primary cursor-pointer">
              <FaXTwitter />
            </a>
            <a href="https://www.youtube.com" target="_blank" className="text-xl hover:text-primary cursor-pointer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-base-content/20 mt-10 pt-6 text-center">
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} BookCourier — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
