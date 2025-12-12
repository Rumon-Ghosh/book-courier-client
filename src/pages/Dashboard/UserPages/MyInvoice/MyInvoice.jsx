import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const MyInvoice = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["my-invoice", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-invoice");
      return res.data;
    },
  });

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-6">
      {/* Heading */}
      <h3 className="text-3xl font-bold text-center mb-6">
        🧾 Payment Invoices
      </h3>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 overflow-x-auto">
        {invoices.map((inv) => (
          <div
            key={inv._id}
            className="card bg-base-100 shadow-md p-4 border border-gray-200"
          >
            <h2 className="font-semibold text-lg">{inv.bookName}</h2>

            <p className="text-sm mt-1">
              <span className="font-medium">Amount:</span> ${inv.price}
            </p>

            <p className="text-sm">
              <span className="font-medium">Paid Date:</span>{" "}
              {new Date(inv.paidAt).toDateString()}
            </p>

            <p className="text-sm wrap-break-words">
              <span className="font-medium">Payment ID:</span>{" "}
              {inv.transactionId}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="table table-zebra w-full">
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Amount</th>
              <th>Paid Date</th>
              <th>Payment ID</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv, index) => (
              <tr key={inv._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{inv.bookName}</td>
                <td>${inv.price}</td>
                <td>{new Date(inv.paidAt).toDateString()}</td>
                <td className="wrap-break-words text-sm">{inv.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No invoices */}
      {invoices.length === 0 && (
        <p className="text-center mt-10 text-lg">
          No invoices found.
        </p>
      )}
    </div>
  );
};

export default MyInvoice;
