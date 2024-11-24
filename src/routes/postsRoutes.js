import express from "express";
// Importa o framework Express.js para criar a aplicação web, permitindo a criação de rotas e o tratamento de requisições HTTP.

import multer from "multer";
// Importa o módulo Multer, responsável por lidar com o upload de arquivos (imagens, no caso deste código).

import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postController.js";
// Importa as funções para listar posts, postar novos posts e realizar o upload de imagens, definidas no arquivo postController.js. Essas funções provavelmente contêm a lógica de interação com o banco de dados e outras operações relacionadas aos posts.

import cors from "cors";

const corsOptions ={
    origin:"http://localhost:8000",
    optionsSucsessStatus: 200
}

const storage = multer.diskStorage({
    // Configura o armazenamento de arquivos utilizando a estratégia de disco.
    destination: function (req, file, cb) {
        // Define o diretório de destino para os arquivos upados. Neste caso, será a pasta 'uploads/'.
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define o nome do arquivo, mantendo o nome original.
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads", storage });
// Cria uma instância do Multer, configurando o destino dos arquivos e a estratégia de armazenamento. Essa instância será utilizada para tratar os uploads de imagens.

const routes = (app) => {
    // Define as rotas da aplicação. Essa função recebe como parâmetro a instância do Express e configura as rotas.

    app.use(express.json());
    // Habilita o middleware express.json() para que a aplicação possa entender requisições com corpo no formato JSON. Isso é fundamental para receber dados enviados em formato JSON, como os dados de um novo post.
    app.use(cors(corsOptions));

    // Rota para obter todos os posts
    app.get("/posts", listarPosts);
    // Quando uma requisição GET for feita para a rota "/posts", a função listarPosts será chamada. Essa função provavelmente buscará todos os posts no banco de dados e enviará a resposta ao cliente.

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);
    // Quando uma requisição POST for feita para a rota "/posts", a função postarNovoPost será chamada. Essa função provavelmente receberá os dados do novo post no corpo da requisição e os salvará no banco de dados.

    app.post("/upload", upload.single("imagem"), uploadImagem);
    // Rota para realizar o upload de uma imagem.
    // O middleware upload.single("imagem") extrai o arquivo enviado com o nome "imagem" do corpo da requisição e o salva no local configurado.
    // A função uploadImagem é então chamada para realizar qualquer processamento adicional com a imagem, como salvar o caminho da imagem no banco de dados.
     
    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
// Exporta a função routes para que possa ser utilizada em outros módulos.