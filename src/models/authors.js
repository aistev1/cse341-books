
import { getDb } from "../db/connect.js";

const getAllAuthors = async () => {
  return await getDb()
    .collection("authors")
    .find({}, { projection: { _id: 0 } })
    .toArray();
};

const getAuthorById = async (authorId) => {
  return await getDb()
    .collection("authors")
    .findOne(
      { id: authorId },
      { projection: { _id: 0 } }
    );
};

const createAuthor = async (author) => {
  await getDb()
    .collection("authors")
    .insertOne(author);

  return await getAuthorById(author.id);
};

const updateAuthor = async (authorId, authorData) => {
  const result = await getDb()
    .collection("authors")
    .updateOne(
      { id: authorId },
      { $set: authorData }
    );

  if (result.matchedCount === 0) {
    return null;
  }

  return await getAuthorById(authorId);
};

const deleteAuthor = async (authorId) => {
  const result = await getDb()
    .collection("authors")
    .deleteOne({ id: authorId });

  return result.deletedCount > 0;
};

const authorHasBooks = async (authorId) => {
  const book = await getDb()
    .collection("books")
    .findOne(
      { authorId },
      { projection: { _id: 1 } }
    );

  return Boolean(book);
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks,
};
