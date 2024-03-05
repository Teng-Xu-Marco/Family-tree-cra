export const initialNodes = [
    {
        id: '1',
        data: { label: 'Ethan' },
        position: { x: 0, y: 0 },
    },
    {
        id: '2',
        data: { label: 'Sophia' },
        position: { x: 0, y: 0 },
    },
    {
        id: '2a',
        data: { label: 'Liam' },
        position: { x: 0, y: 0 },
    },
    {
        id: '2b',
        data: { label: 'Emma' },
        position: { x: 0, y: 0 },
    },
    {
        id: '2c',
        data: { label: 'Noah' },
        position: { x: 0, y: 0 },
    },
    {
        id: '2d',
        data: { label: 'Olivia' },
        position: { x: 0, y: 0 },
    },
    {
        id: '3',
        data: { label: 'Ava' },
        position: { x: 0, y: 0 },
    },
];

export const initialEdges = [
    { id: 'e12', source: '1', target: '2', animated: true },
    { id: 'e13', source: '1', target: '3', animated: true },
    { id: 'e22a', source: '2', target: '2a', animated: true },
    { id: 'e22b', source: '2', target: '2b', animated: true },
    { id: 'e22c', source: '2', target: '2c', animated: true },
    { id: 'e2c2d', source: '2c', target: '2d', animated: true },
];
