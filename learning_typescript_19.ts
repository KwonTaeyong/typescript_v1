function solution(dice) {
    const n = dice.length;
    const half = n / 2;
    let maxWinCount = -1;
    let bestCombination = [];

    const combinations = getCombinations([...Array(n).keys()], half);

    for (const combA of combinations) {
        const combB = [...Array(n).keys()].filter(i => !combA.includes(i));

        const sumA = getAllSums(combA.map(i => dice[i]));
        const sumB = getAllSums(combB.map(i => dice[i]));

        let win = 0;
        let i = 0, j = 0;
        sumA.sort((a, b) => a - b);
        sumB.sort((a, b) => a - b);

        for (const a of sumA) {
            while (j < sumB.length && sumB[j] < a) j++;
            win += j;
        }

        if (win > maxWinCount) {
            maxWinCount = win;
            bestCombination = combA;
        }
    }

    return bestCombination.map(i => i + 1).sort((a, b) => a - b);

    // 조합 구하기
    function getCombinations(arr, k) {
        const result = [];
        const backtrack = (start, path) => {
            if (path.length === k) {
                result.push([...path]);
                return;
            }
            for (let i = start; i < arr.length; i++) {
                path.push(arr[i]);
                backtrack(i + 1, path);
                path.pop();
            }
        };
        backtrack(0, []);
        return result;
    }

    // 선택한 주사위들로 만들 수 있는 합의 모든 경우
    function getAllSums(diceList) {
        let result = [0];
        for (const die of diceList) {
            const temp = [];
            for (const r of result) {
                for (const face of die) {
                    temp.push(r + face);
                }
            }
            result = temp;
        }
        return result;
    }
}