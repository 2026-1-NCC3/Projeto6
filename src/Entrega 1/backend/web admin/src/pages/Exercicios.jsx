import { useState } from 'react';
import { Search, Plus, PlayCircle, Image as ImageIcon } from 'lucide-react';

export default function Exercicios() {
  const [exercicios, setExercicios] = useState([
    { id: 1, titulo: 'Alongamento Cervical Superior', tags: 'RPG, Postura', tipo: 'video', url: 'https://exemplo.com/cervical.mp4' },
    { id: 2, titulo: 'Fortalecimento Lombar (Isometria)', tags: 'Core, Prevenção, Dor Lombar', tipo: 'imagem', url: 'https://exemplo.com/lombar.jpg' },
    { id: 3, titulo: 'Liberação Miofascial (Rolo)', tags: 'Fáscia, Mobilidade', tipo: 'video', url: 'https://exemplo.com/liberacao.mp4' }
  ]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [formTitulo, setFormTitulo] = useState('');
  const [formDescricao, setFormDescricao] = useState('');
  const [formTags, setFormTags] = useState('');
  
  const handleSaveExercicio = (e) => {
    e.preventDefault();
    // Simulate Supabase insert with Storage upload logic
    const newEx = {
      id: exercicios.length + 1,
      titulo: formTitulo,
      tags: formTags,
      tipo: 'video', // mocked default
      url: '#'
    };
    setExercicios([newEx, ...exercicios]);
    setShowModal(false);
    setFormTitulo('');
    setFormDescricao('');
    setFormTags('');
  };

  const filteredExercicios = exercicios.filter(ex => ex.titulo.toLowerCase().includes(search.toLowerCase()) || ex.tags.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Banco de Exercícios</h1>
          <p style={{ color: 'var(--text-muted)' }}>Catálogo visual de mídias (Vídeos/Fotos) para envio aos planos de RPG.</p>
        </div>
        <button className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setShowModal(true)}>
          <Plus size={20} /> Efetuar Upload de Mídia
        </button>
      </header>

      {/* Busca */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Buscar exercício no catálogo ou pesquisar por tag (ex: 'dor', 'postura')..." 
            className="input-field" 
            style={{ paddingLeft: '48px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Galeria de Exercícios (Grid de Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredExercicios.map(ex => (
          <div key={ex.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '160px', background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
               {ex.tipo === 'video' ? <PlayCircle size={48} color="#94A3B8" /> : <ImageIcon size={48} color="#94A3B8" />}
               <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                 {ex.tipo.toUpperCase()}
               </span>
            </div>
            <div style={{ padding: '20px', flex: 1 }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--text-main)', lineHeight: '1.4' }}>{ex.titulo}</h3>
              <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>#{ex.tags.split(', ').join(' #')}</p>
            </div>
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
              <button style={{ background: 'none', border:'none', color: '#3B82F6', fontWeight: '500', cursor: 'pointer', fontSize: '13px' }}>Ver Detalhes</button>
              <button style={{ background: 'none', border:'none', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>Prescrever</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Upload */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '32px', background: '#FFF' }}>
            <h2 style={{ marginBottom: '24px' }}>Cadastrar Novo Padrão de Exercício</h2>
            <form onSubmit={handleSaveExercicio} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="label-text">Título Comercial do Exercício</label>
                <input required type="text" className="input-field" value={formTitulo} onChange={e => setFormTitulo(e.target.value)} />
              </div>
              <div>
                <label className="label-text">Descrição Completa</label>
                <textarea required className="input-field" style={{ minHeight: '80px', resize: 'vertical' }} value={formDescricao} onChange={e => setFormDescricao(e.target.value)} />
              </div>
              <div>
                <label className="label-text">Tags Relacionadas (separadas por vírgula)</label>
                <input required type="text" className="input-field" value={formTags} onChange={e => setFormTags(e.target.value)} placeholder="RPG, Alongamento, Cervical..." />
              </div>
              <div>
                <label className="label-text">Arquivo de Mídia (Upload para Storage)</label>
                <div style={{ border: '2px dashed #94A3B8', padding: '32px', textAlign: 'center', borderRadius: '8px', background: '#F8FAFC', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Clique ou arraste um arquivo do seu computador</p>
                  <p style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold' }}>Formatos suportados: .MP4, .PNG, .JPG</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn-primary" style={{ background: '#F1F5F9', color: '#64748B' }} onClick={() => setShowModal(false)}>Cancelar Operação</button>
                <button type="submit" className="btn-accent" style={{ background: 'var(--primary)' }}>Realizar Upload Seguro</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
