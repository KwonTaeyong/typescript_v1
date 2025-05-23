function solution(points, routes) {
    const pointMap = new Map();
    points.forEach(([r, c], i) => {
        pointMap.set(i + 1, [r, c]);
    });

    const robotPaths = [];

    for (const route of routes) {
        const path = [];
        for (let i = 0; i < route.length - 1; i++) {
            const start = pointMap.get(route[i]);
            const end = pointMap.get(route[i + 1]);
            let [sr, sc] = start;
            let [er, ec] = end;

            // 경로 기록
            while (sr !== er) {
                path.push([sr, sc]);
                sr += sr < er ? 1 : -1;
            }
            while (sc !== ec) {
                path.push([sr, sc]);
                sc += sc < ec ? 1 : -1;
            }
        }
        // 마지막 도착지 좌표 기록
        path.push(pointMap.get(route[route.length - 1]));
        robotPaths.push(path);
    }

    const timeMap = new Map(); // key: time, value: Map of position count

    let maxTime = 0;
    robotPaths.forEach((path, idx) => {
        path.forEach(([r, c], t) => {
            const key = t;
            const pos = `${r},${c}`;
            if (!timeMap.has(key)) timeMap.set(key, new Map());
            const map = timeMap.get(key);
            map.set(pos, (map.get(pos) || 0) + 1);
            maxTime = Math.max(maxTime, t);
        });
    });

    let dangerCount = 0;
    for (let t = 0; t <= maxTime; t++) {
        const map = timeMap.get(t);
        if (!map) continue;
        for (const count of map.values()) {
            if (count >= 2) dangerCount++;
        }
    }

    return dangerCount;
}
