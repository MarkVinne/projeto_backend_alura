import express from "express";
// Importa o framework Express.js para criar a aplicação web.
import routes from "./src/routes/postsRoutes.js";


const app = express();
// Cria uma instância do Express, que será o núcleo da nossa aplicação.

app.use(express.static("uploads"))

routes(app);

app.use(express.json());
// Habilita o middleware express.json() para que o Express possa entender requisições com corpo no formato JSON.
// Isso é crucial para receber dados de formulários ou de outras fontes em formato JSON.

app.listen(3000, () => {
    // Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
    console.log("Servidor escutando...");
});



