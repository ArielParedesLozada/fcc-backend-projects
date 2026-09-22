import express from "express";
import {
    getWatchlist,
    addMovie,
    updateMovie,
    deleteMovie,
} from "../utils/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();

router.use(authenticate);

router.get("/:userId", (req, res) => {
    const watchlist = getWatchlist(Number(req.params.userId));
    res.json(watchlist);
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
    const movie = addMovie(Number(req.params.userId), req.body);
    res.status(201).json(movie);
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const updated = updateMovie(
        Number(req.params.userId),
        Number(req.params.movieId),
        req.body,
    );
    res.json(updated);
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const removed = deleteMovie(
        Number(req.params.userId),
        Number(req.params.movieId),
    );
    res.json(removed);
});

export default router;