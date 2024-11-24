import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável conexao.


// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Obtém o banco de dados 'Primeira-database' da conexão.
    const db = conexao.db("Primeira-database");
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection("posts");
    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna um array com os resultados.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("Primeira-database");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
    
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Primeira-database");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
    
}