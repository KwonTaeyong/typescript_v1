type Request = [number, number, number]; // [시각, 상담 시간, 상담 유형]

function distributeMentors(k: number, n: number): number[][] {
    const result: number[][] = [];
    
    function backtrack(assigned: number[], remaining: number) {
        if (assigned.length === k) {
            if (remaining === 0) result.push([...assigned]);
            return;
        }

        for (let i = 1; i <= remaining; i++) {
            assigned.push(i);
            backtrack(assigned, remaining - i);
            assigned.pop();
        }
    }

    backtrack([], n);
    return result;
}

function calculateWaitTime(mentorDistribution: number[], k: number, reqs: Request[]): number {
    let waitTime = 0;
    const queues: { endTime: number }[][] = Array.from({ length: k }, () => []);

    for (const [requestTime, duration, type] of reqs) {
        const typeIndex = type - 1;
        let mentors = mentorDistribution[typeIndex];
        let queue = queues[typeIndex];

        // 기존 큐에서 상담이 끝난 멘토 제거
        queue = queue.filter(mentor => mentor.endTime > requestTime);
        
        if (queue.length < mentors) {
            queue.push({ endTime: requestTime + duration });
        } else {
            queue.sort((a, b) => a.endTime - b.endTime);
            const firstAvailable = queue.shift()!;
            waitTime += firstAvailable.endTime - requestTime;
            queue.push({ endTime: firstAvailable.endTime + duration });
        }
        
        queues[typeIndex] = queue;
    }

    return waitTime;
}

function solution(k: number, n: number, reqs: Request[]): number {
    let minWaitTime = Infinity;
    const distributions = distributeMentors(k, n);

    for (const mentorDist of distributions) {
        const waitTime = calculateWaitTime(mentorDist, k, reqs);
        minWaitTime = Math.min(minWaitTime, waitTime);
    }

    return minWaitTime;
}

// 예제 테스트 실행
console.log(solution(3, 5, [
    [10, 60, 1], [15, 100, 3], [20, 30, 1], [30, 50, 3], 
    [50, 40, 1], [60, 30, 2], [65, 30, 1], [70, 100, 2]
])); // 예상 결과: 25
