function solution(operations) {
  const queue = [];

  for (const op of operations) {
      const [command, value] = op.split(' ');

      if (command === 'I') {
          queue.push(Number(value));
      } else if (command === 'D') {
          if (queue.length === 0) continue;

          queue.sort((a, b) => a - b);  // 오름차순 정렬

          if (value === '1') {
              queue.pop();  // 최대값 삭제
          } else {
              queue.shift();  // 최소값 삭제
          }
      }
  }

  if (queue.length === 0) return [0, 0];

  queue.sort((a, b) => a - b);  // 최종 정렬
  return [queue[queue.length - 1], queue[0]];
}
