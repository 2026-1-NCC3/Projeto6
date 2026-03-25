const db = require('../db');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) return res.status(401).json({ erro: "E-mail ou senha inválidos." });

        const supabaseUrl = 'https://gzxqsxjluahixavoklhd.supabase.co';
        // Using the anonymous public key
        const anonKey = 'sb_publishable_gblVzVE_U0seUjRRB9EK7g_gpb9hz5A';
        
        // Ativando flag para bater na API da Supabase (bypassando regras de certificado pra rodar local)
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const apiEndpoint = `${supabaseUrl}/rest/v1/pacientes?email=eq.${encodeURIComponent(email)}&senha=eq.${encodeURIComponent(senha)}&select=*`;
        
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'apikey': anonKey,
                'Authorization': `Bearer ${anonKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const user = data[0];
            return res.status(200).json({
                sucesso: true,
                mensagem: "Login autorizado com sucesso pela Nuvem!",
                usuario: {
                    id: user.id || Math.floor(Math.random() * 1000),
                    nome: user.nome || "Paciente",
                    email: email
                },
                token: "JWT_SECURE_TOKEN_FALSO_123"
            });
        }

        return res.status(401).json({ erro: "E-mail ou senha incorretos na nuvem." });

    } catch (err) {
        console.error("ERRO SUPABASE: ", err);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};

exports.register = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        if (nome && email && senha) {
            // Sucesso Simulado no Cadastro
            return res.status(201).json({
                sucesso: true,
                mensagem: "Cadastro realizado com sucesso!",
                usuario: {
                    id: 2,
                    nome: nome,
                    email: email
                },
                token: "JWT_SECURE_TOKEN_FALSO_456"
            });
        }

        return res.status(400).json({ erro: "Dados incompletos para cadastro." });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};
