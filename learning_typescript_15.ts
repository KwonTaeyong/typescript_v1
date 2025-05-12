function solution(n, bans) {
    // 모든 사전순 문자열의 누적 개수 계산용
    const pow26 = Array(12).fill(0);
    pow26[0] = 1;
    for (let i = 1; i <= 11; i++) pow26[i] = pow26[i - 1] * 26n;

    // 누적합으로 각 길이의 총 문자열 수 구함
    const totalStringsByLength = Array(12).fill(0n);
    for (let i = 1; i <= 11; i++) {
        totalStringsByLength[i] = totalStringsByLength[i - 1] + pow26[i];
    }

    // 문자열을 순서대로 몇 번째인지 구하는 함수
    function getOrder(str) {
        let order = 0n;
        for (let i = 1; i < str.length; i++) {
            order += pow26[i];
        }
        for (let i = 0; i < str.length; i++) {
            const ch = str[i];
            const diff = BigInt(ch.charCodeAt(0) - 'a'.charCodeAt(0));
            order += diff * pow26[str.length - i - 1];
        }
        return order;
    }

    // 삭제된 주문 정렬
    const bannedOrders = bans.map(str => getOrder(str)).sort((a, b) => (a < b ? -1 : 1));

    // 실제 n번째 주문을 찾기 위한 이진탐색
    let left = 0n;
    let right = totalStringsByLength[11] + 1000n; // 넉넉히

    while (left < right) {
        const mid = (left + right) / 2n;

        // mid 이하에서 제거된 주문 수 세기
        const removed = bannedOrders.filter(v => v <= mid).length;
        const validCount = mid - BigInt(removed);

        if (validCount < BigInt(n)) {
            left = mid + 1n;
        } else {
            right = mid;
        }
    }

    // left가 우리가 찾는 주문의 실제 순서
    let idx = left;
    // 이제 idx를 문자열로 바꾸기
    function getStringFromOrder(order) {
        for (let len = 1; len <= 11; len++) {
            if (order < pow26[len]) {
                let str = '';
                for (let i = 0; i < len; i++) {
                    const div = pow26[len - i - 1];
                    const ch = String.fromCharCode(Number(order / div) + 97);
                    str += ch;
                    order %= div;
                }
                return str;
            }
            order -= pow26[len];
        }
        return '';
    }

    return getStringFromOrder(idx);
}