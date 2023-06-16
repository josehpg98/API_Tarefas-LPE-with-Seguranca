const { pool } = require("../config");
const Pessoa = require("../entities/pessoas")

const getPessoasDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM pessoa
        order by codigo`);
        return rows.map((pessoa) => new Pessoa(pessoa.codigo, pessoa.nome,
            pessoa.cidade, pessoa.uf));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addPessoaDB = async (body) => {
    try {
        const { nome, cidade, uf } = body;
        const results = await pool.query(`INSERT INTO pessoa
        (nome, cidade, uf) values ($1, $2, $3) RETURNING 
        codigo, nome, cidade, uf`, [nome, cidade, uf]);
        const pessoa = results.rows[0];
        return new Pessoa(pessoa.codigo, pessoa.nome,
            pessoa.cidade, pessoa.uf);
    } catch (err) {
        throw "Erro ao inserir a pessoa: " + err;
    }
}

const updatePessoaDB = async (body) => {
    try {
        const { codigo, nome, cidade, uf } = body;
        const results = await pool.query(`UPDATE pessoa SET nome=$1,
        cidade=$2, uf=$3 WHERE codigo=$4 RETURNING 
        codigo, nome, cidade, uf`, [nome, cidade, uf, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const pessoa = results.rows[0];
        return new Pessoa(pessoa.codigo, pessoa.nome,
            pessoa.cidade, pessoa.uf);
    } catch (err) {
        throw "Erro ao atualizar a pessoa: " + err;
    }
}

const deletePessoaDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM pessoa
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido!`;
        } else {
            return "Pessoa removida com sucesso!"
        }
    } catch (err) {
        throw "Erro ao remover a pessoa: " + err;
    }
}

const getPessoaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM pessoa
        WHERE codigo=$1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}!`;
        } else {
            const pessoa = results.rows[0];
            return new Pessoa(pessoa.codigo, pessoa.nome,
                pessoa.cidade, pessoa.uf);
        }
    } catch (err) {
        throw "Erro ao recuperar a pessoa: " + err;
    }
}

module.exports = { getPessoasDB, addPessoaDB, updatePessoaDB, deletePessoaDB, 
getPessoaPorCodigoDB }
