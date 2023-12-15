import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const { bookedMovie, bookingData, paymentMethod, itemsPrice, totalPrice } =
    req.body;

  if (bookedMovie && bookedMovie.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Book({
      bookedMovie,
      user: req.user._id,
      bookingData,
      paymentMethod,
      itemsPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Book.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.json(404);
    throw new Error("Order not Found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Book.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.json(404);
    throw new Error("Order not Found");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Book.find({ user: req.user._id });
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Book.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
};
