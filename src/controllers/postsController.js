import { getTodosOsPosts } from "../models/postsModel.js";

async function listarPosts (req, res) {
    const posts = await getTodosOsPosts();
    res.status(200).send(posts);
}

export {listarPosts};