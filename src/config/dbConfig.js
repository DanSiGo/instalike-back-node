import { MongoClient } from "mongodb";

async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao banco de dados...");
        await mongoClient.connect();
        console.log("Conectado ao banco de dados!");

        return mongoClient;
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit();
    } 
}

export { conectarAoBanco };