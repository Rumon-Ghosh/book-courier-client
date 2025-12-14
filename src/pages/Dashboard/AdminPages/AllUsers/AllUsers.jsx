import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";
import { FaUserShield, FaUserTie, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  // get all users from db
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  // change role by admin ('Librarian', 'Admin')
  const handleChangeUserRole = async (id, role) => {
    // console.log(id, role)
    Swal.fire({
      title: "Are you sure?",
      text: "Changing the role of the user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axiosSecure.patch(`/update-user/${id}`, {
            role: role,
          });
          if (result.data.modifiedCount) {
            Swal.fire({
              title: "Changed!",
              text: "Role has been changed successfully.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error("Wrong! role cannot be changed!");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-11/12 mx-auto my-10"
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        All Registered Users
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md border bg-base-100">
        <table className="table">
          {/* Table Head */}
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Role</th>
              <th>Make Librarian</th>
              <th>Make Admin</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-base-200"
              >
                <th>{index + 1}</th>

                {/* User Info */}
                <td className="flex items-center gap-3">
                  <img
                    src={user.photo}
                    alt="user"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm opacity-70">{user.email}</p>
                  </div>
                </td>

                {/* Role */}
                <td>
                  {user.role === "admin" && (
                    <span className="badge badge-primary gap-1">
                      <FaUserShield /> Admin
                    </span>
                  )}
                  {user.role === "librarian" && (
                    <span className="badge badge-warning gap-1">
                      <FaUserTie /> Librarian
                    </span>
                  )}
                  {user.role === "user" && (
                    <span className="badge gap-1">
                      <FaUser /> User
                    </span>
                  )}
                </td>

                {/* Make Librarian Button */}
                <td>
                  <button
                    onClick={() => handleChangeUserRole(user._id, "librarian")}
                    disabled={user.role === "librarian"}
                    className="btn btn-outline btn-sm"
                  >
                    Make Librarian
                  </button>
                </td>

                {/* Make Admin Button */}
                <td>
                  <button
                    onClick={() => handleChangeUserRole(user._id, "admin")}
                    disabled={user.role === "admin"}
                    className="btn btn-primary btn-sm"
                  >
                    Make Admin
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AllUsers;
