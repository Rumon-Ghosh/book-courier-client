import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/my-orders");
      return data;
    },
  });

  // order cancel functionality
  const handleCancelOrder = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Continue!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/orders/cancel/${id}`);

          if (data.modifiedCount) {
            toast.success("Order Cancelled Successfully!");
            refetch();
          }

          Swal.fire({
            title: "Cancelled!",
            text: "Your order has been cancelled.",
            icon: "success",
          });
        } catch (error) {
          toast.error("Order cancellation failed!");
          console.log(error);
        }
      }
    });
  };

  // payment function
  const handlePayment = async (order) => {
  try {
    const paymentInfo = {
      orderId: order._id,
      bookId: order.bookId,
      bookName: order.bookName,
      image: order.image,
      price: order.price,
      userEmail: order.userEmail,
      userName: order.userName,
    };

    const { data } = await axiosSecure.post(
      '/create-checkout-session', paymentInfo);

    window.location.assign(data.url);
  } catch (error) {
    toast.error("Payment failed to initialize");
    console.log(error);
  }
};



  if (isLoading) return <LoadingSpinner />;



  return (
    <div className="p-4">
      {/* Heading */}
      <h3 className="text-3xl font-bold text-center mb-6">
        📚 Your Book Orders
      </h3>

      
      {/* Mobile Cards Layout */}
      <div className="md:hidden">
        {orders.map((order) => (
          <div key={order._id} className="card bg-base-100 shadow-lg mb-4 p-4">
            <h2 className="font-semibold text-lg">{order.bookName}</h2>
            <p className="text-sm">
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">
              Payment Status: <span className="badge badge-neutral">{order.paymentStatus}</span>
            </p> 
            <p className="mt-1">
              Status:{" "}
              <span
                className={`badge ${
                  order.orderStatus === "cancelled"
                    ? "badge-error"
                    : order.orderStatus === "pending"
                    ? "badge-warning"
                    : "badge-success"
                }`}
              >
                {order.orderStatus}
              </span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-3">
              {/* Cancel Button */}
              {order.orderStatus === "pending" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="btn btn-error btn-sm w-full"
                >
                  Cancel Order
                </button>
              )}

              {/* Pay Now */}
              {order.orderStatus === "pending" &&
                order.paymentStatus === "unpaid" && (
                  <button
                    onClick={() => handlePayment(order)}
                    className="btn btn-primary btn-sm w-full"
                  >
                    Pay Now
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block">
        <table className="table table-zebra w-full">
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th>Order Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Cancel</th>
              <th>Pay Now</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{order.bookName}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="font-medium">
                  {order.paymentStatus}
                </td>
                <td>
                  <span
                    className={`badge ${
                      order.orderStatus === "cancelled"
                        ? "badge-error"
                        : order.orderStatus === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                {/* Cancel Button */}
                <td>
                  {order.orderStatus === "pending" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="btn btn-error btn-sm"
                    >
                      Cancel
                    </button>
                  )}
                </td>

                {/* Pay Button */}
                <td>
                  {(order.orderStatus === "pending" &&
                  order.paymentStatus === "unpaid") && (
                    <button
                      onClick={() => handlePayment(order)}
                      className="btn btn-primary btn-sm"
                    >
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-lg text-center mt-6">
            No Orders Get Yet. Please Order Your Favorite Books!.
          </p>
        )}

      </div>
    </div>
  );
};

export default MyOrders;
