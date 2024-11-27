import fs from "fs";
import { getTodosOsPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import { gerarDescricaoComGemini } from "../services/geminiService.js";

async function listarPosts (req, res) {
    const posts = await getTodosOsPosts();
    res.status(200).send(posts);
}

async function postarNovoPost (req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao criar post" });
    }
}

async function uploadImage (req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao criar post" });
    }
}

async function atualizarNovoPost (req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao atualizar post" });
    }
}


export {listarPosts, postarNovoPost, uploadImage, atualizarNovoPost};