import React from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
// import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOutUser } = useAuth();

  // Log Out User
  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      toast.success("User SignOut successful!");
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Assignment-11</a>
      </div>
      <div className="flex items-center gap-10">
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
        {!user ? (
          <ul>
            <li>
              <Link className="btn" to={`/login`}>
                Login
              </Link>
            </li>
          </ul>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <button onClick={handleLogOutUser} className="btn">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
