function solution(n, money) {
  const dp = Array(n + 1).fill(0);
  const MOD = 1000000007;

  dp[0] = 1; // 0원을 만드는 방법은 1가지

  for (let coin of money) {
      for (let i = coin; i <= n; i++) {
          dp[i] = (dp[i] + dp[i - coin]) % MOD;
      }
  }

  return dp[n];
}
