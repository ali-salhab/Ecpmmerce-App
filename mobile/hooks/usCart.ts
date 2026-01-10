import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Cart } from "@/types";
const UseCart = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const addToCartMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity = 1,
    }: {
      productId: string;
      quantity?: number;
    }) => {
      const { data } = await api.post<{ cart: Cart }>("/cart", {
        productId,
        quantity,
      });
      return data.cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return {
    addToCart: addToCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
  };
  //   TODO: add remove from cart mutation
};

export default UseCart;
