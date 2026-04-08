// This file provides a retry utility for Promises.
// If an async function fails, it will wait and try again
// up to a set number of times before giving up.
// How it works:
//   1. Call fn()
//   2. If it succeeds — great, return the result
//   3. If it fails and retries > 0 — wait, then call retryPromise again with retries - 1
//   4. If it fails and retries = 0 — give up and pass the error along

export function retryPromise<T>(
    fn: () => Promise<T>,
    retries: number,
    delay: number
): Promise<T> {
    return fn().catch((error) => {
        // No retries left — stop trying and reject with the error
        if (retries <= 0) {
            return Promise.reject(error);
        }

        console.log(`  Retrying... attempts left: ${retries}`);

        // Wait for the delay, then try again 
        return new Promise<T>((resolve) => {
            setTimeout(() => {
                resolve(retryPromise(fn, retries - 1, delay));
            }, delay);
        });
    });
}