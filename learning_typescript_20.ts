function solution(maze) {
  const n = maze.length;
  const m = maze[0].length;

  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0], [0, 0] // 마지막은 '멈춤' 동작
  ];

  let redStart, blueStart, redGoal, blueGoal;

  // 위치 찾기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maze[i][j] === 1) redStart = [i, j];
      if (maze[i][j] === 2) blueStart = [i, j];
      if (maze[i][j] === 3) redGoal = [i, j];
      if (maze[i][j] === 4) blueGoal = [i, j];
    }
  }

  const visited = new Set();
  const queue = [{
    red: redStart,
    blue: blueStart,
    redVisited: new Set([redStart.join(",")]),
    blueVisited: new Set([blueStart.join(",")]),
    turns: 0,
  }];

  function isValid(x, y, visitedSet) {
    return x >= 0 && x < n && y >= 0 && y < m &&
      maze[x][y] !== 5 && !visitedSet.has(`${x},${y}`);
  }

  while (queue.length) {
    const { red, blue, redVisited, blueVisited, turns } = queue.shift();
    const [rx, ry] = red;
    const [bx, by] = blue;

    // 둘 다 도착
    if (rx === redGoal[0] && ry === redGoal[1] &&
        bx === blueGoal[0] && by === blueGoal[1]) {
      return turns;
    }

    for (const [drx, dry] of directions) {
      for (const [dbx, dby] of directions) {
        let nrx = rx, nry = ry;
        let nbx = bx, nby = by;

        const redAtGoal = rx === redGoal[0] && ry === redGoal[1];
        const blueAtGoal = bx === blueGoal[0] && by === blueGoal[1];

        // 도착하면 움직이지 않음
        if (!redAtGoal) {
          const tx = rx + drx, ty = ry + dry;
          if (isValid(tx, ty, redVisited)) {
            nrx = tx;
            nry = ty;
          } else continue;
        }

        if (!blueAtGoal) {
          const tx = bx + dbx, ty = by + dby;
          if (isValid(tx, ty, blueVisited)) {
            nbx = tx;
            nby = ty;
          } else continue;
        }

        // 충돌 금지
        if (nrx === nbx && nry === nby) continue;

        // 자리 바꾸기 금지
        if (nrx === bx && nry === by && nbx === rx && nby === ry) continue;

        const redKey = `${nrx},${nry}`;
        const blueKey = `${nbx},${nby}`;
        const stateKey = `${redKey}|${blueKey}`;

        if (visited.has(stateKey)) continue;
        visited.add(stateKey);

        const nextRedVisited = new Set(redVisited);
        const nextBlueVisited = new Set(blueVisited);
        nextRedVisited.add(redKey);
        nextBlueVisited.add(blueKey);

        queue.push({
          red: [nrx, nry],
          blue: [nbx, nby],
          redVisited: nextRedVisited,
          blueVisited: nextBlueVisited,
          turns: turns + 1,
        });
      }
    }
  }

  return 0; // 불가능한 경우
}
