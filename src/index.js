import React, { useState } from "react";
import ReactDOM from "react-dom";
import BooksPresenter from "./Books/BooksPresenter.js";

import "./styles.css";

function App() {
  const booksPresenter = new BooksPresenter();
  const [stateViewModel, copyViewModelToStateViewModel] = useState([]);

  React.useEffect(() => {
    async function load() {
      booksPresenter.setMode("public");
      await booksPresenter.load((viewModel) => {
        copyViewModelToStateViewModel(viewModel);
      });
    }
    load();
  }, []);

  return (
    <>
      <h3>Books</h3>

      <button
        type="button"
        onClick={() => {
          booksPresenter.setMode("public");
        }}
      >
        Public
      </button>
      <button
        type="button"
        onClick={() => {
          booksPresenter.setMode("private");
        }}
      >
        Private
      </button>
      <br />
      <button
        type="button"
        onClick={async () => {
          await booksPresenter.sortAscending((viewModel) => {
            copyViewModelToStateViewModel(viewModel);
          });
        }}
      >
        Sort on Name - ASC
      </button>
      <button
        type="button"
        onClick={async () => {
          await booksPresenter.sortDecending((viewModel) => {
            copyViewModelToStateViewModel(viewModel);
          });
        }}
      >
        Sort on Name - DESC
      </button>
      <br />

      <div>
        {stateViewModel.map((book, i) => {
          return <div key={i}>{book.name}</div>;
        })}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
