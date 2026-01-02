import React from "react";
import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  ImageIcon,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "./../lib/api";
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
  const [imagepreviews, setImagePreviews] = useState([]);
  const queryClient = useQueryClient();
  // we use usequery from tanstack to fetch some data from the api
  const { data: productsData = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAll,
  });
  const deleteProductMutation = useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  // in the othehand we use useMutation to post , put , delete data to the api
  const creatProductMutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      // TODO:
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });
  const updateProductMutation = useMutation({
    mutationFn: productApi.update,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const closeModal = () => {
    // reset all modal state
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
      alert("You can upload a maximum of 3 images.");
      return;
    }
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct && imagepreviews.length === 0) {
      return alert("Please upload at least one image.");
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    if (images.length > 0) {
      images.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });
    }
    if (editingProduct) {
      updateProductMutation.mutate({
        id: editingProduct.id,
        formData: formDataToSend,
      });
    } else {
      creatProductMutation.mutate(formDataToSend);
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-base-content/70 mt-1">
            Manage your products here.
          </p>
        </div>
        <button
          className="btn btn-primary gap-2 flex items-center text-amber-50"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Product
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      {/* Products grid */}
      <div className="grid grid-cols-1 gap-4">
        {isLoadingProducts ? (
          <div>Loading products...</div>
        ) : productsData.length === 0 ? (
          <div>No products found.</div>
        ) : (
          productsData.map((product) => {
            const status = getStockStatusBadge(product.stock);
            return (
              <div key={product.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-6">
                    {/* avatart */}
                    <div className="avatar">
                      <div className="w-20 rounded-2xl">
                        <img src={product.images[0]} alt={product.name} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-around">
                        <div>
                          <h3 className="card-title">{product.name}</h3>
                          <p className="text-base-content/70 text-sm">
                            {product.category}
                          </p>
                        </div>

                        <div className={`badge ${status.class}`}>
                          {status.text}
                        </div>
                        <div className="flex items-center gap-6 mt-4 ">
                          <div>
                            <p className="text-xs text-base-content/70">
                              Price
                            </p>
                            <p className="font-semibold text-lg">
                              ${product.price}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-base-content/70">
                              Stock
                            </p>
                            <p className="font-semibold text-lg">
                              {product.stock}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handleEdit(product)}
                      >
                        <PencilIcon className="size-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteProductMutation.mutate(product._id);
                        }}
                        className="btn btn-square btn-ghost text-error"
                      >
                        {deleteProductMutation.isPending ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <Trash2Icon className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Add/Edit product Modal */}
      <input type="checkbox" className="modal-toggle" checked={showModal} />7
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-2xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            <button className="btn btn-square btn-ghost" onClick={closeModal}>
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-col-2 gap-4">
              <div className="form-control">
                <label htmlFor="" className="label">
                  <span>Product name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="input input-bordered"
                  value={formData.name}
                  required
                  onChange={() => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="" className="label">
                  <span>Category</span>
                </label>
                <select
                  className="select select-bordered"
                  id=""
                  value={formData.category}
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                  }}
                  required
                >
                  <option value="">select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="accessories">accessories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="sports">sports</option>
                </select>
              </div>
            </div>
            <div className="grid grid-col-2 gap-4">
              <div className="form-control">
                <label htmlFor="" className="label-text">
                  Price ($)
                </label>
                <input
                  type="number"
                  step={0.01}
                  placeholder="0.00"
                  className=" input imput-bordered"
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="" className="label">
                  <span>Stock</span>
                  <input
                    type="number"
                    placeholder="0"
                    className="input input-bordered"
                    value={formData.stock}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="form-control flex flex-col gap-2 ">
              <label htmlFor="" className="label">
                <span>Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Enter Product description"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
                required
              ></textarea>
            </div>

            {/* images  */}
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-semibold text-base flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Product Images (max 3)
                </span>
              </label>
              <div className="bg-base-200 rounded-2xl p-4 border-2 border-dashed border-base-300 hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="file-input file-input-bordered w-full file-input-primary"
                  onChange={handleImageChange}
                  required={!editingProduct}
                />
                {editingProduct && (
                  <p className="text-sm text-base-content/70 mt-1 text-center">
                    Leave empty to keep existing images.
                  </p>
                )}
              </div>
              {imagepreviews.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {imagepreviews.map((preview, index) => {
                    return (
                      <div key={index} className="avatar">
                        <div className="w-20 rounded-lg">
                          <img src={preview} alt={`preview ${index + 1}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="btn"
                disabled={
                  creatProductMutation.isPending ||
                  updateProductMutation.isPending
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  creatProductMutation.isPending ||
                  updateProductMutation.isPending
                }
              >
                {creatProductMutation.isPending ||
                updateProductMutation.isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : editingProduct ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
