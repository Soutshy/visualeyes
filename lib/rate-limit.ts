/**
 * Simple in-memory rate limiter
 * Note: This resets when the server restarts
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
    /** Maximum requests allowed in the window */
    limit: number;
    /** Time window in seconds */
    windowSeconds: number;
}

interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetIn: number; // seconds until reset
}

/**
 * Check if a request is rate limited
 * @param identifier - Unique identifier (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = { limit: 10, windowSeconds: 60 }
): RateLimitResult {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    // Clean up expired entries periodically
    if (rateLimitStore.size > 1000) {
        cleanupExpiredEntries();
    }

    // No existing entry or entry has expired
    if (!entry || now >= entry.resetTime) {
        const newEntry: RateLimitEntry = {
            count: 1,
            resetTime: now + config.windowSeconds * 1000
        };
        rateLimitStore.set(identifier, newEntry);

        return {
            success: true,
            remaining: config.limit - 1,
            resetIn: config.windowSeconds
        };
    }

    // Entry exists and hasn't expired
    entry.count += 1;
    const remaining = Math.max(0, config.limit - entry.count);
    const resetIn = Math.ceil((entry.resetTime - now) / 1000);

    if (entry.count > config.limit) {
        return {
            success: false,
            remaining: 0,
            resetIn
        };
    }

    return {
        success: true,
        remaining,
        resetIn
    };
}

/**
 * Clean up expired entries to prevent memory leaks
 */
function cleanupExpiredEntries(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now >= entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
    // Check common proxy headers
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Fallback for local development
    return 'localhost';
}
