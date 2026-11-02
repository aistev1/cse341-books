// import { getAllBooks, getBookById, } from "../models/books.js";

// const getBooksHandler = async (req, res) => {
//   try {
//     const books = await getAllBooks();

//     return res.status(200).json(books);
//   } catch (error) {
//     console.error("Failed to retrieve books:", error.message);

//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// const getBookByIdHandler = async (req, res) => {
//   try {
//     const bookId = req.params.id;

//     const book = await getBookById(bookId);

//     if (!book) {
//       return res.status(404).json({
//         message: "Book not found",
//       });
//     }

//     return res.status(200).json(book);
//   } catch (error) {
//     console.error("Failed to retrieve book:", error.message);

//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// export { getBooksHandler, getBookByIdHandler };



import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists,
} from "../models/books.js";

const isValidDate = (value) => {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
};

const isValidBook = (authorId, title, publicationDate) => {
  return (
    typeof authorId === "string" &&
    authorId.trim().length > 0 &&
    typeof title === "string" &&
    title.trim().length > 0 &&
    isValidDate(publicationDate)
  );
};

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);
  } catch (error) {
    console.error("Failed to retrieve books:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getBookByIdHandler = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error("Failed to retrieve book:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createBookHandler = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body ?? {};

    if (
      typeof id !== "string" ||
      !id.trim() ||
      !isValidBook(authorId, title, publicationDate)
    ) {
      return res.status(400).json({
        message: "Valid id, authorId, title, and publicationDate are required",
      });
    }

    const bookId = id.trim();

    const existingBook = await getBookById(bookId);

    if (existingBook) {
      return res.status(400).json({
        message: "A book with this ID already exists",
      });
    }

    const validAuthor = await authorExists(authorId.trim());

    if (!validAuthor) {
      return res.status(400).json({
        message: "The specified author does not exist",
      });
    }

    const book = {
      id: bookId,
      authorId: authorId.trim(),
      title: title.trim(),
      publicationDate,
    };

    const createdBook = await createBook(book);

    return res.status(201).json(createdBook);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A book with this ID already exists",
      });
    }

    console.error("Failed to create book:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const { authorId, title, publicationDate } = req.body ?? {};

    if (
      Object.hasOwn(req.body ?? {}, "id") ||
      !isValidBook(authorId, title, publicationDate)
    ) {
      return res.status(400).json({
        message: "Valid authorId, title, and publicationDate are required. Do not include id.",
      });
    }

    const existingBook = await getBookById(req.params.id);

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const validAuthor = await authorExists(authorId.trim());

    if (!validAuthor) {
      return res.status(400).json({
        message: "The specified author does not exist",
      });
    }

    const updatedBook = await updateBook(
      req.params.id,
      {
        authorId: authorId.trim(),
        title: title.trim(),
        publicationDate,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Failed to update book:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteBookHandler = async (req, res) => {
  try {
    const deleted = await deleteBook(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Failed to delete book:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
};
