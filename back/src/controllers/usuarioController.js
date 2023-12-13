const usuarioModel = require('../models/usuarioModel');

const salvarUsuario = (req, res) => {
  const { nome, email, datanasc, senha} = req.body;

  
  usuarioModel.salvarUsuario(nome, email, datanasc, senha, (err, resultado) => {
    if (err) {
      console.error('Erro ao salvar o usuario:', err);
      return res.status(500).json({ error: 'Erro ao salvar o usuario' });
    }
    res.status(200).json({ message: 'Usuario salvo com sucesso', resultado });
  });
};

const atualizarUsuario = (req, res) => {
  const { id, nome, email, datanasc, senha } = req.body;

  usuarioModel.atualizarUsuario(id, nome, email, datanasc, senha, (err, resultado) => {
    if (err) {
      console.error('Erro ao atualizar o usuario:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o usuario' });
    }
    res.status(200).json({ message: 'Usuario atualizado com sucesso', resultado });
  });
};

const excluirUsuario = (req, res) => {
  const { id } = req.params;

  usuarioModel.excluirUsuario(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao excluir o usuario:', err);
      return res.status(500).json({ error: 'Erro ao excluir o usuario' });
    }
    res.status(200).json({ message: 'Usuario excluído com sucesso', resultado });
  });
};

const listarUsuarios = (req, res) => {
  usuarioModel.listarUsuarios((err, resultados) => {
    if (err) {
      console.error('Erro ao listar os usuarios:', err);
      return res.status(500).json({ error: 'Erro ao listar os usuarios' });
    }
    res.status(200).json(resultados);
  });
};

const buscarUsuarioPorId = (req, res) => {
  const {id} = req.params;
  usuarioModel.buscarUsuarioPorId(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao listar os usuarios:', err);
      return res.status(500).json({ error: 'Erro ao listar os usuarios' });
    }
    res.status(200).json({ message: 'Usuario encontrado', resultado });
    
  });
};


module.exports = { salvarUsuario, excluirUsuario, atualizarUsuario, listarUsuarios, buscarUsuarioPorId };
