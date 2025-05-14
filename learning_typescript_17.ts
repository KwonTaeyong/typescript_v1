function solution(n, q, ans) {
    // 1~n에서 5개 선택하는 모든 조합 생성
    const combinations = [];
    function backtrack(start, path) {
        if (path.length === 5) {
            combinations.push([...path]);
            return;
        }
        for (let i = start; i <= n; i++) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    backtrack(1, []);

    let count = 0;

    for (const comb of combinations) {
        let valid = true;
        for (let i = 0; i < q.length; i++) {
            const query = q[i];
            const expected = ans[i];
            const intersection = query.filter(x => comb.includes(x));
            if (intersection.length !== expected) {
                valid = false;
                break;
            }
        }
        if (valid) count++;
    }

    return count;
}