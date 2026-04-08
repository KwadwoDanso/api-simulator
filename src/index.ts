// This is the main entry point — the e-commerce dashboard.
// It fetches data in three steps, chained together with Promises:
// Get the product catalog
// For each product, get its reviews
// Get the sales report
// Each step uses retryPromise so failures get retried up to 3 times.

import {
    fetchProductCatalog,
    fetchProductReviews,
    fetchSalesReport,
} from "./apiSimulator";
import { retryPromise } from "./retryPromise";

// Print a header
console.log(" E-Commerce Dashboard \n");
console.log("Fetching product catalog...\n");

//Fetch the product catalog (retry up to 3 times, 500ms between)
retryPromise(fetchProductCatalog, 3, 500)
    .then((products) => {
        // Catalog came back — print each product
        console.log("--- Product Catalog ---");
        for (const product of products) {
            console.log(`  ID: ${product.id} | ${product.name} | $${product.price}`);
        }
        console.log("");

        //Fetch reviews for each product 
        // We create one Promise per product, all running at the same time
        const reviewPromises = products.map((product) =>
            retryPromise(() => fetchProductReviews(product.id), 3, 500)
                .then((reviews) => {
                    // Reviews came back for this product — print them
                    console.log(`--- Reviews for ${product.name} ---`);
                    for (const review of reviews) {
                        console.log(
                            `  ${review.reviewer} (${review.rating}/5): "${review.comment}"`
                        );
                    }
                    console.log("");
                })
                .catch((error) => {
                    // This product's reviews failed even after retries.
                    // We catch it HERE so one bad eview fetch doesn't kill the whole chain.
                    console.log(
                        `  Error fetching reviews for ${product.name}: ${error.message}`
                    );
                    console.log("");
                })
        );

        // Wait for ALL review fetches to finish before moving to Step 3
        return Promise.all(reviewPromises);
    })

    //Fetch the sales report 
    .then(() => {
        console.log("Fetching sales report...\n");
        return retryPromise(fetchSalesReport, 3, 500);
    })
    .then((report) => {
        // Sales report came back — print it
        console.log("--- Sales Report ---");
        console.log(`  Total Sales:   $${report.totalSales}`);
        console.log(`  Units Sold:    ${report.unitsSold}`);
        console.log(`  Average Price: $${report.averagePrice}`);
        console.log("");
    })

    //If the catalog or sales report fails after all retries 
    .catch((error) => {
        console.log(`\nCritical error: ${error.message}`);
    })

    //Always runs, whether everything succeeded or something failed 
    .finally(() => {
        console.log("----");
        console.log("All API calls have been attempted.");
    });