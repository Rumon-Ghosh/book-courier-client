import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";
import { Link, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import LibrarianMenu from "../components/Menu/LibrarianMenu";
import UserMenu from "../components/Menu/UserMenu";
import AdminMenu from "../components/Menu/AdminMenu";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const DashboardLayout = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();

  const [role, isRoleLoading] = useRole();

  const [theme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      navigate("/");
      toast.success("User SignOut successful!");
    } catch (error) {
      toast(error);
    }
  };

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link to={`/`} className="flex items-center">
            <img
              className="w-8 h-8"
              src="https://i.ibb.co/Tx9Hfnhs/icons8-books-48.png"
              alt=""
            />
            <p className="text-lg font-bold">
              Book<span className="text-primary">Courier</span>{" "}
            </p>
          </Link>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={`/dashboard`}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard-Home"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {role === "user" && <UserMenu></UserMenu>}
            {role === "librarian" && <LibrarianMenu></LibrarianMenu>}
            {role === "admin" && <AdminMenu></AdminMenu>}
            {/* List item */}
            <li>
              <button
                onClick={handleLogOutUser}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="SignOut"
              >
                {/* Settings icon */}
                <LuLogOut />
                <span className="is-drawer-close:hidden">SignOut</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
