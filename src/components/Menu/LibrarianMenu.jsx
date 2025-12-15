import React from "react";
import { FaBookOpen, FaPlus, FaShopify } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router";

const LibrarianMenu = () => {
  return (
    <>
      {/* List item */}
      <li>
        <Link
          to={`/dashboard/add-book`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Add Book"
        >
          {/* add-book icon */}
          <FaPlus />
          <span className="is-drawer-close:hidden">Add Book</span>
        </Link>
      </li>
      {/* List item */}
      <li>
        <Link
          to={`/dashboard/my-books`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Books"
        >
          {/* writers books icon */}
          <FaBookOpen />
          <span className="is-drawer-close:hidden">My Books</span>
        </Link>
      </li>
      {/* List item */}
      <li>
        <Link
          to={`/dashboard/orders-collection`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Orders"
        >
          {/* writers orders icon */}
          <FaShopify />
          <span className="is-drawer-close:hidden">Orders</span>
        </Link>
      </li>
      {/* List item */}
      <li>
        <Link
          to={`/dashboard/my-profile`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Profile"
        >
          {/* add-book icon */}
          <ImProfile />
          <span className="is-drawer-close:hidden">My Profile</span>
        </Link>
      </li>
    </>
  );
};

export default LibrarianMenu;
