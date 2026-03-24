import { Outlet, Link } from 'react-router-dom';
import { Users, Activity, LogOut, Dumbbell, ClipboardList } from 'lucide-react';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Lateral */}
      <aside style={{ width: '260px', background: 'var(--bg-sidebar)', color: 'white', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '48px', fontSize: '24px', display:'flex', alignItems:'center', gap:'12px' }}>
          <Activity size={28} /> Maya Admin
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 'bold' }}>Menu Principal</p>
          
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#FFF', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>
            <Activity size={20} /> Visão Geral
          </Link>
          <Link to="/dashboard/pacientes" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', padding: '12px', borderRadius: '8px', transition: 'all 0.2s' }}>
            <Users size={20} /> Gestão de Pacientes
          </Link>
          <Link to="/dashboard/exercicios" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', padding: '12px', borderRadius: '8px', transition: 'all 0.2s' }}>
            <Dumbbell size={20} /> Banco de Exercícios
          </Link>
          <Link to="/dashboard/prontuarios" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94A3B8', padding: '12px', borderRadius: '8px', transition: 'all 0.2s' }}>
            <ClipboardList size={20} /> Prontuários
          </Link>
        </nav>
        
        <div style={{ flexGrow: 1 }} />
        
        <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent)', marginTop: 'auto', padding: '12px' }}>
          <LogOut size={20} /> Sair da Conta
        </Link>
      </aside>

      {/* Conteúdo Principal Dinâmico */}
      <main style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
