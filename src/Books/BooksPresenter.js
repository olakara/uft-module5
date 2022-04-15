import booksRepository from "./BooksRepository.js";

export default class BooksPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name, author: bookPm.author };
      });
      callback(booksVm);
    });
  };

  setMode = async (mode) => {
    booksRepository.mode = mode === "public" ? "allbooks" : "books";
    await booksRepository.loadApiData();
  };

  sortAscending = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm
        .map((bookPm) => {
          return { name: bookPm.name, author: bookPm.author };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      callback(booksVm);
    });
  };

  sortDecending = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm
        .map((bookPm) => {
          return { name: bookPm.name, author: bookPm.author };
        })
        .sort((a, b) => b.name.localeCompare(a.name));
      callback(booksVm);
    });
  };
}
