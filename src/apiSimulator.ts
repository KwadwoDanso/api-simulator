// This file simulates three fake API calls using Promises.
// Each function pretends to go to a server, waits a bit, then either
// succeeds with mock data or fails randomly

import { NetworkError, DataError } from "./errors";

// Function 1: Fetch the product catalog 
// Waits 1 second, then returns a list of products.

export const fetchProductCatalog = (): Promise<
    { id: number; name: string; price: number }[]
> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 80% chance of success
            if (Math.random() < 0.8) {
                resolve([
                    { id: 1, name: "Laptop", price: 1200 },
                    { id: 2, name: "Headphones", price: 200 },
                    { id: 3, name: "Keyboard", price: 100 },
                ]);
            } else {
               
                reject(new NetworkError("Failed to fetch product catalog"));
            }
        }, 1000);
    });
};

// Function 2: Fetch reviews for a specific product 
// Takes a productId, waits 1.5 seconds, then returns that product's reviews.
// If the productId doesn't match any data, throws a DataError.
export const fetchProductReviews = (
    productId: number
): Promise<{ reviewer: string; rating: number; comment: string }[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                // Mock review data keyed by product ID
                const reviewsByProduct: Record<
                    number,
                    { reviewer: string; rating: number; comment: string }[]
                > = {
                    1: [
                        { reviewer: "Alice", rating: 5, comment: "Great laptop!" },
                        { reviewer: "Bob", rating: 4, comment: "Good value for the price." },
                    ],
                    2: [
                        { reviewer: "Charlie", rating: 3, comment: "Decent sound quality." },
                    ],
                    3: [
                        { reviewer: "Dana", rating: 5, comment: "Love the mechanical keys." },
                        { reviewer: "Eve", rating: 4, comment: "Solid build." },
                    ],
                };

                const reviews = reviewsByProduct[productId];

                // If we found reviews for this product, return them
                if (reviews) {
                    resolve(reviews);
                } else {
                    // Product ID doesn't exist in our mock data that's a data problem
                    reject(new DataError(`No reviews found for product ID ${productId}`));
                }
            } else {
                // Random network failure
                reject(
                    new NetworkError(
                        `Failed to fetch reviews for product ID ${productId}`
                    )
                );
            }
        }, 1500);
    });
};

// Function 3: Fetch the sales report 
// Waits 1 second, then returns a summary of sales numbers.
export const fetchSalesReport = (): Promise<{
    totalSales: number;
    unitsSold: number;
    averagePrice: number;
}> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                resolve({
                    totalSales: 45000,
                    unitsSold: 120,
                    averagePrice: 375,
                });
            } else {
                reject(new NetworkError("Failed to fetch sales report"));
            }
        }, 1000);
    });
};