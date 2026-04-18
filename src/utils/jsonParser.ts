import type { Node, Edge } from '@xyflow/react';

export function jsonToFlow(json: unknown) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let nodeId = 0;

  function traverse(data: unknown, parentId: string | null = null, label: string = 'root') {
    const id = `node-${nodeId++}`;

    let displayLabel = label;
    if (typeof data !== 'object' || data === null) {
      displayLabel = `${label}: ${data}`;
    }

    const node: Node = {
      id,
      data: { label: displayLabel },
      position: { x: 0, y: 0 },
      type: typeof data === 'object' && data !== null ? 'default' : 'output',
      style: {
        background: '#333',
        color: '#fff',
        border: '1px solid #555',
        borderRadius: '5px',
        padding: '10px',
      }
    };

    nodes.push(node);

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: true,
        style: { stroke: '#888' },
      });
    }

    if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          traverse(item, id, `[${index}]`);
        });
      } else {
        Object.entries(data).forEach(([key, value]) => {
          traverse(value, id, key);
        });
      }
    }

    return id;
  }

  traverse(json);

  const nodeMap = new Map<string, Node>(nodes.map(n => [n.id, n]));
  const levels: { [key: number]: number } = {};
  const spacingX = 250;
  const spacingY = 100;

  function assignPositions(id: string, depth: number) {
    const node = nodeMap.get(id);
    if (!node) return;

    if (!levels[depth]) levels[depth] = 0;

    node.position = {
      x: levels[depth] * spacingX,
      y: depth * spacingY
    };

    levels[depth]++;

    const childEdges = edges.filter(e => e.source === id);
    childEdges.forEach(edge => assignPositions(edge.target, depth + 1));
  }

  if (nodes.length > 0) {
    assignPositions(nodes[0].id, 0);
  }

  return { nodes, edges };
}
