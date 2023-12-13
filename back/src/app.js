// app.js
const { app } = require('./config');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
