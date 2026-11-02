import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
  return await getDb()
    .collection("books")
    .find({})
    .toArray();
};

const getBookById = async (bookId) => {
  return await getDb()
    .collection("books")
    .findOne({ id: bookId });
};

const createBook = async (book) => {
  await getDb()
    .collection("books")
    .insertOne(book);

  return await getBookById(book.id);
};

const updateBook = async (bookId, bookData) => {
  const result = await getDb()
    .collection("books")
    .updateOne(
      { id: bookId },
      { $set: bookData }
    );

  if (result.matchedCount === 0) {
    return null;
  }

  return await getBookById(bookId);
};

const deleteBook = async (bookId) => {
  const result = await getDb()
    .collection("books")
    .deleteOne({ id: bookId });

  return result.deletedCount > 0;
};

const authorExists = async (authorId) => {
  const author = await getDb()
    .collection("authors")
    .findOne(
      { id: authorId },
      { projection: { _id: 1 } }
    );

  return Boolean(author);
};
export { getAllBooks, getBookById, createBook, updateBook, deleteBook, authorExists };
