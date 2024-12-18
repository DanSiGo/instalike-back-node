import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImage, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ dest: "./uploads/" , storage });
const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImage);
    app.put("/posts/:id", atualizarNovoPost);

}

export default routes;