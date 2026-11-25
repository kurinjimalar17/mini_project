// BOOK MANAGEMENT

let bookForm = document.getElementById("bookForm");
let bookTableBody = document.getElementById("bookTableBody");
let addBookSection = document.getElementById("addBookSection");
let showAddBook = document.getElementById("showAddBook");
let cancelButton = document.getElementById("cancelButton");
let successMessage = document.getElementById("successMessage");
let searchInput = document.getElementById("searchInput");
let formTitle = document.getElementById("formTitle");
let formSubtitle = document.getElementById("formSubtitle");
let saveButton = document.getElementById("saveButton");

let editIndex = -1;

// GET BOOKS
function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

// SHOW ADD BOOK FORM
showAddBook.addEventListener("click", function () {
    editIndex = -1;
    bookForm.reset();

    formTitle.textContent = "➕ Add New Book";
    formSubtitle.textContent = "Enter the details of the new book";
    saveButton.textContent = "Save Book";

    clearErrors();

    addBookSection.style.display = "block";
    addBookSection.scrollIntoView({ behavior: "smooth" });
});

// CANCEL
cancelButton.addEventListener("click", function () {
    bookForm.reset();
    editIndex = -1;
    clearErrors();
    addBookSection.style.display = "none";
});

// DISPLAY BOOKS
function displayBooks(bookList) {
    bookTableBody.innerHTML = "";

    if (bookList.length === 0) {
        bookTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No books found
                </td>
            </tr>
        `;
        return;
    }

    bookList.forEach(function (book, index) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.bookId}</td>
            <td>${book.bookName}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.quantity}</td>
            <td>
                <a href="${book.bookUrl}" target="_blank">
                    🔗 Open Book
                </a>
            </td>
            <td>
                <button class="view-button"
                    onclick="viewBook('${book.bookId}')">
                    View
                </button>

                <button class="edit-button"
                    onclick="editBook(${index})">
                    Edit
                </button>

                <button class="delete-button"
                    onclick="deleteBook(${index})">
                    Delete
                </button>
            </td>
        `;

        bookTableBody.appendChild(row);
    });
}

// ADD / EDIT BOOK
bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let bookId = document.getElementById("bookId").value.trim();
    let bookName = document.getElementById("bookName").value.trim();
    let author = document.getElementById("author").value.trim();
    let category = document.getElementById("category").value.trim();
    let publisher = document.getElementById("publisher").value.trim();
    let year = document.getElementById("year").value.trim();
    let quantity = document.getElementById("quantity").value.trim();
    let bookUrl = document.getElementById("bookUrl").value.trim();

    if (bookId === "") {
        showError("bookIdError", "Please enter Book ID");
        return;
    }

    if (bookName === "") {
        showError("bookNameError", "Please enter Book Name");
        return;
    }

    if (quantity === "" || Number(quantity) <= 0) {
        showError("quantityError", "Quantity must be greater than 0");
        return;
    }

    if (bookUrl === "") {
        showError("bookUrlError", "Please enter Book URL");
        return;
    }

    if (!/^https?:\/\/.+/.test(bookUrl)) {
        showError("bookUrlError", "Enter a valid URL");
        return;
    }

    let books = getBooks();

    let duplicateBook = books.some(function (book, index) {
        return book.bookId === bookId && index !== editIndex;
    });

    if (duplicateBook) {
        showError("bookIdError", "Book ID already exists");
        return;
    }

    let book = {
        bookId: bookId,
        bookName: bookName,
        author: author,
        category: category,
        publisher: publisher,
        year: year,
        quantity: Number(quantity),
        bookUrl: bookUrl
    };

    if (editIndex !== -1) {
        books[editIndex] = book;
        successMessage.textContent = "✓ Book updated successfully";
    } else {
        books.push(book);
        successMessage.textContent = "✓ Book added successfully";
    }

    localStorage.setItem("books", JSON.stringify(books));

    successMessage.style.color = "green";
    displayBooks(books);

    bookForm.reset();
    editIndex = -1;

    setTimeout(function () {
        addBookSection.style.display = "none";
        successMessage.textContent = "";
    }, 1500);
});

// EDIT BOOK
function editBook(index) {
    let books = getBooks();
    let book = books[index];

    editIndex = index;

    document.getElementById("bookId").value = book.bookId;
    document.getElementById("bookName").value = book.bookName;
    document.getElementById("author").value = book.author;
    document.getElementById("category").value = book.category;
    document.getElementById("publisher").value = book.publisher;
    document.getElementById("year").value = book.year;
    document.getElementById("quantity").value = book.quantity;
    document.getElementById("bookUrl").value = book.bookUrl || "";

    formTitle.textContent = "✏️ Edit Book";
    formSubtitle.textContent = "Update the book details";
    saveButton.textContent = "Update Book";

    addBookSection.style.display = "block";
    addBookSection.scrollIntoView({ behavior: "smooth" });
}

// DELETE BOOK
function deleteBook(index) {
    let books = getBooks();

    let confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
        return;
    }

    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));

    displayBooks(books);
}

// VIEW BOOK
function viewBook(bookId) {
    let books = getBooks();

    let book = books.find(function(item) {
        return item.bookId === bookId;
    });

    if (!book) {
        alert("Book not found!");
        return;
    }

    document.getElementById("viewBookId").textContent = book.bookId;
    document.getElementById("viewBookName").textContent = book.bookName;
    document.getElementById("viewAuthor").textContent = book.author;
    document.getElementById("viewCategory").textContent = book.category;
    document.getElementById("viewPublisher").textContent = book.publisher;
    document.getElementById("viewYear").textContent = book.year;
    document.getElementById("viewQuantity").textContent = book.quantity;

    document.getElementById("viewBookSection").classList.add("show");
}
// CLOSE VIEW
let closeViewBook = document.getElementById("closeViewBook");

if (closeViewBook) {
    closeViewBook.addEventListener("click", function () {
        document.getElementById("viewBookSection")
            .classList.remove("show");
    });
}

// SEARCH
searchInput.addEventListener("input", function () {
    let searchText = searchInput.value.toLowerCase();
    let books = getBooks();

    let filteredBooks = books.filter(function (book) {
        return (
            book.bookName.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText) ||
            book.category.toLowerCase().includes(searchText)
        );
    });

    displayBooks(filteredBooks);
});

// SHOW ERROR
function showError(id, message) {
    let error = document.getElementById(id);

    if (error) {
        error.textContent = message;
        error.classList.add("show");
    }
}

// CLEAR ERRORS
function clearErrors() {
    let errors = document.querySelectorAll(".error");

    errors.forEach(function (error) {
        error.textContent = "";
        error.classList.remove("show");
    });
}

// LOAD BOOKS
displayBooks(getBooks());