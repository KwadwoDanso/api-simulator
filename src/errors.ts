// This file defines custom error classes so we can tell the difference
// between a network problem and a data problem when something fails.

// NetworkError use this when the "network" fails (lik server down, timeout)
export class NetworkError extends Error {
    constructor(message: string) {
        super(message); // Pass the message up to the built-in Error class
        this.name = "NetworkError"; // Label it so we know what kind of error it is
    }
}

// DataError — use this when the data itself is the problem (missing fields, bad ID, etc.)
export class DataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataError";
    }
}
