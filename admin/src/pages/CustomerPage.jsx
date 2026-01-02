import React from "react";
import { useQuery } from "@tanstack/react-query";
import { customerApi } from "../lib/api";
import { formatDate } from "../lib/utils";
function CustomerPage() {
  const { data: customersData, isLoding } = useQuery({
    queryKey: ["customers"],
    queryFn: customerApi.getAll,
  });
  const customers = customersData?.customers || [];
  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold">customers</h1>
        <p className="text-base-content/70 mt-1">
          {customers.length}
          {customers.length === 1 ? "customer" : "customers"} registered
        </p>
      </div>
      {/*  customers table*/}
      <div className="card bg-base-100 shadow-2xl">
        <div className="card-body">
          {isLoding ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-12 text-base-content/70">
              <p className="text-xl font-semibold mb-2">No customers Yet </p>
              <p className="text-sm">
                Customers will Appear here once they sign up
              </p>
            </div>
          ) : (
            // customers table
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Addresses</th>
                    <th>Wishlist</th>
                    <th>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => {
                    return (
                      <tr key={customer._id}>
                        <td className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-12">
                              <img
                                src={customer.ImageUrl}
                                alt={customer.name}
                                className="w-12 h-12 rounded-full"
                              />
                            </div>
                          </div>
                          <div className="font-semibold">{customer.name}</div>
                        </td>

                        <td>{customer.email}</td>
                        <td>
                          <div className="badge badge-ghost">
                            {customer.addresses.length || 0} addresses
                          </div>
                        </td>
                        <td>
                          <div className="badge badge-ghost">
                            {customer.wishList.length || 0}
                          </div>
                        </td>
                        <td>
                          <span className="text-sm opacity-60">
                            {formatDate(customer.createdAt)}
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

export default CustomerPage;
