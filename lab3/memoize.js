function memoize(fn, { maxSize = Infinity, ttl = null, strategy = 'lru', evict = null } = {}) {
  const cache = new Map();

  function evictOne() {
    if (evict) return evict(cache);

    if (strategy === 'lfu') {
      const minKey = [...cache.entries()].reduce((a, b) =>
        b[1].hits < a[1].hits ? b : a
      )[0];
      cache.delete(minKey);
    } else {
      cache.delete(cache.keys().next().value); 
    }
  }

  return function (...args) {
    const key = JSON.stringify(args);
    const entry = cache.get(key);

    if (entry) {
      if (ttl && Date.now() - entry.time >= ttl) {
        cache.delete(key);
      } else {
        entry.hits++;
        if (strategy === 'lru') { cache.delete(key); cache.set(key, entry); } 
        return entry.value;
      }
    }

    if (cache.size >= maxSize) evictOne();

    const value = fn(...args);
    cache.set(key, { value, time: Date.now(), hits: 1 });
    return value;
  };
}