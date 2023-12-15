import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Book from "./models/bookModel.js";
import Movie from "./models/moviesModel.js";

import conectDB from "./config/db.js";

dotenv.config();
conectDB();

const importData = async () => {
  try {
    await Book.deleteMany();
    await Movie.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Movie.insertMany(sampleProducts);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany();
    await Movie.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
