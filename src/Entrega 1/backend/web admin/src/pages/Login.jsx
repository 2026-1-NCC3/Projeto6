import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === 'admin@maya.com' && password === 'admin') {
      navigate('/dashboard');
    } else {
      setError('Acesso negado. Use admin@maya.com / admin para testar.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'linear-gradient(135deg, #F5F7FA 0%, #E2E8F0 100%)' }}>
      <div className="glass-card" style={{ padding: '48px 40px', width: '100%', maxWidth: '420px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '28px' }}>
          <Stethoscope size={32} /> Clínica Maya
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px', fontWeight: '500' }}>Portal do Fisioterapeuta</p>
        
        {error && <div style={{ color: 'var(--accent)', background: 'rgba(240, 113, 103, 0.1)', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', textAlign: 'center', border: '1px solid rgba(240, 113, 103, 0.3)' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="label-text">E-mail Corporativo</label>
            <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@maya.com" required />
          </div>
          <div>
            <label className="label-text">Senha</label>
            <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '8px', padding: '14px', fontSize: '16px' }}>ACESSAR PAINEL</button>
        </form>
      </div>
    </div>
  );
}
