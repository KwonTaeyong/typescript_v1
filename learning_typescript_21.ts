function solution(n, roads) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [a, b] of roads) {
        graph[a].push(b);
    }

    let id = 0;
    const ids = Array(n + 1).fill(0);
    const low = Array(n + 1).fill(0);
    const onStack = Array(n + 1).fill(false);
    const stack = [];
    let sccCount = 0;
    const sccId = Array(n + 1).fill(0);
    const sccIndegree = new Map();

    function dfs(at) {
        id++;
        ids[at] = low[at] = id;
        stack.push(at);
        onStack[at] = true;

        for (const to of graph[at]) {
            if (ids[to] === 0) {
                dfs(to);
                low[at] = Math.min(low[at], low[to]);
            } else if (onStack[to]) {
                low[at] = Math.min(low[at], ids[to]);
            }
        }

        if (ids[at] === low[at]) {
            sccCount++;
            while (true) {
                const node = stack.pop();
                onStack[node] = false;
                sccId[node] = sccCount;
                if (node === at) break;
            }
        }
    }

    // Step 1. Tarjan's algorithm
    for (let i = 1; i <= n; i++) {
        if (ids[i] === 0) dfs(i);
    }

    // Step 2. Build SCC DAG and count indegrees
    const dag = Array.from({ length: sccCount + 1 }, () => new Set());

    for (let from = 1; from <= n; from++) {
        for (const to of graph[from]) {
            const sccFrom = sccId[from];
            const sccTo = sccId[to];
            if (sccFrom !== sccTo && !dag[sccFrom].has(sccTo)) {
                dag[sccFrom].add(sccTo);
                sccIndegree.set(sccTo, (sccIndegree.get(sccTo) || 0) + 1);
            }
        }
    }

    // Step 3. Count SCCs with indegree 0
    let zeroIndegreeCount = 0;
    for (let i = 1; i <= sccCount; i++) {
        if (!sccIndegree.has(i)) zeroIndegreeCount++;
    }

    return zeroIndegreeCount - 1;
}
