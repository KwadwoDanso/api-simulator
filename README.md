# api-simulator
A small application that leverages asynchronous API calls using Promises. It implements error handling to ensure that the application can manage unexpected issues gracefully. It test asynchronous programming concepts, as well as to manage errors effectively in a real-world scenario.

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview
- Apply Promises to manage multiple asynchronous operations in JavaScript.
- Implement chained Promises to handle sequential data retrieval and manage dependencies between API calls.
- Utilize .catch() and .finally() to handle errors and perform cleanup tasks in a Promise chain.
- Design custom error classes to improve error identification and debugging.
- Implement a retry mechanism to manage failed asynchronous requests, enhancing application resilience.
- Analyze the benefits and challenges of using error handling strategies in complex asynchronous workflows.


## Reflections/Critical Thinking

- Why is it important to handle errors for each individual API call rather than just at the end of the promise chain?
    --  If we only had the top-level catch, one bad review fetch would skip the entire rest of the chain — no other reviews, no sales report. 

- How does using custom error classes improve debugging and error identification?
    -- With NetworkError and DataError, you know where the problem is. Network error means the server/connection is the issue — maybe try again. Data eror means the data itself is bad — retrying won't help, you need to fix the data. 

- When might a retry mechanism be more effective than an immediate failure response?
    -- When the problem is temporary. Network interruptions, server overload, a brief timeout — these fix themselves in seconds. The retryPromise waits 500ms and tries again.




### Links

- Solution URL:(https://github.com/KwadwoDanso/api-simulator.git)


## My process
- Created project folder, npm init -y, installed TypeScript
- Built errors.ts — two custom error classes extending Error
- Built apiSimulator.ts — three functions returning Promises with setTimeout and random failure
- Built retryPromise.ts — one recursive function that retries on failure with a delay
- Built index.ts — chained .then() calls fetching catalog → reviews → report, with .catch() per call and .finally() at the end
- Compiled with npx tsc, ran with node dist/index.js
### Built with

-Javascript
-Typescript


### What I learned
- TypeScript type annotations, interfaces, and object-oriented programming concepts.
-  .catch() per call prevents one failure from killing the whole chain.
- Custom error classes let you distinguish what kind of thing went wrong
- Promises manage async operations without callback hell


## Author
-Author is Kwadwo 

## Acknowledgments


- MDN Web Docs
- w3schools
- Per Scholas JS lessons
- https://www.typescriptlang.org/docs/

