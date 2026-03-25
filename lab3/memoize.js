function memoize(fn, { maxSize = Infinity } = {}) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) return cache.get(key);

    if (cache.size >= maxSize) {
      cache.delete(cache.keys().next().value);
    }

    const value = fn(...args);
    cache.set(key, value);
    return value;
  };
}