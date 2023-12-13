// usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/salvar-usuario', usuarioController.salvarUsuario);
router.put('/atualizarusuario', usuarioController.atualizarUsuario);
router.delete('/excluir-usuario/:id', usuarioController.excluirUsuario);
router.get('/listar-usuarios', usuarioController.listarUsuarios);
router.get('/listar-usuarios/:id', usuarioController.buscarUsuarioPorId);

module.exports = router;
