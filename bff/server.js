const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors()); // Allow requests from React app
app.use(express.json());

// ==========================================
// MOCK DATA
// ==========================================

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    stock: 15,
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life. Crystal clear sound quality.",
    brand: "AudioTech",
    colors: ["Black", "Silver", "Blue"],
    features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.0"]
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.8,
    reviews: 342,
    inStock: true,
    stock: 8,
    description: "Advanced fitness tracking, heart rate monitor, GPS, and smartphone notifications all in one sleek design.",
    brand: "TechWear",
    colors: ["Black", "Rose Gold", "Silver"],
    features: ["Heart Rate Monitor", "GPS", "Water Resistant"]
  },
  {
    id: 3,
    name: "Ultra HD 4K Camera",
    price: 899.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    stock: 5,
    description: "Professional-grade camera with 4K video recording, image stabilization, and advanced autofocus system.",
    brand: "PhotoPro",
    colors: ["Black"],
    features: ["4K Video", "Image Stabilization", "Fast Autofocus"]
  },
  {
    id: 4,
    name: "Leather Laptop Bag",
    price: 89.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 4.3,
    reviews: 56,
    inStock: true,
    stock: 20,
    description: "Premium genuine leather laptop bag with padded compartment for 15-inch laptops. Professional and durable.",
    brand: "LeatherCraft",
    colors: ["Brown", "Black"],
    features: ["15-inch Laptop", "Genuine Leather", "Multiple Pockets"]
  },
  {
    id: 5,
    name: "Running Shoes - Performance",
    price: 129.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    stock: 30,
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for daily training.",
    brand: "SportFit",
    colors: ["White", "Black", "Blue", "Red"],
    features: ["Lightweight", "Breathable", "Responsive Cushioning"]
  },
  {
    id: 6,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: 4.4,
    reviews: 167,
    inStock: true,
    stock: 50,
    description: "Soft, comfortable organic cotton t-shirt. Eco-friendly and perfect for everyday wear.",
    brand: "EcoWear",
    colors: ["White", "Black", "Gray", "Navy"],
    features: ["Organic Cotton", "Eco-Friendly", "Soft Fabric"]
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    rating: 4.7,
    reviews: 445,
    inStock: true,
    stock: 100,
    description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    brand: "HydroLife",
    colors: ["Silver", "Black", "Blue", "Pink"],
    features: ["Insulated", "BPA-Free", "Leak-Proof"]
  },
  {
    id: 8,
    name: "Yoga Mat - Premium",
    price: 49.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    rating: 4.5,
    reviews: 198,
    inStock: true,
    stock: 25,
    description: "Extra-thick non-slip yoga mat with carrying strap. Eco-friendly materials, perfect for all yoga styles.",
    brand: "ZenFit",
    colors: ["Purple", "Blue", "Pink", "Black"],
    features: ["Non-Slip", "Extra Thick", "Eco-Friendly"]
  },
  {
    id: 9,
    name: "Gaming Keyboard RGB",
    price: 149.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    rating: 4.8,
    reviews: 512,
    inStock: false,
    stock: 0,
    description: "Mechanical gaming keyboard with customizable RGB lighting and programmable keys.",
    brand: "GameTech",
    colors: ["Black"],
    features: ["RGB Lighting", "Mechanical Keys", "Programmable"]
  },
  {
    id: 10,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    rating: 4.4,
    reviews: 276,
    inStock: true,
    stock: 40,
    description: "Compact waterproof speaker with 360-degree sound and 12-hour battery life.",
    brand: "SoundWave",
    colors: ["Black", "Blue", "Red"],
    features: ["Waterproof", "360° Sound", "12hr Battery"]
  },
  {
    id: 11,
    name: "Desk Lamp - LED Smart",
    price: 39.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    stock: 15,
    description: "Adjustable LED desk lamp with USB charging port and touch controls. Energy efficient.",
    brand: "BrightSpace",
    colors: ["White", "Black"],
    features: ["USB Charging", "Touch Control", "Adjustable"]
  },
  {
    id: 12,
    name: "Backpack - Travel Pro",
    price: 79.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 4.7,
    reviews: 334,
    inStock: true,
    stock: 22,
    description: "Durable travel backpack with laptop compartment and anti-theft features. TSA-approved.",
    brand: "TravelGear",
    colors: ["Black", "Gray", "Navy"],
    features: ["Laptop Compartment", "Anti-Theft", "TSA-Approved"]
  }
];

const categories = [
  { id: "all", name: "All Products", count: 12 },
  { id: "electronics", name: "Electronics", count: 5 },
  { id: "clothing", name: "Clothing", count: 2 },
  { id: "accessories", name: "Accessories", count: 3 },
  { id: "sports", name: "Sports & Fitness", count: 1 },
  { id: "home", name: "Home & Office", count: 1 }
];

const featuredProducts = [1, 2, 5, 7]; // IDs of featured products

// ==========================================
// API ENDPOINTS
// ==========================================

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-Commerce BFF API is running!',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      productById: '/api/products/:id',
      categories: '/api/categories',
      featured: '/api/products/featured',
      search: '/api/products/search?q=query',
      filter: '/api/products/filter?category=electronics&minPrice=0&maxPrice=1000'
    }
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// Get featured products
app.get('/api/products/featured', (req, res) => {
  const featured = products.filter(p => featuredProducts.includes(p.id));
  res.json({
    success: true,
    count: featured.length,
    data: featured
  });
});

// Get all categories
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// Search products
app.get('/api/products/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  
  if (!query) {
    return res.json({
      success: true,
      count: products.length,
      data: products
    });
  }
  
  const results = products.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query)
  );
  
  res.json({
    success: true,
    count: results.length,
    data: results,
    query: query
  });
});

// Filter products
app.get('/api/products/filter', (req, res) => {
  let filtered = [...products];
  
  // Filter by category
  if (req.query.category && req.query.category !== 'all') {
    filtered = filtered.filter(p => p.category === req.query.category);
  }
  
  // Filter by price range
  if (req.query.minPrice) {
    filtered = filtered.filter(p => p.price >= parseFloat(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(req.query.maxPrice));
  }
  
  // Filter by in stock
  if (req.query.inStock === 'true') {
    filtered = filtered.filter(p => p.inStock);
  }
  
  res.json({
    success: true,
    count: filtered.length,
    data: filtered,
    filters: req.query
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BFF Server running on http://localhost:${PORT}`);
  console.log(`📦 API Endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/products`);
  console.log(`   GET  http://localhost:${PORT}/api/products/:id`);
  console.log(`   GET  http://localhost:${PORT}/api/products/featured`);
  console.log(`   GET  http://localhost:${PORT}/api/categories`);
  console.log(`   GET  http://localhost:${PORT}/api/products/search?q=query`);
  console.log(`   GET  http://localhost:${PORT}/api/products/filter?category=electronics`);
});