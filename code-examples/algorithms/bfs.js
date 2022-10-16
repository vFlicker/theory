function bfs(graph, root) {
  let nodesLen = {}
  for (let i = 0; i < graph.length; i++) {
      nodesLen[i] = Infinity
  }
  nodesLen[root] = 0
  let queue = [root]
  let current
  while (queue.length !== 0) {
      current = queue.shift()

      let curConnected = graph[current]
      let neighborIdx = []
      let idx = curConnected.indexOf(1)
      while (idx !== -1) {
          neighborIdx.push(idx)
          idx = curConnected.indexOf(1, idx + 1)
      }
      for (let i = 0; i < neighborIdx.length; i++) {
          if (nodesLen[neighborIdx[i]] === Infinity) {
              nodesLen[neighborIdx[i]] = nodesLen[current] + 1
              queue.push(neighborIdx[i])
          }
      }
  }
  return nodesLen
}