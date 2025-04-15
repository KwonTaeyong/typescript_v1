function solution(tickets) {
  const route = [];
  const graph = {};

  // 1. 그래프 만들기
  for (const [from, to] of tickets) {
      if (!graph[from]) graph[from] = [];
      graph[from].push(to);
  }

  // 2. 도착지를 알파벳 순으로 정렬
  for (const from in graph) {
      graph[from].sort();
  }

  // 3. DFS 함수 정의
  function dfs(curr, path) {
      if (path.length === tickets.length + 1) {
          route.push(...path); // 정답 경로 저장
          return true; // 종료
      }

      if (!graph[curr]) return false;

      const nextList = graph[curr];

      for (let i = 0; i < nextList.length; i++) {
          const next = nextList[i];
          graph[curr].splice(i, 1); // 해당 티켓 사용
          if (dfs(next, [...path, next])) return true; // 성공 시 종료
          graph[curr].splice(i, 0, next); // 백트래킹: 티켓 되돌리기
      }

      return false;
  }

  dfs("ICN", ["ICN"]);

  return route;
}
