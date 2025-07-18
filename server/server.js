const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;

// Your middlewares
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
