import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookedMovie: [
      {
        name: { type: String, required: true },
        qty: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Movie",
        },
      },
    ],
    bookingData: {
      location: { type: String },
    },

    paymentMethod: {
      type: String,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDeliverd: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
