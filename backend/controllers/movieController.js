import asyncHandler from "express-async-handler";

import Movie from "../models/moviesModel.js";

const getMovies = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const movies = await Movie.find({ ...keyword });

  res.json(movies);
});

const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.remove();
    res.json({ message: "Movie Removed" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const createMovie = asyncHandler(async (req, res) => {
  const movie = new Movie({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    brand: "sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
});

const updateMovie = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.name = name;
    movie.price = price;
    movie.description = description;
    movie.image = image;
    movie.brand = brand;
    movie.category = category;
    movie.countInStock = countInStock;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404);
    throw new Error("Movie not found");
  }
});

export { getMovies, getMovieById, deleteMovie, createMovie, updateMovie };
