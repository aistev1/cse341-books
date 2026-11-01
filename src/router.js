import express from "express";
import authorsRouter from "./routes/authors.js";
import { getBooksHandler, getBookByIdHandler } from "./controllers/books.js";

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Books retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "67123456789abcdef0123456"
 *                   title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get("/books", getBooksHandler);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve a single book using its ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve.
 *         schema:
 *           type: string
 *         example: "67123456789abcdef0123456"
 *     responses:
 *       200:
 *         description: Book retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67123456789abcdef0123456"
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *       400:
 *         description: Invalid book ID.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */

router.get("/books/:id", getBookByIdHandler);
router.use(authorsRouter);

export default router;
