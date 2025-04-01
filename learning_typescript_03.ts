function solution(k, n, reqs) {
  // 상담유형별 요청을 나눕니다.
  const grouped = Array.from({ length: k }, () => []);
  for (let [start, duration, type] of reqs) {
      grouped[type - 1].push([start, duration]);
  }

  // 가능한 모든 멘토 배분 조합 생성
  const distributions = [];
  const backtrack = (arr, total) => {
      if (arr.length === k) {
          if (total === n) distributions.push([...arr]);
          return;
      }
      for (let i = 1; i <= n - total - (k - arr.length - 1); i++) {
          arr.push(i);
          backtrack(arr, total + i);
          arr.pop();
      }
  };
  backtrack([], 0);

  let minWait = Infinity;

  for (let dist of distributions) {
      let totalWait = 0;

      for (let i = 0; i < k; i++) {
          const mentors = dist[i];
          const queue = grouped[i].slice();
          const heap = []; // 멘토들의 상담 종료 시간

          for (let [start, duration] of queue) {
              // 사용 가능한 멘토가 있는지 확인
              heap.sort((a, b) => a - b); // 종료시간 오름차순

              // 종료된 상담 제거
              while (heap.length > 0 && heap.length >= mentors && heap[0] <= start) {
                  heap.shift();
              }

              if (heap.length < mentors) {
                  // 멘토 즉시 배정
                  heap.push(start + duration);
              } else {
                  // 가장 빨리 끝나는 멘토 기다림
                  const earliest = heap.shift();
                  totalWait += earliest - start;
                  heap.push(earliest + duration);
              }
          }
      }

      minWait = Math.min(minWait, totalWait);
  }

  return minWait;
}
