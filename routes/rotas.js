const { Router } = require('express');

const { getPessoas, addPessoa, updatePessoa, deletePessoa, 
     getPessoaPorCodigo } = require('../controllers/pessoaController');

const { getTarefas, addTarefa, updateTarefa, deleteTarefa,
          getTarefaPorCodigo } = require('../controllers/tarefaController');

const { login, verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route('/login').post(login);

rotas.route('/pessoas')
     .get(verificaJWT, getPessoas)
     .post(verificaJWT, addPessoa)
     .put(verificaJWT, updatePessoa)


rotas.route('/pessoas/:codigo')
     .delete(verificaJWT, deletePessoa)
     .get(verificaJWT, getPessoaPorCodigo)

rotas.route('/tarefas')
     .get(verificaJWT, getTarefas)
     .post(verificaJWT, addTarefa)
     .put(verificaJWT, updateTarefa)

rotas.route('/tarefas/:codigo')
     .delete(verificaJWT, deleteTarefa)
     .get(verificaJWT, getTarefaPorCodigo) 

module.exports = rotas;

