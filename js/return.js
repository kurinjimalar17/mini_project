let returnForm = document.getElementById("returnForm");
let issuedBook = document.getElementById("issuedBook");
let message = document.getElementById("message");

function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function getIssues() {
    return JSON.parse(localStorage.getItem("issues")) || [];
}

function loadIssuedBooks() {
    let issues = getIssues();

    issuedBook.innerHTML = '<option value="">Select an issued book</option>';

    issues.forEach(function(issue, index) {
        if (!issue.returned) {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = issue.memberName + " - " + issue.bookName;
            issuedBook.appendChild(option);
        }
    });

    showSelectedDetails();
}

function showSelectedDetails() {
    let index = issuedBook.value;
    let issues = getIssues();

    if (index === "" || !issues[index]) {
        document.getElementById("memberName").textContent = "-";
        document.getElementById("bookName").textContent = "-";
        document.getElementById("issueDate").textContent = "-";
        document.getElementById("dueDate").textContent = "-";
        return;
    }

    let issue = issues[index];

    document.getElementById("memberName").textContent = issue.memberName;
    document.getElementById("bookName").textContent = issue.bookName;
    document.getElementById("issueDate").textContent = issue.issueDate;
    document.getElementById("dueDate").textContent = issue.returnDate;
}

function displayReturnHistory() {
    let issues = getIssues();
    let returnTable = document.getElementById("returnTable");

    returnTable.innerHTML = "";

    if (issues.length === 0) {
        returnTable.innerHTML = '<tr><td colspan="5">No issue records found.</td></tr>';
        return;
    }

    issues.forEach(function(issue) {
        let row = document.createElement("tr");
        let status = issue.returned ? "Returned" : "Issued";
        let date = issue.actualReturnDate || issue.returnDate;

        row.innerHTML = `
            <td>${issue.memberName}</td>
            <td>${issue.bookName}</td>
            <td>${issue.issueDate}</td>
            <td>${date}</td>
            <td class="${issue.returned ? "status-returned" : "status-issued"}">${status}</td>
        `;

        returnTable.appendChild(row);
    });
}

issuedBook.addEventListener("change", showSelectedDetails);

returnForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let index = issuedBook.value;
    let issues = getIssues();
    let books = getBooks();

    if (index === "" || !issues[index]) {
        message.textContent = "Please select an issued book.";
        message.style.color = "red";
        return;
    }

    let issue = issues[index];

    if (issue.returned) {
        message.textContent = "This book has already been returned.";
        message.style.color = "red";
        return;
    }

    let book = books.find(function(item) {
        return String(item.bookId) === String(issue.bookId);
    });

    if (!book) {
        message.textContent = "Book record not found.";
        message.style.color = "red";
        return;
    }

    book.quantity = Number(book.quantity) + 1;
    issue.returned = true;
    issue.actualReturnDate = new Date().toISOString().split("T")[0];

    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("issues", JSON.stringify(issues));

    message.textContent = "Book returned successfully!";
    message.style.color = "green";

    loadIssuedBooks();
    displayReturnHistory();
});

loadIssuedBooks();
displayReturnHistory();
