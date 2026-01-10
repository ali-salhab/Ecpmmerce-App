import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const useProducts = (api: AxiosInstance) => {
  const res = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get<Product[]>("/products");
      console.log("get products from useProducts ->", response.data);

      return response.data;
    },
  });

  return res;
};
export default useProducts;
