import { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import FlowCanvas from './components/FlowCanvas';
import { jsonToFlow } from './utils/jsonParser';

const initialJson = {
  "project": "JSON Visualizer",
  "version": "1.0.0",
  "author": {
    "name": "Jules",
    "role": "Software Engineer"
  },
  "features": ["React", "TypeScript", "React Flow", "Dark Theme"],
  "settings": {
    "darkMode": true,
    "layout": "horizontal"
  }
};

function App() {
  const [jsonText, setJsonText] = useState(JSON.stringify(initialJson, null, 2));

  const { nodes, edges, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText);
      const { nodes: newNodes, edges: newEdges } = jsonToFlow(parsed);
      return { nodes: newNodes, edges: newEdges, error: null };
    } catch (e) {
      return { nodes: [], edges: [], error: (e as Error).message };
    }
  }, [jsonText]);

  return (
    <div className="app-container">
      <Sidebar
        jsonText={jsonText}
        setJsonText={setJsonText}
        error={error}
      />
      <main className="main-content">
        <FlowCanvas nodes={nodes} edges={edges} />
      </main>
    </div>
  );
}

export default App;
