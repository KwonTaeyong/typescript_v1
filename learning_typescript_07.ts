function solution(user_id, banned_id) {
  const bannedCandidates = banned_id.map(pattern => {
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.') + '$');
      return user_id.filter(user => regex.test(user));
  });

  const resultSet = new Set();

  function dfs(index, path) {
      if (index === banned_id.length) {
          const sortedPath = [...path].sort().join(',');
          resultSet.add(sortedPath);
          return;
      }

      for (const candidate of bannedCandidates[index]) {
          if (!path.has(candidate)) {
              path.add(candidate);
              dfs(index + 1, path);
              path.delete(candidate);
          }
      }
  }

  dfs(0, new Set());

  return resultSet.size;
}
