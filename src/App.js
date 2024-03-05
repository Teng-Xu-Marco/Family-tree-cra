import Dagre from '@dagrejs/dagre';
import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';

import { initialNodes, initialEdges } from './nodes-edges.js';

import InputPanel from './components/InputPanel.js';
import 'reactflow/dist/style.css';

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [newNodeName, setNodeName] = useState('');
  const [sourceNode, setSourceNode] = useState('');
  const [targetNode, setTargetNode] = useState('');

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges, fitView]
  );

  const onConnect = (params) => {
    const newEdge = { id: `${params.source}-${params.target}`, source: params.source, target: params.target };
    setEdges([...edges, newEdge]);
  };

  useEffect(() => {
    onLayout('TB');
  }, [onLayout]);

  const findNodeIdByLabel = (label) => {
    for (const node of nodes) {
      if (node.data.label === label) {
        return node.id;
      }
    }
    return null;
  };

  const addNodeAndEdgeHandler = (event) => {
    event.preventDefault();
    let newnodeid = findNodeIdByLabel(newNodeName);
    if (newnodeid === null) {
      const newNode = {
        id: Math.random().toString(),
        type: 'default',
        data: { label: newNodeName },
        position: { x: 0, y: 0 },
      };
      newnodeid = newNode.id;
      setNodes((prevNodes) => [...prevNodes, newNode]);
    }
    setNodeName('');

    const sourcenodeId = findNodeIdByLabel(sourceNode);
    const targetnodeId = findNodeIdByLabel(targetNode);
    if (sourcenodeId !== null) {
      const newEdge = { id: Math.random().toString(), source: sourcenodeId, target: newnodeid, animated: true };
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }
    if (targetnodeId !== null) {
      const newEdge = { id: Math.random().toString(), source: newnodeid, target: targetnodeId, animated: true };
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }
    setSourceNode('');
    setTargetNode('');
  };

  const textChangeHandler = (event) => {
    setNodeName(event.target.value);
  };

  const sourceChangeHandler = (event) => {
    setSourceNode(event.target.value);
  };

  const targetChangeHandler = (event) => {
    setTargetNode(event.target.value);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <InputPanel
          addNodeAndEdge={addNodeAndEdgeHandler}
          newNodeName={newNodeName}
          sourceNode={sourceNode}
          targetNode={targetNode}
          textChange={textChangeHandler}
          sourceChange={sourceChangeHandler}
          targetChange={targetChangeHandler}
        />
      </ReactFlow>
    </div>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
