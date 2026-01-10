import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Safescreen from "../../components/safescreen";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import useProducts from "@/hooks/useProducts";
import { useApi } from "@/lib/api";

const GATEGORIES = [
  {
    name: "All",

    icon: "grid-outline" as const,
  },
  {
    name: "Electronics",
    image: require("@/assets/images/electronics.png"),
  },
  {
    name: "Fashion",
    image: require("@/assets/images/fashion.png"),
  },
  {
    name: "Sports",
    image: require("@/assets/images/sports.png"),
  },
  {
    name: "Books",
    image: require("@/assets/images/books.png"),
  },
];
const ShopScreen = () => {
  //
  console.log("user now in tabs page");
  try {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      "All"
    );
    const api = useApi();
    const { data: products = [], isLoading, isError } = useProducts(api);
    const filteredProducts = useMemo(() => {
      if (!products) return [];

      // Normalize common API shapes: array, { products: [] }, { data: [] }, { items: [] }
      const productArray = Array.isArray(products)
        ? products
        : Array.isArray((products as any).products)
          ? (products as any).products
          : Array.isArray((products as any).data)
            ? (products as any).data
            : Array.isArray((products as any).items)
              ? (products as any).items
              : typeof products === "object" && Object.keys(products).length > 0
                ? Object.values(products)
                : [products];

      let filtered = productArray as any[];

      // filtering by category (guard against missing fields)
      if (selectedCategory && selectedCategory !== "All") {
        filtered = filtered.filter(
          (product: any) => product?.category === selectedCategory
        );
      }

      // filtering by search query (guard against missing name)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter((product: any) =>
          (product?.name ?? "").toLowerCase().includes(q)
        );
      }

      return filtered;
    }, [products, searchQuery, selectedCategory]);

    // console.log("searchQuery:", searchQuery);
    return (
      // TODO:the next step we will add this page
      <Safescreen>
        <ScrollView
          className=" flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* <Text className="text-white">Shop Screen</Text> */}
          <View className="  px-6 pb-4 pt-6">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-text-primary font-bold text-3xl tracking-tighter">
                  EvaShop
                </Text>
                <Text className="text-text-secondary text-sm mt-1">
                  Browse our shop
                </Text>
              </View>

              <TouchableOpacity
                className="bg-surface/50 rounded-full p-3"
                activeOpacity={0.7}
              >
                <Ionicons
                  name="options-outline"
                  size={22}
                  color={"#fff"}
                ></Ionicons>
              </TouchableOpacity>
            </View>
            {/* search bar */}
            <View className="bg-surface mt-3 flex-row items-center px-5 py-4 rounded-2xl">
              <Ionicons color={"#666"} size={22} name="search" />
              <TextInput
                placeholder="Search for Products"
                placeholderTextColor={"#666"}
                className="flex-1 ml-3 text-base text-text-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.nativeEvent.text)}
              />
            </View>
          </View>
          {/* Category Filter */}
          <View className="mb-6">
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            >
              {GATEGORIES.map((category, idx) => {
                const categoryName = category.name;
                const isSelected = selectedCategory === categoryName;
                console.log(isSelected, category.name);

                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      setSelectedCategory(category.name!);
                    }}
                    className={`mr-3 rounded-2xl size-20 overflow-hidden items-center justify-center ${isSelected ? "bg-primary" : "bg-surface"}`}
                  >
                    {category.icon ? (
                      <Ionicons
                        name={category.icon}
                        size={36}
                        color={isSelected ? "#fff" : "#b3b3b3"}
                      />
                    ) : (
                      <Image
                        source={category.image}
                        className="size-12 "
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {/* header components */}
            <View className="flex-row justify-between mt-4 items-center px-7 ">
              <Text className="text-lg text-text-secondary font-extrabold">
                Products
              </Text>
              <Text className="text-text-secondary">10 items</Text>
            </View>
          </View>
          {/* Products Section grid */}
          <ProductsGrid
            Products={filteredProducts}
            isLoading={isLoading}
            isError={isError}
          />
        </ScrollView>
      </Safescreen>
    );
  } catch (renderError) {
    console.error("ShopScreen render error", renderError);
    throw renderError;
  }
};

export default ShopScreen;
