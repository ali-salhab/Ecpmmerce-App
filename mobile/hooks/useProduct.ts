import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/lib/api";

export const useProduct = (id: string, enabled: boolean = true) => {
  const api = useApi();
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get<{ product: Product }>(`/products/${id}`);
      return response.data.product;
    },
    enabled: enabled && !!id,
  });
};
