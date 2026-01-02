import mongoose from "mongoose";
import { ENV } from "./../config/env.js";
import { Product } from "../models/product.models.js";
const products = [
  {
    name: "Samsung Galaxy S23",
    category: "electronics",
    description:
      "Experience the next generation of mobile technology with the Samsung Galaxy S23, featuring a powerful processor, stunning display, and advanced camera system.",
    price: 899,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    ],
    averageRating: 4.6,
    totalReviews: 120,
  },
  {
    name: "Adidas Ultraboost",
    category: "footwear",
    description:
      "Adidas Ultraboost running shoes provide superior comfort and energy return with their responsive cushioning and breathable knit upper.",
    price: 150,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
    ],
    averageRating: 4.4,
    totalReviews: 95,
  },
  {
    name: "Sony WH-1000XM4 Headphones",
    category: "electronics",
    description:
      "Industry-leading noise cancellation headphones with exceptional sound quality and long battery life for immersive listening.",
    price: 350,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    averageRating: 4.8,
    totalReviews: 210,
  },
  {
    name: "Apple MacBook Air M2",
    category: "electronics",
    description:
      "The new MacBook Air with M2 chip delivers blazing-fast performance in a thin and light design, perfect for productivity and creativity.",
    price: 1200,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    ],
    averageRating: 4.7,
    totalReviews: 180,
  },
  {
    name: "Canon EOS R6 Camera",
    category: "electronics",
    description:
      "Capture stunning photos and videos with the Canon EOS R6, featuring fast autofocus and impressive low-light performance.",
    price: 2100,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    ],
    averageRating: 4.9,
    totalReviews: 60,
  },
  {
    name: "Ray-Ban Wayfarer Sunglasses",
    category: "accessories",
    description:
      "Classic Ray-Ban Wayfarer sunglasses offer timeless style and UV protection for everyday wear.",
    price: 120,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
    ],
    averageRating: 4.5,
    totalReviews: 140,
  },
  {
    name: "Fossil Gen 6 Smartwatch",
    category: "electronics",
    description:
      "Stay connected and track your fitness with the Fossil Gen 6 Smartwatch, featuring customizable watch faces and health monitoring.",
    price: 299,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    ],
    averageRating: 4.3,
    totalReviews: 75,
  },
  {
    name: "North Face Backpack",
    category: "accessories",
    description:
      "Durable and spacious North Face backpack, perfect for travel, school, or outdoor adventures.",
    price: 90,
    stock: 70,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    ],
    averageRating: 4.6,
    totalReviews: 110,
  },
  {
    name: "Apple iPad Pro",
    category: "electronics",
    description:
      "Apple iPad Pro delivers powerful performance and a stunning Liquid Retina display for work and entertainment.",
    price: 999,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    ],
    averageRating: 4.7,
    totalReviews: 130,
  },
  {
    name: "Levi's Trucker Jacket",
    category: "apparel",
    description:
      "Levi's Trucker Jacket is a versatile denim jacket with a classic fit, perfect for layering in any season.",
    price: 80,
    stock: 55,
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
    ],
    averageRating: 4.4,
    totalReviews: 90,
  },
  {
    name: "Nike Sportswear Hoodie",
    category: "apparel",
    description:
      "Stay comfortable and stylish with the Nike Sportswear Hoodie, made from soft fleece fabric for everyday wear.",
    price: 65,
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    averageRating: 4.5,
    totalReviews: 160,
  },
  {
    name: "Samsung 4K Smart TV",
    category: "electronics",
    description:
      "Enjoy vibrant colors and sharp details with the Samsung 4K Smart TV, featuring streaming apps and voice control.",
    price: 700,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    ],
    averageRating: 4.6,
    totalReviews: 100,
  },
  {
    name: "Bose SoundLink Speaker",
    category: "electronics",
    description:
      "Portable Bose SoundLink speaker delivers rich sound and deep bass for music on the go.",
    price: 129,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    ],
    averageRating: 4.7,
    totalReviews: 115,
  },
  {
    name: "Puma Running Shorts",
    category: "apparel",
    description:
      "Lightweight and breathable Puma running shorts designed for comfort and performance during workouts.",
    price: 35,
    stock: 120,
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
    ],
    averageRating: 4.3,
    totalReviews: 80,
  },
  {
    name: "Timberland Classic Boots",
    category: "footwear",
    description:
      "Timberland Classic Boots offer rugged durability and timeless style for outdoor adventures.",
    price: 160,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    averageRating: 4.6,
    totalReviews: 105,
  },
  {
    name: "Casio G-Shock Watch",
    category: "accessories",
    description:
      "Casio G-Shock Watch is shock-resistant and water-resistant, perfect for sports and outdoor activities.",
    price: 99,
    stock: 75,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    ],
    averageRating: 4.5,
    totalReviews: 125,
  },
  {
    name: "Dell XPS 13 Laptop",
    category: "electronics",
    description:
      "Dell XPS 13 Laptop combines powerful performance with a compact design and stunning display.",
    price: 1100,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    ],
    averageRating: 4.7,
    totalReviews: 90,
  },
  {
    name: "Under Armour Gym Bag",
    category: "accessories",
    description:
      "Spacious and durable Under Armour gym bag with multiple compartments for easy organization.",
    price: 55,
    stock: 65,
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
    ],
    averageRating: 4.4,
    totalReviews: 70,
  },
  {
    name: "Apple AirPods Pro",
    category: "electronics",
    description:
      "Apple AirPods Pro offer active noise cancellation and a customizable fit for immersive sound.",
    price: 249,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    averageRating: 4.8,
    totalReviews: 200,
  },
  {
    name: "Columbia Fleece Jacket",
    category: "apparel",
    description:
      "Columbia Fleece Jacket provides warmth and comfort for outdoor activities in cool weather.",
    price: 60,
    stock: 90,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    ],
    averageRating: 4.5,
    totalReviews: 110,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to MongoDB for seeding.");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products.");
    // Insert seed products
    await Product.insertMany(products);
    console.log("Seeded products successfully.");
    // Display Summary
    const categories = [...new Set(products.map((p) => p.category))];
    console.log(`Total Products Seeded: ${products.length}`);
    console.log(`Categories: ${categories.join(", ")}`);
    mongoose.connection.close();
    console.log("Disconnected from MongoDB.");
    // close connection
    await mongoose.connection.close();
    console.log("Connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
