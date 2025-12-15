import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router";

const AdminMenu = () => {
  return (
    <>
      {/* List item */}
      <li>
        <Link
          to={`/dashboard/all-users`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="All Users"
        >
          {/* user icon */}
          <FaUserAlt />
          <span className="is-drawer-close:hidden">All Users</span>
        </Link>
      </li>

      {/* List item */}
      <li>
        <Link
          to={`/dashboard/manage-books`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Books"
        >
          {/* manage book icon */}
          <MdManageAccounts />
          <span className="is-drawer-close:hidden">Manage Books</span>
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

export default AdminMenu;
