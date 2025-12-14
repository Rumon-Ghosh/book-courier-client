import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const OrdersChart = () => {
  const axiosSecure = useAxiosSecure();

  // get data to show a chart of monthly orders
  const { data: formattedData = [] } = useQuery({
    queryKey: ["orders-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders-stats");
      return res.data.map(item => ({
        month: MONTHS[item._id - 1],
        orders: item.count
      }));
    },
  });

  return (
    <div className="bg-base-100 shadow rounded-xl p-2 md:p-6 w-full min-h-75 mt-7">
      <h2 className="text-xl font-semibold mb-4">Orders Per Month</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="orders" stroke="#84cc16" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
