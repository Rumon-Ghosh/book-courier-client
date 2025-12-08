import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router';

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
    </>
  );
};

export default AdminMenu;