import express from "express";
import userRoutes from "./src/routes/user-routes.js";
import productRoutes from "./src/routes/product-routes.js";
import cartRoutes from "./src/routes/cart-routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5050;

// Your middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
