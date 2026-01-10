import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Product } from "@/types/index";
import useWishlist from "@/hooks/useWhichlist";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import UseCart from "@/hooks/usCart";

const placeholderImage = require("../assets/images/fashion.png");

interface ProductsGridProps {
  isLoading?: boolean;
  isError?: boolean;
  Products?: Product[];
}
const ProductsGrid = ({
  Products = [],
  isLoading = false,
  isError = false,
}: ProductsGridProps) => {
  console.log("products Grid Components props", Products.length);
  const { isInWishlist, toggleWishlist, pendingWishlistProductId } =
    useWishlist();
  const { isAddingToCart, addToCart } = UseCart();
  const handleAddToCart = (productId: string, ProductName: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          Alert.alert("Success", `${ProductName} has been added to your cart.`);
        },
        onError: () => {
          Alert.alert("Error", `Failed to add ${ProductName} to your cart.`);
        },
      }
    );
    // Implement add to cart functionality
  };

  const safeProducts: Product[] = Array.isArray(Products)
    ? Products
    : [Products];

  const renderProduct = ({ item: product }: { item: Product }) => {
    const id = product?._id ?? String(Math.random());
    const imageUri = product?.images?.[0] ?? undefined;
    const name = product?.name ?? "Unnamed";
    const category = product?.category ?? "";
    const avgRating =
      typeof product?.averageRating === "number" ? product.averageRating : 0;
    const totalReviews = product?.totalReviews ?? 0;
    const price = typeof product?.price === "number" ? product.price : 0;

    return (
      <TouchableOpacity
        className="bg-slate-700 rounded-xl overflow-hidden m-3 mx-2"
        style={{ width: "48%" }}
        activeOpacity={0.8}
        onPress={() => {
          // return router.push(`/product/${id}`);
        }}
      >
        <View className="relative">
          <Image
            source={imageUri ? { uri: imageUri } : placeholderImage}
            resizeMode="cover"
            className="w-full h-44 bg-background-lighter"
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              console.log(id);
              if (id) toggleWishlist(id);
            }}
            disabled={pendingWishlistProductId === id}
            className="absolute top-3 right-3 bg-black/3 backdrop-blur-xl p-2 rounded-full"
          >
            {pendingWishlistProductId === id ? (
              <ActivityIndicator size="small" color="#1db954" />
            ) : (
              <Ionicons
                name={isInWishlist(id) ? "heart" : "heart-outline"}
                size={20}
                color={isInWishlist(id) ? "#1db954" : "red"}
              />
            )}
          </TouchableOpacity>
        </View>
        {/* <Text>{product.name}</Text> */}
        <View className="p-3">
          <Text className="text-text-secondary text-xs mb-1">{category}</Text>
          <Text className="text-text-primary font-semibold mb-2">{name}</Text>
          <View className="flex flex-row items-center justify-between">
            <View className="flex-row py-3">
              <Ionicons name="star" size={12} color={"#ffc107"} />
              <Text className="text-text-primary text-xs font-semibold ml-1">
                {avgRating.toFixed(1)}
              </Text>
            </View>
            <Text className="text-text-secondary text-xs ml-1">
              {totalReviews} Review
            </Text>
          </View>
          <View className="flex-row items-center justify-between ">
            <Text className="text-primary font-bold text-lg">
              ${price.toFixed(2)}
            </Text>
            <TouchableOpacity
              className="bg-primary rounded-full w-8 h-8 items-center justify-center"
              activeOpacity={0.7}
              // onPress={() => handleAddToCart(id, name)}
              // disabled={isAddingToCart}
            >
              <Ionicons name="add" size={18} color={"#121212"} />
              {/* {isAddingToCart ? (
                <ActivityIndicator size={"small"} color={"#121212"} />
              ) : (
                <Ionicons name="add" size={18} color={"#121212"} />
              )} */}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (isError) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <Ionicons
          name="ear-sharp"
          className="text-teal-400 bg-white"
          size={44}
        />
        <Text className="text-text-secondary mt-4">
          error loading products products
        </Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <ActivityIndicator size="large" color="#1db954" />
        <Text className="text-text-secondary mt-4">Loading products...</Text>
      </View>
    );
  }
  // console.log("producs befor render theme", safeProducts);
  return safeProducts !== null ? (
    <FlatList
      data={safeProducts}
      renderItem={renderProduct}
      keyExtractor={(item) => {
        return item._id;
      }}
      numColumns={2}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={NoProductFound}
    />
  ) : (
    <Ionicons />
  );
};

function NoProductFound() {
  return (
    <View className="py-20 items-center justify-center">
      <Ionicons name="search-outline" size={48} color={"#666"} />
      <Text className="text-text-primary font-semibold mt-4">
        No products found
      </Text>
      <Text className="text-text-secondary text-sm mt-2">
        Try adjust your filters
      </Text>
    </View>
  );
}
export default ProductsGrid;
