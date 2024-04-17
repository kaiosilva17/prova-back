const Aluno = require("../models/Aluno")

const alunoController = {
    getAll: async (req, res) => {
        res.json(await Aluno.find())
    },
    getRecuperacao: async (req, res) => {
        res.json(await Aluno.find( {media: {$gte: 5, $lt: 7}}))
    },
    getAprovados: async (req, res) => {
        res.json(await Aluno.find( {media: {$gte: 7}} ))
    },
    getReprovados: async (req, res) => {
        res.json(await Aluno.find( {media: {$lt: 5}}))
    },
    get: async (req, res) => {
        try {
            res.json(await Aluno.findById(req.params.id))
        } catch (error) {
            res.status(404).json({ error: "Registro não encontrado" })
        }
    },

    //metodo sem condicional no models
    /*create: async (req, res) => {
        try {

            let soma = 0
            const notas = req.body.notas
            const aluno = req.body

            for (let n of notas) {
                if( n < 0 || n > 10){
                    return res.status(400).json(
                        {message: 'Não pode haver nota menor que 0 e maior que 10'}
                        )
                }
                soma += n
            }

            const media = soma / notas.length

            aluno.media = media

            res.json(await Aluno.create(aluno))
        } catch (error) {
            res.status(400).json(error.message)
        }
    },*/

    //metodo usando o models
    create: async (req, res) => {
        try {
            const aluno = req.body;
    
            // Calcula a média das notas
            const media = aluno.notas.reduce((acc, nota) => acc + nota, 0) / aluno.notas.length;
    
            // Atribui a média ao aluno
            aluno.media = media;
    
            // Cria o aluno no banco de dados
            const novoAluno = await Aluno.create(aluno);
    
            res.json(novoAluno);
        } catch (error) {
            res.status(400).json(error.message);
        }
    },
    update: async (req, res) => {
        try {
            res.json(await Aluno.updateMany( {turmas : "E"}, {turmas: "B"} ))
        } catch (error) {
            res.status(404).json({ error: "Registro não encontrado" })
        }
    },
    updateID: async (req, res) => {
        try {
            res.json(await Aluno.findByIdAndUpdate(req.params.id, req.body))
        } catch (error) {
            res.status(404).json({ error: "Registro não encontrado" })
        }
    },
    delete: async (req, res) => {
        try {
            res.json(await Aluno.deleteMany({nome: "Teste"}))
        } catch (error) {
            res.status(404).json({ error: "Registro não encontrado" })
        }
    },
    deleteAll: async (req, res) => {
        try {
            const deleteResult = await Aluno.deleteMany({});
            if (deleteResult.deletedCount > 0) {
                res.json({ message: "Todos os alunos foram deletados com sucesso." });
            } else {
                res.json({ message: "Não há alunos para deletar." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao tentar deletar alunos." });
        }
    },
    deleteID: async (req, res) => {
        try {
            console.log("deleteAll")
            res.json(await Aluno.findByIdAndDelete(req.params.id))
        } catch (error) {
            res.status(404).json({ error: "Registro não encontrado" })
        }
    },
    
}

module.exports = alunoController