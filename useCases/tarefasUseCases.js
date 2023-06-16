const { pool } = require("../config");
const Tarefa = require("../entities/tarefas")

//ver essa cons no inner join
const getTarefasDB = async () => {
    try {
        const { rows } = await pool.query(`select t.codigo as codigo, 
        t.titulo as titulo, t.descricao as descricao, 
        t.codigo_pessoa as pessoa , p.nome as nomepessoa
        from tarefa t
        join pessoa p on t.codigo_pessoa = p.codigo
        order by t.codigo`);
        return rows.map((tarefa) => new Tarefa(tarefa.codigo, tarefa.titulo, 
            tarefa.descricao, tarefa.pessoa, tarefa.nomepessoa));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addTarefaDB = async (body) => {
    try {
        const {titulo, descricao, nomepessoa } = body;
        const results = await pool.query(`INSERT INTO tarefa 
        (titulo, descricao, codigo_pessoa) values ($1, $2, $3) RETURNING 
        codigo, titulo, descricao, codigo_pessoa`, 
        [titulo, descricao, pessoa, nomepessoa]);
        const tarefa = results.rows[0];
        return new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao,
            tarefa.pessoa, tarefa.nomepessoa);
    } catch (err) {
        throw "Erro ao inserir a tarefa: " + err;
    }
}

const updateTarefaDB = async (body) => {
    try {
        const { codigo, titulo, descricao, nomepessoa } = body;
        const results = await pool.query(`UPDATE tarefa SET titulo=$1,
        descricao=$2, codigo_pessoa=$5 WHERE codigo=$5 RETURNING 
        codigo, titulo, descricao, codigo_pessoa`, 
        [titulo, descricao, pessoa, nomepessoa, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const tarefa = results.rows[0];
        return new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao,
            tarefa.pessoa, tarefa.nomepessoa);
    } catch (err) {
        throw "Erro ao atualizar a tarefa: " + err;
    }
}

const deleteTarefaDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM tarefa
        WHERE codigo=$1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Tarefa removida com sucesso!"
        }
    } catch (err) {
        throw "Erro ao remover a tarefa: " + err;
    }
}

const getTarefaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM tarefa 
        WHERE codigo=$1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}!`;
        } else {
            const tarefa = results.rows[0];
            return new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao,
                tarefa.pessoa, tarefa.nomepessoa);
        }
    } catch (err) {
        throw "Erro ao recuperar a tarefa: " + err;
    }
}

module.exports = {
    getTarefasDB, addTarefaDB, updateTarefaDB, deleteTarefaDB,
    getTarefaPorCodigoDB
}