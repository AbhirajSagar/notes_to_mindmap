'use client'
import { useCallback, useEffect } from 'react'
import { ReactFlow, addEdge, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes = 
[
  { id: '1', position: { x: 0, y: 50 }, data: { label: 'Start' } },
  { id: '2', position: { x: 200, y: 50 }, data: { label: 'Middle' } },
  { id: '3', position: { x: 400, y: 50 }, data: { label: 'End' } }
]

const initialEdges = 
[
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
]

export default function MindmapPage()
{
  useEffect(() => 
  {
    const storedData = sessionStorage.getItem("mindmapData");
    if (!storedData) return;

    const { nodes, edges } = JSON.parse(storedData);
    setNodes(nodes);
    setEdges(edges);
  },[]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)),[]);

  return (
    <div className="h-[90vh] w-full bg-gray-800 relative">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}