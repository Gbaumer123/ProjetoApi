 // usuarioModel.js
 const { connection } = require('../config');

 class usuarioModel {
   static salvarUsuario(nome, email, datanasc, senha, callback) {
     const query = 'INSERT INTO usuario (nome, email, dataNasc , senha) VALUES (?, ?, ?, ?)';
     connection.query(query, [nome, email, datanasc, senha], (err, results) => {
       if (err) {
         return callback(err, null);
       }
       callback(null, results);
     });
   }
 
   static buscarUsuarioPorId(id, callback) {
     const query = 'SELECT * FROM usuario WHERE id = ?';
     connection.query(query, [id], (err, results) => {
       if (err) {
         return callback(err, null);
       }
       if (results.length === 0) {
         return callback(null, null); 
       }
       callback(null, results);
     });
   }
 
 
 
 
   static atualizarUsuario(id, nome, email, datanasc, senha, callback) {
     const query = 'UPDATE usuario SET nome=?, email=?, datanasc=?, senha=? WHERE id=?';
     connection.query(query, [nome, email, datanasc, senha, id], (err, results) => {
       if (err) {
         return callback(err, null);
       } 
       callback(null, results);
     });
   }
 
 
   static excluirUsuario(id, callback) {
     const query = 'DELETE FROM usuario WHERE id=?';
     connection.query(query, [id], (err, results) => {
       if (err) {
         return callback(err, null);
       }
       callback(null, results);
     });
   }
   
   
   static listarUsuarios(callback) {
     const query = 'SELECT * FROM usuario';
     connection.query(query, (err, results) => {
       if (err) {
         return callback(err, null);
       }
       callback(null, results);
     });
   }
   
 
 }
 
 module.exports = usuarioModel;