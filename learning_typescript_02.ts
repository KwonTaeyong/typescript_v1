def solution(scores):
    wanho = scores[0]
    
    # 근무 태도 내림차순, 동료 평가 오름차순 정렬
    scores.sort(key=lambda x: (-x[0], x[1]))
    
    max_b = 0
    filtered = []
    
    # 인센티브 받을 수 있는 사람만 필터링 (두 점수 모두 더 낮은 사람 제거)
    for score in scores:
        a, b = score
        if b >= max_b:
            filtered.append(score)
            max_b = max(max_b, b)

    # 완호가 인센티브 대상인지 확인
    if wanho not in filtered:
        return -1

    # 점수 합 기준으로 석차 계산 (동석차 반영)
    filtered.sort(key=lambda x: -(x[0] + x[1]))
    
    rank = 1
    prev_sum = -1
    skip = 0
    
    for s in filtered:
        total = s[0] + s[1]
        if total != prev_sum:
            rank += skip
            skip = 1
            prev_sum = total
        else:
            skip += 1

        if s == wanho:
            return rank

    return -1
