import React from "react";
import { orderApi } from "../lib/api";
import { formatDate } from "../lib/utils";
import {
  useQuery,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
function OrdersPage() {
  const queryClient = useQueryClient();
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll,
  });
  const orders = ordersData.orders || [];
  const updateStatusMutation = useMutation({
    mutationFn: orderApi.updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
  const handlsStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
  };
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-base-content/70">Manage customer orders</p>
      </div>
      {/* orders table*/}

      <div className="card bg-base-100 shadow-2xl">
        <div className="card-body">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-base-content/70">
              <p className="text-xl font-semibold mb-2">No orders Yet</p>
              <p className="text-sm">
                orders will appear here once customers make purchases
              </p>
            </div>
          ) : (
            // herer the orders table
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>OrderId</tr>
                  <tr>Customers</tr>
                  <tr>items</tr>
                  <tr>Total</tr>
                  <tr>status</tr>
                  <tr>Date</tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const totalQuantity = order.orderItem.reduce(
                      (sum, item) => {
                        return sum + item.quantity;
                      },
                      0
                    );
                    return (
                      <tr key={order._id}>
                        <td>
                          {" "}
                          <span className="font-medium">
                            {" "}
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div className="font-medium">
                            {order.shippingAddress.fullName}
                          </div>
                          <div className="text-sm opacity-60">
                            {order.shippingAddress.city},
                            {order.shippingAddress.state}
                          </div>
                        </td>
                        <td>
                          <div className="font-medium">
                            {totalQuantity} items
                          </div>
                          <div className="text-sm opacity-0">
                            {order.orderItems[0]?.name}
                            {order.orderItems.length > 1 &&
                              `+${order.orderItems.length - 1} more`}
                          </div>
                        </td>
                        <td>
                          <span className="font-semibold">
                            ${order.totalPrice.toFixed(2)}
                          </span>
                        </td>
                        <td>
                          <select
                            value={order.status}
                            className="select select-sm"
                            disabled={updateStatusMutation.isPending}
                            onChange={(e) => {
                              handlsStatusChange(order._id, e.target.value);
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">shipped</option>
                            <option value="deliveried">deliveried</option>
                          </select>
                        </td>
                        <td>
                          <span className="text-sm opacity-60">
                            {formatDate(order.createdAt)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
