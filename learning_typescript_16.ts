function solution(visible, hidden, k) {
    const n = visible.length;
    const m = visible[0].length;
    const totalMasks = 1 << (n + m); // n행 + m열 뒤집기 여부를 비트마스크로 표현

    let maxScore = -Infinity;

    for (let mask = 0; mask < totalMasks; mask++) {
        const flipRow = Array(n).fill(false);
        const flipCol = Array(m).fill(false);

        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) flipRow[i] = true;
        }
        for (let j = 0; j < m; j++) {
            if ((mask >> (n + j)) & 1) flipCol[j] = true;
        }

        const board = Array.from({ length: n }, (_, i) =>
            Array.from({ length: m }, (_, j) => {
                const flipped = flipRow[i] ^ flipCol[j];
                return flipped ? hidden[i][j] : visible[i][j];
            })
        );

        // BFS로 (0,0) ~ (n-1,m-1)까지 방문한 점수의 최대값 계산
        const queue = [[0, 0, board[0][0], 1 << (0 * m + 0)]]; // [i, j, sum, visited_bitmask]
        const visited = new Map();
        const key = (i, j, mask) => `${i},${j},${mask}`;
        visited.set(key(0, 0, 1 << (0 * m + 0)), board[0][0]);

        let localMax = 0;
        while (queue.length) {
            const [x, y, sum, vis] = queue.shift();
            if (x === n - 1 && y === m - 1) {
                localMax = Math.max(localMax, sum);
                continue;
            }
            for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
                const idx = nx * m + ny;
                if ((vis >> idx) & 1) continue;
                const newMask = vis | (1 << idx);
                const newSum = sum + board[nx][ny];
                const newKey = key(nx, ny, newMask);
                if (!visited.has(newKey) || visited.get(newKey) < newSum) {
                    visited.set(newKey, newSum);
                    queue.push([nx, ny, newSum, newMask]);
                }
            }
        }

        // 뒤집은 횟수 계산
        const flipCost = (flipRow.filter(b => b).length + flipCol.filter(b => b).length) * k;
        maxScore = Math.max(maxScore, localMax - flipCost);
    }

    return maxScore;
}
