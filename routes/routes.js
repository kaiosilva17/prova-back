const express = require("express");
const alunosController = require('../controllers/alunoControllers')
const router = express.Router();

router.get('/alunos', (req, res) => alunosController.getAll(req, res))
router.get('/alunos/recuperacao', (req, res) => alunosController.getRecuperacao(req, res))
router.get('/alunos/aprovados', (req, res) => alunosController.getAprovados(req, res))
router.get('/alunos/reprovados', (req, res) => alunosController.getReprovados(req, res))
router.get('/alunos/:id', (req, res) => alunosController.get(req, res))
router.post('/alunos', (req, res) => alunosController.create(req, res))
router.delete('/alunos/deletar', (req, res) => alunosController.delete(req, res))
router.put('/alunos/:id', (req, res) => alunosController.update(req, res))

module.exports = router