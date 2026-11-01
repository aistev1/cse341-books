// import { writeFileSync } from 'node:fs';
// import swaggerJsdoc from 'swagger-jsdoc';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Books API',
//       version: '1.0.0',
//       description: 'A simple API for working with books'
//     },
//     servers: [
//       {
//         url: '/',
//         description: 'Current server'
//       }
//     ]
//   },
//   apis: ['./src/router.js', './app.js']
// };

// const swaggerSpec = swaggerJsdoc(options);

// writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
// console.log('Swagger documentation generated.');



import { writeFileSync } from "node:fs";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books and Authors API",
      version: "2.0.0",
      description: "API for managing books and authors",
    },
    servers: [
      {
        url: "/",
        description: "Current server",
      },
    ],
  },
  apis: [
    "./src/router.js",
    "./src/routes/*.js",
    "./app.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

writeFileSync(
  "./swagger.json",
  JSON.stringify(swaggerSpec, null, 2)
);

console.log("Swagger documentation generated.");
