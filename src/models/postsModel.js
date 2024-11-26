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

export { getTodosOsPosts, buscarPostPorID };