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

  const { nodes: nodesData = [], edges: edgesData = [] } = data || {};

  useEffect(() => {
    if (!containerRef.current) return;

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
        font: { 
          color: '#000000',
          size: 16, // Увеличенный базовый размер шрифта
          face: 'Arial',
          strokeWidth: 3, // Более толстая обводка
          strokeColor: '#ffffff',
          bold: {
            color: '#000000',
            size: 16,
            vadjust: 0,
            mod: 'bold'
          }
        },
        shape: 'box',
        margin: {
          top: 12,
          right: 12,
          bottom: 12,
          left: 12
        },
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.2)',
          size: 10,
          x: 5,
          y: 5
        },
        widthConstraint: {
          minimum: 120,
          maximum: 200
        },
        scaling: {
          min: 10, // Минимальный размер при отдалении
          max: 30, // Максимальный размер при приближении
          label: {
            enabled: true,
            min: 12, // Минимальный размер шрифта
            max: 16, // Максимальный размер шрифта
            maxVisible: 30, // Максимальный уровень масштаба, при котором показывается текст
            drawThreshold: 5 // Порог отрисовки текста
          }
        },
        chosen: {
          node: function(values: any, id: any, selected: any, hovering: any) {
            values.borderWidth = 3;
            values.shadowSize = 15;
            return values;
          },
          label: function(values: any, id: any, selected: any, hovering: any) {
            return values;
          },
        }
      }))
    );

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
            type: 'arrow',
            scaleFactor: 1.2
          }
        },
        font: {
          size: 14,
          color: edge.color || '#848484',
          align: 'middle',
          face: 'Arial',
          strokeWidth: 3,
          strokeColor: '#ffffff',
          background: 'rgba(255,255,255,0.7)',
          bold: {
            color: edge.color || '#848484',
            size: 14,
            vadjust: 0,
            mod: 'bold'
          }
        },
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          forceDirection: 'horizontal',
          roundness: 0.5
        },
        width: 2,
        selectionWidth: 3,
        hoverWidth: 3,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.1)',
          size: 10,
          x: 2,
          y: 2
        },
        scaling: {
          min: 1,
          max: 3,
          label: {
            enabled: true,
            min: 10,
            max: 14,
            maxVisible: 30,
            drawThreshold: 5
          }
        }
      }))
    );

    const container = containerRef.current;
    const graphData = { nodes, edges };

    const options: Options = {
      layout: {
        hierarchical: {
          direction: 'UD',
          sortMethod: 'directed',
          nodeSpacing: 200,
          levelSeparation: 200,
          shakeTowards: 'leaves'
        }
      },
      physics: {
        hierarchicalRepulsion: {
          nodeDistance: 250,
          centralGravity: 0.1,
          springLength: 200,
          springConstant: 0.01,
          damping: 0.09
        },
        solver: 'hierarchicalRepulsion',
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 25
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200,
        hideEdgesOnDrag: false,
        multiselect: true,
        navigationButtons: true,
        keyboard: true,
        zoomView: true,
        zoomSpeed: 0.5 // Более плавное масштабирование
      },
      nodes: {
        font: {
          size: 16,
          face: 'Arial',
          strokeWidth: 3,
          strokeColor: '#ffffff'
        }
      },
      edges: {
        font: {
          size: 14,
          face: 'Arial',
          strokeWidth: 3,
          strokeColor: '#ffffff'
        }
      },
      height: '100%',
      width: '100%',
      autoResize: true,
      configure: {
        enabled: false,
        filter: 'nodes,edges',
        showButton: false
      }
    };

    networkRef.current = new Network(container, graphData, options);

    // Настройка обработчиков для улучшения читаемости
    networkRef.current.on('zoom', (params: any) => {
      const scale = params.scale;
      if (scale < 0.5) {
        // При сильном отдалении делаем текст более заметным
        nodes.update(
          nodes.get().map(node => ({
            id: node.id,
            font: {
              size: Math.max(12, 16 * scale * 2), // Динамический размер шрифта
              strokeWidth: 4,
              strokeColor: '#ffffff'
            }
          }))
        );
      }
    });

    const handleResize = () => {
      networkRef.current?.redraw();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      networkRef.current?.destroy();
    };
  }, [nodesData, edgesData]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '70vh',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }} 
    />
  );
};

export default GraphVisualizer;