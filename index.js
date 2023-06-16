const express = require('express');
const cors = require('cors');
const rotas = require('./routes/rotas');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

app.use(rotas);

app.listen(process.env.PORT || 3003, () => {
    console.log('Servidor da API de tarefas está rodandona porta 3003!');
})