// import express from "express";
// import { getBooksHandler } from "../controllers/books.js";

// const router = express.Router();

// router.get("/books", getBooksHandler);

// export default router;



import express from "express";

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from "../controllers/books.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - id
 *         - authorId
 *         - title
 *         - publicationDate
 *       properties:
 *         id:
 *           type: string
 *           example: b1
 *         authorId:
 *           type: string
 *           example: a1
 *         title:
 *           type: string
 *           example: Pride and Prejudice
 *         publicationDate:
 *           type: string
 *           format: date
 *           example: "1813-01-28"
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */
router.get("/books", getBooksHandler);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by custom ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get("/books/:id", getBookByIdHandler);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             id: b1
 *             authorId: a1
 *             title: Pride and Prejudice
 *             publicationDate: "1813-01-28"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input, duplicate ID, or invalid author reference
 *       500:
 *         description: Internal server error
 */
router.post("/books", createBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: b1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Updated Book Title
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-02-20"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid input or author reference
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.put("/books/:id", updateBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete("/books/:id", deleteBookHandler);

export default router;
