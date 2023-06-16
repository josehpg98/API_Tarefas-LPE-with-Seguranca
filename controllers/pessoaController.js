const { getPessoasDB, addPessoaDB, updatePessoaDB, deletePessoaDB, 
    getPessoaPorCodigoDB } = require('../useCases/pessoasUseCases');

const getPessoas = async (request, response) => {
    await getPessoasDB()
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
        status : 'error',
        message: 'Erro ao consultar a pessoa: ' + err
    }))
}

const addPessoa = async (request, response) => {
    await addPessoaDB(request.body)
    .then(data => response.status(200).json({
        status : 'success', 
        message : 'Pessoa inserida com sucesso!',
        objeto : data
    }))
    .catch(err => response.status(400).json({
        status : 'error',
        message:  err
    }))
}

const updatePessoa = async (request, response) => {
    await updatePessoaDB(request.body)
    .then(data => response.status(200).json({
        status : 'success', 
        message : 'Pessoa atualizada com sucesso!',
        objeto : data
    }))
    .catch(err => response.status(400).json({
        status : 'error',
        message:  err
    }))
}

const deletePessoa = async (request, response) => {
    await deletePessoaDB(parseInt(request.params.codigo))
    .then(data => response.status(200).json({
        status : 'success', 
        message : data
    }))
    .catch(err => response.status(400).json({
        status : 'error',
        message:  err
    }))
}

const getPessoaPorCodigo = async (request, response) => {
    await getPessoaPorCodigoDB(parseInt(request.params.codigo))
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
        status : 'error',
        message: err
    }))
}

module.exports = { getPessoas, addPessoa, updatePessoa, 
    deletePessoa, getPessoaPorCodigo}