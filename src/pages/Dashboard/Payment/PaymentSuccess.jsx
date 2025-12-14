import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AiFillCheckCircle } from "react-icons/ai";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  // after payment send paymentInfo to database
  useEffect(() => {
    axiosSecure.post(`/payment-success`, { sessionId });
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Success Icon */}
      <AiFillCheckCircle className="text-green-500 text-7xl mb-3" />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-green-600">Payment Successful!</h1>

      {/* Description */}
      <p className="text-lg text-gray-600 max-w-md mb-6">
        Thank you for your purchase. Your payment has been processed successfully.
        You can now view your updated order status.
      </p>

      {/* Transaction ID */}
      {sessionId && (
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-semibold">Payment ID:</span> {sessionId}
        </p>
      )}

      {/* Button */}
      <Link to="/dashboard/my-orders" className="btn btn-primary px-6">
        Go to My Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
