function solution(n, roads, sources, destination) {
  // 1. 인접 리스트 만들기
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of roads) {
      graph[a].push(b);
      graph[b].push(a);
  }

  // 2. 거리 배열 초기화 (-1은 도달 불가)
  const distance = Array(n + 1).fill(-1);
  const queue = [destination];
  distance[destination] = 0;

  // 3. BFS로 최단 거리 계산
  while (queue.length > 0) {
      const current = queue.shift();
      for (const next of graph[current]) {
          if (distance[next] === -1) {
              distance[next] = distance[current] + 1;
              queue.push(next);
          }
      }
  }

  // 4. sources에 대해 결과 계산
  const answer = sources.map(source => distance[source]);

  return answer;
}
