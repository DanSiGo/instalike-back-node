import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listarPosts);

    app.get("/posts/:id", (req, res) => {
        const index = buscarPostPorID(req.params.id);
        res.status(200).send(posts[index]);
    });
}

export default routes;