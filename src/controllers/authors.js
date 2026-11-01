
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks,
} from "../models/authors.js";

const isValidAuthor = (name, birthYear) => {
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    typeof birthYear === "number" &&
    Number.isInteger(birthYear) &&
    birthYear > 0 &&
    birthYear <= new Date().getFullYear()
  );
};

const getAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();

    return res.status(200).json(authors);
  } catch (error) {
    console.error("Failed to retrieve authors:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAuthorByIdHandler = async (req, res) => {
  try {
    const author = await getAuthorById(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error("Failed to retrieve author:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createAuthorHandler = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body ?? {};

    if (
      typeof id !== "string" ||
      !id.trim() ||
      !isValidAuthor(name, birthYear)
    ) {
      return res.status(400).json({
        message: "Valid id, name, and birthYear are required",
      });
    }

    const author = {
      id: id.trim(),
      name: name.trim(),
      birthYear,
    };

    const existingAuthor = await getAuthorById(author.id);

    if (existingAuthor) {
      return res.status(400).json({
        message: "An author with this ID already exists",
      });
    }

    const createdAuthor = await createAuthor(author);

    return res.status(201).json(createdAuthor);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "An author with this ID already exists",
      });
    }

    console.error("Failed to create author:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateAuthorHandler = async (req, res) => {
  try {
    const { name, birthYear } = req.body ?? {};

    if (
      Object.hasOwn(req.body ?? {}, "id") ||
      !isValidAuthor(name, birthYear)
    ) {
      return res.status(400).json({
        message: "Valid name and birthYear are required. Do not include id.",
      });
    }

    const existingAuthor = await getAuthorById(req.params.id);

    if (!existingAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const updatedAuthor = await updateAuthor(
      req.params.id,
      {
        name: name.trim(),
        birthYear,
      }
    );

    if (!updatedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    return res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error("Failed to update author:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteAuthorHandler = async (req, res) => {
  try {
    const authorId = req.params.id;

    const existingAuthor = await getAuthorById(authorId);

    if (!existingAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const hasBooks = await authorHasBooks(authorId);

    if (hasBooks) {
      return res.status(409).json({
        message: "Cannot delete author because books still reference this author",
      });
    }

    const deleted = await deleteAuthor(authorId);

    if (!deleted) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Failed to delete author:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
};
