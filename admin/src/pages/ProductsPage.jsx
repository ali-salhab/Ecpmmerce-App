import React, { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  ImageIcon,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../lib/api";
import { getStockStatusBadge } from "../lib/utils";

function ProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const queryClient = useQueryClient();

  /* ================= FETCH PRODUCTS ================= */
  const { data: productsData = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAll,
  });

  /* ================= MUTATIONS ================= */
  const createProductMutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, formData }) => productApi.update(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  /* ================= HELPERS ================= */
  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
    });
    setImages([]);
    setImagePreviews([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setImagePreviews(product.images || []);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    console.log("handle submit button fom add product modal was called");
    e.preventDefault();

    if (!editingProduct && imagePreviews.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const payload = new FormData();
    console.log("enteried form data ", formData);
    // object entries will convert it to array of arrays with key and values

    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value)
    );
    console.log(images);

    images.forEach((img) => payload.append("images", img));
    console.log("images----------->", images);
    if (editingProduct) {
      updateProductMutation.mutate({
        id: editingProduct.id,
        formData: payload,
      });
    } else {
      console.log("payload ------------------->");
      console.log([...payload.entries()]);
      

      createProductMutation.mutate(payload);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-base-content/70">Manage your products</p>
        </div>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Products */}
      <div className="grid gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : productsData.length === 0 ? (
          <p>No products found</p>
        ) : (
          productsData.map((product) => {
            const status = getStockStatusBadge(product.stock);
            return (
              <div key={product.id} className="card bg-base-100 shadow">
                <div className="card-body flex-row items-center gap-6">
                  <div className="avatar">
                    <div className="w-20 rounded-xl">
                      <img src={product.images?.[0]} alt={product.name} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-base-content/70">
                      {product.category}
                    </p>

                    <div className="flex gap-6 mt-3">
                      <div>
                        <p className="text-xs">Price</p>
                        <p className="font-semibold">${product.price}</p>
                      </div>
                      <div>
                        <p className="text-xs">Stock</p>
                        <p className="font-semibold">{product.stock}</p>
                      </div>
                      <span className={`badge ${status.class}`}>
                        {status.text}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleEdit(product)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost text-error"
                      onClick={() => deleteProductMutation.mutate(product.id)}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <button className="btn btn-ghost btn-sm" onClick={closeModal}>
                <XIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 2x2 GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="input input-bordered"
                  placeholder="Product name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />

                <select
                  className="select select-bordered"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="accessories">Accessories</option>
                  <option value="fashion">Fashion</option>
                  <option value="sports">Sports</option>
                </select>

                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>

              <textarea
                className="textarea textarea-bordered"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />

              {/* Images */}
              <input
                type="file"
                multiple
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleImageChange}
              />

              <div className="modal-action">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    createProductMutation.isPending ||
                    updateProductMutation.isPending
                  }
                >
                  {editingProduct ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
