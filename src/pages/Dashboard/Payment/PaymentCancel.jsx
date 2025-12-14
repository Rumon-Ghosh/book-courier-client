import React from "react";
import { Link } from "react-router";
import { MdCancel } from "react-icons/md";

const PaymentCancel = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Cancel Icon */}
      <MdCancel className="text-red-500 text-7xl mb-3" />

      {/* Title */}
      <h2 className="text-4xl font-bold mb-2 text-red-600">
        Payment Cancelled
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-600 max-w-md mb-6">
        It looks like the payment was not completed. If this was a mistake, you
        can try again or review your orders anytime.
      </p>

      {/* Button to go users order */}
      <Link to="/dashboard/my-orders" className="btn btn-outline btn-error px-6">
        Go to My Orders
      </Link>
    </div>
  );
};

export default PaymentCancel;
