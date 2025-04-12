import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { Edge, Node, Options } from 'vis-network';

interface GraphNode {
  id: string;
  label: string;
  color: string;
  pos: string;
}

interface GraphEdge {
  from: string;
  to: string;
  label: string;
  color: string;
}

interface GraphData {
  nodes?: GraphNode[];
  edges?: GraphEdge[];
}

interface GraphVisualizerProps {
  data?: GraphData;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ 
  data = { 
    nodes: [], 
    edges: [] 
  } 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  // Получаем данные с защитой от undefined
  const { nodes: nodesData = [], edges: edgesData = [] } = data || {};

  useEffect(() => {
    if (!containerRef.current) return;

    // Создаем узлы
    const nodes = new DataSet<Node>(
      nodesData.map((node): Node => ({
        id: node.id,
        label: node.label || node.pos,
        color: {
          background: node.color || '#97C2FC',
          border: '#2B7CE9',
          highlight: {
            background: node.color || '#97C2FC',
            border: '#2B7CE9'
          },
          hover: {
            background: node.color || '#97C2FC',
            border: '#2B7CE9'
          }
        },
        title: `${node.pos}${node.label ? `: ${node.label}` : ''}`,
        font: { color: '#000000' },
        shape: 'box',
        margin: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        },
        borderWidth: 1,
        shadow: true
      }))
    );

    // Создаем ребра
    const edges = new DataSet<Edge>(
      edgesData.map((edge): Edge => ({
        from: edge.from,
        to: edge.to,
        label: edge.label,
        color: {
          color: edge.color || '#848484',
          highlight: edge.color || '#848484',
          hover: edge.color || '#848484',
          opacity: 1.0
        },
        arrows: {
          to: {
            enabled: true,
            type: 'arrow'
          }
        },
        font: {
          size: 12,
          color: edge.color || '#848484',
          align: 'middle'
        },
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          forceDirection: 'horizontal',
          roundness: 0.5
        },
        width: 1
      }))
    );

    const container = containerRef.current;
    const graphData = { nodes, edges };

    const options: Options = {
      layout: {
        hierarchical: {
          direction: 'UD',
          sortMethod: 'directed',
          nodeSpacing: 150,
          levelSeparation: 150
        }
      },
      physics: {
        hierarchicalRepulsion: {
          nodeDistance: 200
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200
      },
      height: '600px'
    };

    networkRef.current = new Network(container, graphData, options);

    return () => {
      networkRef.current?.destroy();
    };
  }, [nodesData, edgesData]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '600px', 
        border: '1px solid #ccc',
        backgroundColor: 'white' // Добавьте фон для сохранения
      }} 
    />
  );
};

export default GraphVisualizer;