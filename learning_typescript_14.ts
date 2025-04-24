function solution(nodes, edges) {
  const graph = new Map();
  for (const node of nodes) graph.set(node, []);
  for (const [a, b] of edges) {
      graph.get(a).push(b);
      graph.get(b).push(a);
  }

  const visited = new Set();
  let hol = 0, rev = 0;

  function buildTree(root) {
      const tree = new Map();
      const parent = new Map();
      const stack = [root];
      parent.set(root, null);
      while (stack.length) {
          const node = stack.pop();
          tree.set(node, []);
          for (const nei of graph.get(node)) {
              if (!parent.has(nei)) {
                  parent.set(nei, node);
                  tree.get(node).push(nei);
                  stack.push(nei);
              }
          }
      }
      return tree;
  }

  function isValid(tree, root, reverse = false) {
      let valid = true;
      function dfs(node) {
          let count = 0;
          for (const child of tree.get(node)) {
              count += dfs(child);
          }
          const isEven = count % 2 === 0;
          const isNodeEven = node % 2 === 0;
          if (!reverse) {
              if (!(isEven === isNodeEven)) valid = false;
          } else {
              if (isEven === isNodeEven) valid = false;
          }
          return 1;
      }
      dfs(root);
      return valid;
  }

  function getComponent(start) {
      const q = [start];
      const comp = [];
      visited.add(start);
      while (q.length) {
          const node = q.shift();
          comp.push(node);
          for (const nei of graph.get(node)) {
              if (!visited.has(nei)) {
                  visited.add(nei);
                  q.push(nei);
              }
          }
      }
      return comp;
  }

  for (const node of nodes) {
      if (!visited.has(node)) {
          const comp = getComponent(node);
          let ok_hol = false, ok_rev = false;
          for (const root of comp) {
              const tree = buildTree(root);
              if (!ok_hol && isValid(tree, root, false)) ok_hol = true;
              if (!ok_rev && isValid(tree, root, true)) ok_rev = true;
              if (ok_hol && ok_rev) break;
          }
          if (ok_hol) hol++;
          if (ok_rev) rev++;
      }
  }

  return [hol, rev];
}
