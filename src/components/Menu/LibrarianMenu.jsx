import React from "react";
import { FaPlus } from "react-icons/fa";
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
    </>
  );
};

export default LibrarianMenu;
