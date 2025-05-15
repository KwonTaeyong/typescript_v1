function solution(expressions) {
    const known = [];
    const unknown = [];

    // 수식을 파싱하고 known/unknown 분리
    for (const exp of expressions) {
        const [a, op, b, , c] = exp.split(" ");
        if (c === "X") {
            unknown.push([a, op, b]);
        } else {
            known.push([a, op, b, c]);
        }
    }

    // 진법 후보 찾기: 2~9
    const validBases = [];
    for (let base = 2; base <= 9; base++) {
        let valid = true;
        for (const [a, op, b, c] of known) {
            try {
                const A = parseInt(a, base);
                const B = parseInt(b, base);
                const C = parseInt(c, base);
                if ([a, b, c].some(v => v.split('').some(ch => parseInt(ch) >= base))) {
                    valid = false;
                    break;
                }
                const result = op === '+' ? A + B : A - B;
                if (result !== C) {
                    valid = false;
                    break;
                }
            } catch {
                valid = false;
                break;
            }
        }
        if (valid) validBases.push(base);
    }

    const result = [];
    for (const [a, op, b] of unknown) {
        const possible = new Set();
        for (const base of validBases) {
            try {
                if ([a, b].some(v => v.split('').some(ch => parseInt(ch) >= base))) continue;
                const A = parseInt(a, base);
                const B = parseInt(b, base);
                const value = op === '+' ? A + B : A - B;
                const converted = value.toString(base);
                if (converted.split('').some(ch => parseInt(ch) >= base)) continue;
                possible.add(converted);
            } catch {
                continue;
            }
        }
        if (possible.size === 1) {
            result.push(`${a} ${op} ${b} = ${[...possible][0]}`);
        } else {
            result.push(`${a} ${op} ${b} = ?`);
        }
    }

    return result;
}