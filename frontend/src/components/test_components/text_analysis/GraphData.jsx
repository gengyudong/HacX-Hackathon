// graphData.js

// Function to generate nodes and edges
export const generateGraphData = (numNodes, numEdges) => {
  const nodes = [];
  const edges = [];

  // Generate nodes
  for (let i = 1; i <= numNodes; i++) {
    nodes.push({
      id: `${i}`, // Using string IDs
      label: `user${i}`, // Using string labels
    });
  }

  // Generate edges
  const edgeSet = new Set(); // To avoid duplicate edges
  while (edges.length < numEdges) {
    const source = Math.floor(Math.random() * numNodes) + 1; // Random source node
    const target = Math.floor(Math.random() * numNodes) + 1; // Random target node

    // Ensure we don't create a self-loop and that the edge is unique
    if (source !== target) {
      const edgeId = `${source}-${target}`;
      const reverseEdgeId = `${target}-${source}`;

      if (!edgeSet.has(edgeId) && !edgeSet.has(reverseEdgeId)) {
        edges.push({
          source: `${source}`,
          target: `${target}`,
          id: edgeId,
        });
        edgeSet.add(edgeId);
      }
    }
  }

  return { nodes, edges };
};
