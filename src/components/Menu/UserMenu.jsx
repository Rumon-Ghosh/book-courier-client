import React from 'react';
import { FaBagShopping } from "react-icons/fa6";
import { SiWish } from "react-icons/si";
import { ImProfile } from "react-icons/im";
import { PiInvoiceBold } from "react-icons/pi";
import { Link } from 'react-router';


const UserMenu = () => {
  return (
    <>
      {/* List item */}
      <li>
        <Link
          to={`/dashboard/my-orders`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My-Orders"
        >
          {/* add-book icon */}
          <FaBagShopping />
          <span className="is-drawer-close:hidden">My-Orders</span>
        </Link>
      </li>
      {/* List item */}
      <li>
        <Link
          to={`/dashboard/my-wishlist`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My WishList"
        >
          {/* wishlist icon */}
          <SiWish />
          <span className="is-drawer-close:hidden">My WishList</span>
        </Link>
      </li>
      {/* List item */}
      <li>
        <Link
          to={`/dashboard/my-invoice`}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Invoice"
        >
          {/* Invoice icon */}
          <PiInvoiceBold />
          <span className="is-drawer-close:hidden">My Invoice</span>
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

export default UserMenu;