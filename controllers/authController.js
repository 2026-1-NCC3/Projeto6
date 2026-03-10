const db = require('../db');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // [SIMULAÇÃO PARA FINS DIDÁTICOS / PROJETO MOCKUP]
        // Num projeto real, buscaríamos no banco validando hash da senha. Exemplo:
        // const result = await db.query('SELECT * FROM pacientes WHERE email = $1', [email]);

        if (email && senha) {
            // Sucesso Simulado (Login genérico funciona)
            return res.status(200).json({
                sucesso: true,
                mensagem: "Login autorizado com sucesso!",
                usuario: {
                    id: 1,
                    nome: "Rafael C.",
                    email: email
                },
                token: "JWT_SECURE_TOKEN_FALSO_123"
            });
        }

        return res.status(401).json({ erro: "E-mail ou senha inválidos." });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};
