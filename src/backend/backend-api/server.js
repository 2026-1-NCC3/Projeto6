require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares Globais
app.use(cors()); // Permite requisições de outras origens (Ex: Android Emuladores)
app.use(express.json()); // Lê todo o tráfego de chegada em formato JSON

// Rotas Básicas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/paciente', require('./routes/pacienteRoutes'));
app.use('/api/agendamentos', require('./routes/agendaRoutes'));

// Rota de Teste para o navegador
app.get('/', (req, res) => {
    res.json({ message: "O servidor da Clínica RPG está ONLINE! 🌟" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[SERVER] Rodando na porta ${PORT}`);
});
