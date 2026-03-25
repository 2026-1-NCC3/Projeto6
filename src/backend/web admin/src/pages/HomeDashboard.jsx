// src/pages/HomeDashboard.jsx
export default function HomeDashboard() {
  return (
    <>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Visão Geral</h1>
          <p style={{ color: 'var(--text-muted)' }}>Bem-vindo de volta. Aqui está o resumo da clínica hoje.</p>
        </div>
      </header>

      {/* Cards de Indicadores (Dashboard Metricas Iniciais) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>Pacientes Ativos</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: '1' }}>42</p>
            <span style={{ color: '#10B981', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>+3 este mês</span>
          </div>
        </div>
        
        <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>Exercícios no Banco</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: '1' }}>156</p>
          </div>
        </div>
        
        <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--accent)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>Taxa de Adesão Média</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: '1' }}>88%</p>
            <span style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>-2% semana</span>
          </div>
        </div>
      </div>
    </>
  );
}
