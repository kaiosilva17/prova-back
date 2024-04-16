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
            res.json(await Aluno.create(req.params.id))
        } catch (error) {
            res.status(404).json({ error: "Registro não encontrado" })
        }
    },
    create: async (req, res) => {
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
    },
    update: async (req, res) => {
        try {
            res.json(await Aluno.updateMany( {turma : "E"}, {turma: "B"} ))
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
}

module.exports = alunoController