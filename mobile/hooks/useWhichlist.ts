import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useApi } from "@/lib/api";
import { Product } from "@/types";

//
const useWishlist = () => {
  const api = useApi();
  console.log("use wishlist called");
  const queryClient = useQueryClient();

  const [pendingWishlistProductId, setPendingWishlistProductId] = useState<
    string | null
  >(null);

  const {
    data: wishlist = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await api.get<{ wishlist: Product[] }>(
        "/users/wishlist"
      );
      console.log("response from the backend", response);
      return response.data.wishlist;
    },
  });
  console.log(wishlist);
  // add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      console.log("add to wishlist called");
      const { data } = await api.post<{ wishlist: string[] }>(
        "/users/whishlist",
        {
          productId,
        }
      );
      console.log("backend enpint response ", data);
      return data.wishlist;
    },
    onMutate: (productId) => {
      setPendingWishlistProductId(productId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.delete<{ wishlist: string[] }>(
        `/users/wishlist/${productId}`
      );
      return data.wishlist;
    },
    onMutate: (productId) => {
      setPendingWishlistProductId(productId);
    },
    onSettled: () => {
      setPendingWishlistProductId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
  const isInWishlist = (productId: string) => {
    return wishlist.some(
      (item: Product) => item._id.toString() === productId.toString()
    );
  };
  const toggleWishlist = async (productId: string) => {
    console.log("toggle function for wishlist");
    console.log(productId);
    console.log(isInWishlist(productId));
    if (isInWishlist(productId)) {
      removeFromWishlistMutation.mutate(productId);
    } else {
      addToWishlistMutation.mutate(productId);
    }
  };
  return {
    wishlist: wishlist || [],
    isLoading,
    isError,
    wishlistCount: wishlist.length || 0,
    isInWishlist,
    toggleWishlist,

    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
    pendingWishlistProductId,
  };
};

export default useWishlist;
