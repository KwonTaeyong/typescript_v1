function solution(n, roads) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of roads) {
      graph[a].push(b);
  }

  // Tarjan’s SCC
  let index = 0, stack = [], indices = Array(n + 1).fill(-1), lowlink = Array(n + 1).fill(0);
  let onStack = Array(n + 1).fill(false);
  let sccCount = 0;
  const nodeToSCC = Array(n + 1).fill(-1);

  function strongConnect(v) {
      indices[v] = lowlink[v] = index++;
      stack.push(v);
      onStack[v] = true;

      for (const w of graph[v]) {
          if (indices[w] === -1) {
              strongConnect(w);
              lowlink[v] = Math.min(lowlink[v], lowlink[w]);
          } else if (onStack[w]) {
              lowlink[v] = Math.min(lowlink[v], indices[w]);
          }
      }

      if (lowlink[v] === indices[v]) {
          let w;
          while ((w = stack.pop()) !== undefined) {
              onStack[w] = false;
              nodeToSCC[w] = sccCount;
              if (w === v) break;
          }
          sccCount++;
      }
  }

  for (let v = 1; v <= n; v++) {
      if (indices[v] === -1) {
          strongConnect(v);
      }
  }

  // 축약 그래프의 진입 차수 계산
  const sccInDegree = Array(sccCount).fill(0);
  const sccGraph = new Set();
  for (let u = 1; u <= n; u++) {
      for (const v of graph[u]) {
          const su = nodeToSCC[u], sv = nodeToSCC[v];
          if (su !== sv && !sccGraph.has(`${su}->${sv}`)) {
              sccGraph.add(`${su}->${sv}`);
              sccInDegree[sv]++;
          }
      }
  }

  // 진입차수 0인 SCC 개수 - 1
  let result = 0;
  for (let i = 0; i < sccCount; i++) {
      if (sccInDegree[i] === 0) {
          if (i === nodeToSCC[1]) continue; // 1번이 포함된 SCC는 출발 가능
          result++;
      }
  }

  return result;
}
