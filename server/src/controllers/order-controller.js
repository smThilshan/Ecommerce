import * as orderService from "../services/order-service.js";

export const placeOrder = async (req, res) => {
    try {
    const userId = req.user.id;

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const newOrder = await orderService.placeOrder(userId, items);

    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
}

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderService.getUserOrdersService(userId);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = parseInt(req.params.id);

    const order = await orderService.getOrderByIdService(orderId);

    if (!order || order.userId !== userId) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};
