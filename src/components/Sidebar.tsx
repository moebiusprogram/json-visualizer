import React from 'react';

interface SidebarProps {
  jsonText: string;
  setJsonText: (text: string) => void;
  error: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ jsonText, setJsonText, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonText(e.target.value);
  };

  return (
    <aside className="sidebar">
      <h2>Entrada JSON</h2>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>
        Pega tu JSON abajo para visualizarlo como un gráfico.
      </p>
      <textarea
        value={jsonText}
        onChange={handleChange}
        placeholder="Ingresa JSON aquí..."
        spellCheck={false}
      />
      {error && (
        <div className="error-message">
          <strong>JSON Inválido:</strong> {error}
        </div>
      )}
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
        Desarrollado con React Flow
      </div>
    </aside>
  );
};

export default Sidebar;
