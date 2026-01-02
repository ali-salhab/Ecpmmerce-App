export const capitalizeText = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getOrderStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "badge-success";
    case "shipped":
      return "badge-info";

    case "pending":
      return "badge-warning";
    default:
      return "badge-ghost";
  }
};

export const getStockStatusBadge = (stock) => {
  if (stock === 0) {
    return {
      text: "Out of Stock",
      class: "badge-error",
    };
  }
  if (stock < 5) {
    return {
      text: "Low Stock",
      class: "badge-warning",
    };
  } else {
    return {
      text: "In Stock",
      class: "badge-success",
    };
  }
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };

  return new Date(dateString).toLocaleDateString("en-US", options);
};
