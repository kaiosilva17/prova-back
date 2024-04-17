const mongoose = require('mongoose')

const Schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        turmas: {
            type: String,
            enum: ["A", "B", "C", "D", "E"]
        },
        notas: [{
            type: Number,
            min: [0, 'Não pode haver nota menor que 0'],
            max: [10, 'Não pode haver nota maior que 10'],
        }],
        media: Number
        
})

const Aluno = mongoose.model('aluno', Schema)

module.exports = Aluno