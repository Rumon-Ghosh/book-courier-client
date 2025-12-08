import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";

const OwnerOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch orders
  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["ownerOrders", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/orders/owner");
      return result.data;
    },
  });

  // Cancel Order Handler
  const handleCancelOrder = async (id) => {
    try {
      const { data } = await axiosSecure.patch(`/orders/cancel/${id}`);
      if (data.modifiedCount) {
        toast.success("Order Cancelled!");
        refetch();
      }
    } catch (error) {
      toast.error("Cancel failed");
    }
  };

  // Update Order Status Handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await axiosSecure.patch(`/orders/status/${id}`, {
        status: newStatus,
      });

      if (data.modifiedCount) {
        toast.success("Status Updated!");
        refetch();
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        📦 Orders for Your Books
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-lg">
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, idx) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <th>{idx + 1}</th>
                <td>{order.bookName}</td>
                <td>{order.userName}</td>
                <td>{order.phone}</td>

                {/* Status Dropdown */}
                <td>
                  {order.orderStatus !== "cancelled" && (
                    <select
                      className="select select-bordered select-sm"
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  )}
                </td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td>
                  {order.orderStatus === "pending" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="btn btn-error btn-sm text-white flex items-center gap-1"
                    >
                     Cancel
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerOrder;
