function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function getMembers() {
    return JSON.parse(localStorage.getItem("members")) || [];
}

function getIssues() {
    return JSON.parse(localStorage.getItem("issues")) || [];
}

function displayReports() {
    let books = getBooks();
    let members = getMembers();
    let issues = getIssues();

    let totalBooks = 0;

    books.forEach(function(book) {
        totalBooks += Number(book.quantity) || 0;
    });

    let issuedCount = issues.filter(function(issue) {
        return !issue.returned;
    }).length;

    let returnedCount = issues.filter(function(issue) {
        return issue.returned;
    }).length;

    document.getElementById("totalBooks").textContent = totalBooks;
    document.getElementById("totalMembers").textContent = members.length;
    document.getElementById("issuedBooks").textContent = issuedCount;
    document.getElementById("returnedBooks").textContent = returnedCount;

    let bookReport = document.getElementById("bookReport");
    bookReport.innerHTML = "";

    if (books.length === 0) {
        bookReport.innerHTML = '<tr><td colspan="5">No books available.</td></tr>';
    } else {
        books.forEach(function(book) {
            let row = document.createElement("tr");

            [book.bookId, book.bookName, book.author, book.category, book.quantity].forEach(function(value) {
                let cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });

            bookReport.appendChild(row);
        });
    }

    let issueReport = document.getElementById("issueReport");
    issueReport.innerHTML = "";

    if (issues.length === 0) {
        issueReport.innerHTML = '<tr><td colspan="5">No issue records available.</td></tr>';
    } else {
        issues.forEach(function(issue) {
            let row = document.createElement("tr");
            let status = issue.returned ? "Returned" : "Issued";

            [
                issue.memberName,
                issue.bookName,
                issue.issueDate,
                issue.actualReturnDate || issue.returnDate,
                status
            ].forEach(function(value, index) {
                let cell = document.createElement("td");
                cell.textContent = value ?? "";

                if (index === 4) {
                    cell.className = issue.returned ? "status-returned" : "status-issued";
                }

                row.appendChild(cell);
            });

            issueReport.appendChild(row);
        });
    }
}

displayReports();
window.addEventListener("storage", displayReports);