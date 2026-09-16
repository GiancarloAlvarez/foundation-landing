// In-memory sliding-window rate limiter. Sufficient for a single-instance
// deployment (this app's actual deployment shape); would need a shared store
// (e.g. Redis) behind a multi-instance/serverless deployment where each
// instance has its own memory.
const buckets = new Map<string, number[]>();

// Prevent unbounded memory growth from distinct keys (e.g. many attacker IPs).
const MAX_TRACKED_KEYS = 5000;

export function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  let hits = buckets.get(key);
  if (hits) {
    hits = hits.filter((t) => t > windowStart);
  } else {
    hits = [];
    if (buckets.size >= MAX_TRACKED_KEYS) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey !== undefined) buckets.delete(oldestKey);
    }
  }

  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { allowed: false, retryAfterMs: hits[0] + windowMs - now };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { allowed: true, retryAfterMs: 0 };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}
