import { useState } from 'react';
import { Search, FileText, Calendar, Plus } from 'lucide-react';

export default function Prontuarios() {
  // Dados MOCKADOS para funcionamento super-rápido nesta interface, até integrarmos isso na tabela do BD.
  const [pacientes] = useState([
    { id: 1, nome: 'Rafael C.', email: 'rafael.chagas@gmail.com' },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@gmail.com' }
  ]);
  
  const [prontuarios, setProntuarios] = useState([
    { id: 101, pacienteId: 1, data: '2026-03-20', observacao: 'Paciente relatou leve melhora na dor cervical. Realizamos alongamentos e ajustes posturais sentados.', dor: 4 },
    { id: 102, pacienteId: 1, data: '2026-03-23', observacao: 'Dor praticamente zerada no pescoço. Iniciamos fortalecimento escapular.', dor: 1 }
  ]);

  const [selectedPacienteId, setSelectedPacienteId] = useState(1);
  const [showNovaSessao, setShowNovaSessao] = useState(false);
  const [novaData, setNovaData] = useState('');
  const [novaDor, setNovaDor] = useState(5);
  const [novaObs, setNovaObs] = useState('');

  const selectedPaciente = pacientes.find(p => p.id === Number(selectedPacienteId));
  const historico = prontuarios.filter(p => p.pacienteId === Number(selectedPacienteId)).sort((a,b) => new Date(b.data) - new Date(a.data));

  const handleSalvarSessao = (e) => {
    e.preventDefault();
    const novoRegistro = {
      id: Date.now(),
      pacienteId: Number(selectedPacienteId),
      data: novaData,
      dor: Number(novaDor),
      observacao: novaObs
    };
    setProntuarios([novoRegistro, ...prontuarios]);
    setShowNovaSessao(false);
    setNovaData('');
    setNovaDor(5);
    setNovaObs('');
  };

  return (
    <div style={{ display: 'flex', gap: '32px' }}>
      {/* Coluna Esquerda: Sessões do Paciente */}
      <div style={{ flex: 1 }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Prontuário Eletrônico</h1>
          <p style={{ color: 'var(--text-muted)' }}>Histórico clínico e evolução por sessão.</p>
        </header>

        <div className="glass-card" style={{ padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <FileText size={24} color="var(--primary)" />
          <div style={{ flex: 1 }}>
            <label className="label-text">Selecione o Paciente para visualizar a Ficha:</label>
            <select className="input-field" value={selectedPacienteId} onChange={e => setSelectedPacienteId(e.target.value)}>
              {pacientes.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px' }}>Histórico de Consultas</h2>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#10B981' }} onClick={() => setShowNovaSessao(true)}>
            <Plus size={18} /> Cadastrar Evolução
          </button>
        </div>

        {historico.length === 0 ? (
          <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>Nenhuma sessão registrada. Crie a evolução primária clicando acima.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {historico.map(h => (
              <div key={h.id} className="glass-card" style={{ padding: '24px', borderLeft: `4px solid ${h.dor > 6 ? '#EF4444' : h.dor > 3 ? '#F59E0B' : '#10B981'}`, background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
                    <Calendar size={18} /> {new Date(h.data).toLocaleDateString('pt-BR')}
                  </div>
                  <div style={{ background: '#F1F5F9', padding: '6px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #E2E8F0' }}>
                    Dor Relatada Escala: {h.dor}/10
                  </div>
                </div>
                <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '15px' }}>{h.observacao}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coluna Direita: Resumo do Paciente Selecionado */}
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '108px' }}>
         <div className="glass-card" style={{ padding: '32px 24px', background: 'var(--primary)', color: 'white', borderRadius: '24px' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
               {selectedPaciente?.nome.charAt(0)}
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '4px', color: 'white' }}>{selectedPaciente?.nome}</h3>
            <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '24px' }}>{selectedPaciente?.email}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px' }}>
               <div>
                 <p style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Total Sessões</p>
                 <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px' }}>{historico.length}</p>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <p style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Dor Atualização</p>
                 <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px' }}>{historico[0]?.dor || '-'}<span style={{fontSize:'12px', opacity:0.8}}>/10</span></p>
               </div>
            </div>
         </div>
      </div>

      {/* Modal Nova Sessão */}
      {showNovaSessao && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="glass-card" style={{ padding: '32px', width: '100%', maxWidth: '500px', background: 'white' }}>
            <h2 style={{ marginBottom: '24px' }}>Registrar Evolução Clínica</h2>
            <form onSubmit={handleSalvarSessao} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="label-text">Data da Sessão no Consultório</label>
                <input required type="date" className="input-field" value={novaData} onChange={e => setNovaData(e.target.value)} />
              </div>
              <div>
                <label className="label-text">Nível de Dor da Queixa (Escala Analógica de 0 a 10)</label>
                <input required type="number" min="0" max="10" className="input-field" value={novaDor} onChange={e => setNovaDor(e.target.value)} />
              </div>
              <div>
                <label className="label-text">Observações / Conduta Realizada hoje</label>
                <textarea required className="input-field" style={{ minHeight: '120px', resize: 'vertical' }} value={novaObs} onChange={e => setNovaObs(e.target.value)} placeholder="Paciente referiu melhora na mobilidade..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" className="btn-primary" style={{ background: '#F1F5F9', color: 'var(--text-main)' }} onClick={() => setShowNovaSessao(false)}>Cancelar</button>
                <button type="submit" className="btn-accent" style={{ background: '#10B981' }}>Registrar Prontuário</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
