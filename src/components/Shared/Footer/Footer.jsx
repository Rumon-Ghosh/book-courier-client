import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content py-10 px-6 mt-10">
      <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-10">

        {/* Quick Links */}
        <div>
          <h3 className="footer-title mb-3">Quick Links</h3>
          <nav className="flex flex-col space-y-2">
            <a className="link link-hover">Home</a>
            <a className="link link-hover">Books</a>
            <a className="link link-hover">Dashboard</a>
            <a className="link link-hover">Service Area</a>
          </nav>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="footer-title mb-3">Contact</h3>
          <p className="mb-1">📍 123 Library Street, BookTown</p>
          <p className="mb-1">📞 +880 1234-567890</p>
          <p className="mb-1">✉ support@bookverse.com</p>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="footer-title mb-3">Follow Us</h3>
          <div className="flex items-center gap-4 mt-2">
            <a className="text-xl hover:text-primary cursor-pointer">
              <FaFacebookF />
            </a>
            <a className="text-xl hover:text-primary cursor-pointer">
              <FaInstagram />
            </a>
            <a className="text-xl hover:text-primary cursor-pointer">
              <FaXTwitter />
            </a>
            <a className="text-xl hover:text-primary cursor-pointer">
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
