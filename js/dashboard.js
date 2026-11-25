const links = document.querySelectorAll(".nav-menu a");

const cards = document.querySelector(".cards");

const title = document.getElementById("pageTitle");
const description = document.getElementById("pageDescription");
const content = document.getElementById("contentArea");

function updateDashboard() {

    // Get data from Local Storage
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let members = JSON.parse(localStorage.getItem("members")) || [];
    let issues = JSON.parse(localStorage.getItem("issues")) || [];

    // Calculate Total Books
    let totalBooks = books.reduce(function(total, book) {
        return total + Number(book.quantity);
    }, 0);

    // Calculate Total Members
    let totalMembers = members.length;

    // Calculate Issued Books
    let issuedBooks = issues.filter(function(issue) {
        return issue.returned === false;
    }).length;

    // Calculate Returned Books
    let returnedBooks = issues.filter(function(issue) {
        return issue.returned === true;
    }).length;

    // Display values in Dashboard
    document.getElementById("totalBooks").textContent = totalBooks;

    document.getElementById("totalMembers").textContent = totalMembers;

    document.getElementById("issuedBooks").textContent = issuedBooks;

    document.getElementById("returnedBooks").textContent = returnedBooks;
}

// Call function when page loads
updateDashboard();



// TOTAL BOOKS

function updateTotalBooks() {

    let books = JSON.parse(localStorage.getItem("books")) || [];

    let totalBooks = 0;

    books.forEach(function (book) {

        totalBooks = totalBooks + Number(book.quantity);

    });

    let totalBooksElement = document.getElementById("totalBooks");

    if (totalBooksElement) {

        totalBooksElement.textContent = totalBooks;

    }
}


// Dashboard open update
updateTotalBooks();


// Page refresh / page open aagumbothu update
window.addEventListener("pageshow", function () {

    updateTotalBooks();

});


// Vera tab/page-la localStorage change aana update
window.addEventListener("storage", function (event) {

    if (event.key === "books") {

        updateTotalBooks();

    }

});


function displayLowStockBooks() {

    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Books with quantity below 5
    let lowStockBooks = books.filter(function(book) {
        return Number(book.quantity) < 5;
    });

    document.getElementById("lowStockCount").textContent =
        lowStockBooks.length;

    let table = document.getElementById("lowStockTable");

    table.innerHTML = "";

    if (lowStockBooks.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4" class="no-stock-alert">
                    All books have sufficient stock.
                </td>
            </tr>
        `;

    } else {

        lowStockBooks.forEach(function(book) {

            table.innerHTML += `
                <tr>
                    <td>${book.bookName}</td>
                    <td>${book.author}</td>
                    <td>${book.quantity}</td>
                    <td class="low-stock">⚠️ Low Stock Alert</td>
                </tr>
            `;

        });

    }
}

displayLowStockBooks();


// Call function when dashboard loads
displayLowStockBooks();
