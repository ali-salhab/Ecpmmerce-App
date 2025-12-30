import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSignIcon,
  PackageIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react";
import { orderApi, statsApi } from "./../lib/api";
import { getOrderStatusBadge, formatDate, capitalizeText } from "../lib/utils";
function DashboardPage() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll,
  });
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: statsApi.getDashboard,
  });
  console.log("----ordersData----");

  console.log(ordersData);

  const recentOrders =
    ordersData && ordersData.orders ? ordersData.orders.slice(0, 5) : [];

  const statsCards = [
    {
      name: "Total Revenue",
      value: statsLoading
        ? "...."
        : `$${Number(statsData.totalRevenue || 0).toFixed(2)}`,
      icon: <DollarSignIcon className="size-8" />,
    },
    {
      name: "Total Orders",
      value: statsLoading ? "...." : statsData.totalOrders || 0,
      icon: <ShoppingBagIcon className="size-4" />,
    },
    {
      name: "Total Products",
      value: statsLoading ? "...." : statsData.totalProducts || 0,
      icon: <UserIcon className="size-4" />,
    },
    {
      name: "Total Customers",
      value: statsLoading ? "...." : statsData.totalCustomers || 0,
      icon: <PackageIcon className="size-4" />,
    },
  ];

  console.log(statsData, statsLoading);
  return (
    <div className="space-y-6">
      {/* states */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-md w-full bg-base-100">
        {statsCards.map((card) => (
          <div key={card.name} className="stat">
            <div className="stat-figure text-primary">{card.icon}</div>
            <div className="stat-title">{card.name}</div>
            <div className="stat-value">{card.value}</div>
          </div>
        ))}
      </div>
      {/* recent orders */}
      <div className="card bg-base-100 shadow-md"></div>
      <div className="card-body">
        <h2 className="card-title">Recent Orders</h2>
        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : ordersData && ordersData.length > 0 ? (
          <div className="overflow-x-auto">
            {" "}
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th> Amount</th>

                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="font-medium">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="font-medium">
                        {order.shippingAddress.fullName}
                      </div>
                      <div className="text-sm opacity-50">
                        {order.orderItems.length} items(s)
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        {order.orderItems[0].name}
                        {order.orderItems.length > 1
                          ? ` + ${order.orderItems.length - 1} more`
                          : ""}
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold">
                        {order.totalPrice.toFixed(2)} USD
                      </span>
                    </td>
                    <td>
                      <div
                        className={`badge ${getOrderStatusBadge(order.status)}`}
                      >
                        {capitalizeText(order.status)}
                      </div>
                    </td>
                    <td>
                      <span className="text-sm opacity-40">
                        {formatDate(order.createdAt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No recent orders found.</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
