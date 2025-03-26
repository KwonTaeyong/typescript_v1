function solution(a) {
  const n = a.length;
  const leftMin = Array(n).fill(0);
  const rightMin = Array(n).fill(0);

  // 왼쪽 최소값 누적
  let minLeft = a[0];
  leftMin[0] = a[0];
  for (let i = 1; i < n; i++) {
      minLeft = Math.min(minLeft, a[i]);
      leftMin[i] = minLeft;
  }

  // 오른쪽 최소값 누적
  let minRight = a[n - 1];
  rightMin[n - 1] = a[n - 1];
  for (let i = n - 2; i >= 0; i--) {
      minRight = Math.min(minRight, a[i]);
      rightMin[i] = minRight;
  }

  let answer = 0;
  for (let i = 0; i < n; i++) {
      // 본인이 양쪽에서 하나라도 최소값이면 살아남을 수 있음
      if (a[i] <= leftMin[i] || a[i] <= rightMin[i]) {
          answer++;
      }
  }

  return answer;
}
