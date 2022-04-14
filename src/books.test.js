import BooksPresenter from "./Books/BooksPresenter";
import booksRepository from "./Books/BooksRepository";
import httpGateway from "./Shared/HttpGateway";
import Observable from "./Shared/Observable";

let viewModel;
let booksPresenter;
let booksStub;
let allBooksStub;

beforeEach(async () => {
  viewModel = null;
  booksPresenter = new BooksPresenter();
  booksRepository.programmersModel = new Observable([]);

  booksStub = {
    success: true,
    result: [
      {
        bookId: 140431,
        name: "Wind in the willows",
        ownerId: "olakara@gmail.com",
        author: "Kenneth Graeme"
      },
      {
        bookId: 140441,
        name: "I, Robot",
        ownerId: "olakara@gmail.com",
        author: "Isaac Asimov"
      },
      {
        bookId: 140451,
        name: "The Hobbit",
        ownerId: "olakara@gmail.com",
        author: "Jrr Tolkein"
      }
    ]
  };

  allBooksStub = {
    success: true,
    result: [
      {
        bookId: 31,
        name: "Moby Dick",
        ownerId: null,
        author: "Herman Melville"
      },
      { bookId: 41, name: "The Art of War", ownerId: null, author: "Sun Tzu" },
      {
        bookId: 140431,
        name: "Wind in the willows",
        ownerId: "olakara@gmail.com",
        author: "Kenneth Graeme"
      },
      {
        bookId: 140441,
        name: "I, Robot",
        ownerId: "olakara@gmail.com",
        author: "Isaac Asimov"
      },
      {
        bookId: 140451,
        name: "The Hobbit",
        ownerId: "olakara@gmail.com",
        author: "Jrr Tolkein"
      }
    ]
  };

  httpGateway.get = jest.fn().mockImplementation((path) => {
    if (path === "https://api.logicroom.co/api/olakara@gmail.com/allbooks")
      return allBooksStub;
    else if (path === "https://api.logicroom.co/api/olakara@gmail.com/books")
      return booksStub;
  });
});

let setup = async (userModeArg) => {
  booksPresenter.setMode(userModeArg);
  await booksPresenter.load((generatedViewModel) => {
    viewModel = generatedViewModel;
  });
};

it("should load private books", async () => {
  await setup("private");
  expect(httpGateway.get).toHaveBeenCalledWith(
    "https://api.logicroom.co/api/olakara@gmail.com/books"
  );

  expect(viewModel.length).toBe(3);
  expect(viewModel[0].name).toBe("Wind in the willows");
  expect(viewModel[1].name).toBe("I, Robot");
  expect(viewModel[2].name).toBe("The Hobbit");
});

it("should load public books", async () => {
  await setup("public");
  expect(httpGateway.get).toHaveBeenCalledWith(
    "https://api.logicroom.co/api/olakara@gmail.com/allbooks"
  );

  expect(viewModel.length).toBe(5);
  expect(viewModel[0].name).toBe("Moby Dick");
  expect(viewModel[1].name).toBe("The Art of War");
  expect(viewModel[2].name).toBe("Wind in the willows");
  expect(viewModel[3].name).toBe("I, Robot");
  expect(viewModel[4].name).toBe("The Hobbit");
});
