import express from "express";
import {
  getMovies,
  getMovieById,
  deleteMovie,
  updateMovie,
  createMovie,
} from "../controllers/movieController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getMovies).post(protect, admin, createMovie);

router
  .route("/:id")
  .get(getMovieById)
  .delete(protect, admin, deleteMovie)
  .put(protect, admin, updateMovie);

export default router;
