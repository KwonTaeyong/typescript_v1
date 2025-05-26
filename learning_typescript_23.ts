function solution(storage, requests) {
    const n = storage.length;
    const m = storage[0].length;

    const grid = storage.map(row => row.split(''));

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    const isValid = (x, y) => x >= 0 && x < n && y >= 0 && y < m;

    const forklift = (char) => {
        const visited = Array.from({ length: n }, () => Array(m).fill(false));
        const queue = [];

        // 외곽에서 시작해서 접근 가능한 컨테이너만 제거
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                const isEdge = (i === 0 || i === n - 1 || j === 0 || j === m - 1);
                if (isEdge && grid[i][j] === char && !visited[i][j]) {
                    queue.push([i, j]);
                    visited[i][j] = true;
                }
            }
        }

        while (queue.length > 0) {
            const [x, y] = queue.shift();
            if (grid[x][y] === char) {
                grid[x][y] = ".";  // 제거
            }

            for (let dir = 0; dir < 4; dir++) {
                const nx = x + dx[dir];
                const ny = y + dy[dir];
                if (isValid(nx, ny) && !visited[nx][ny] && grid[nx][ny] === char) {
                    queue.push([nx, ny]);
                    visited[nx][ny] = true;
                }
            }
        }
    };

    const crane = (char) => {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (grid[i][j] === char) {
                    grid[i][j] = ".";
                }
            }
        }
    };

    for (let req of requests) {
        if (req.length === 1) {
            forklift(req[0]);
        } else if (req.length === 2 && req[0] === req[1]) {
            crane(req[0]);
        }
    }

    // 남은 컨테이너 세기
    let answer = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] !== ".") answer++;
        }
    }

    return answer;
}
