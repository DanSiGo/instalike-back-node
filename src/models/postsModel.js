import 'dotenv/config';
import { ObjectId } from "mongodb";
import { conectarAoBanco } from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

async function getTodosOsPosts() {
    const db = conexao.db("instalike");
    const posts = db.collection("posts");
    return posts.find().toArray();
}

function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
}

function criarPost(novoPost) {
    const db = conexao.db("instalike");
    const posts = db.collection("posts");
    return posts.insertOne(novoPost);
}

function atualizarPost(id, post) {
    const db = conexao.db("instalike");
    const posts = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return posts.updateOne({ _id: new ObjectId(objId) }, { $set: post });
}

export { getTodosOsPosts, buscarPostPorID, criarPost, atualizarPost };