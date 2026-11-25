let issueForm = document.getElementById("issueForm");
let memberSelect = document.getElementById("memberName");
let bookSelect = document.getElementById("bookName");
let issueTable = document.getElementById("issueTable");
let message = document.getElementById("message");

function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function getMembers() {
    return JSON.parse(localStorage.getItem("members")) || [];
}

function getIssues() {
    return JSON.parse(localStorage.getItem("issues")) || [];
}

function loadMembers() {
    let members = getMembers();

    members.forEach(function(member) {
        let option = document.createElement("option");
        option.value = member.memberId;
        option.textContent = member.memberName;
        memberSelect.appendChild(option);
    });
}

function loadBooks() {
    let books = getBooks();

    books.forEach(function(book) {
        let option = document.createElement("option");
        option.value = book.bookId;
        option.textContent = book.bookName + " (Available: " + book.quantity + ")";
        bookSelect.appendChild(option);
    });
}

function displayIssues() {
    let issues = getIssues();
    issueTable.innerHTML = "";

    issues.forEach(function(issue) {
        let row = document.createElement("tr");

        let memberCell = document.createElement("td");
        memberCell.textContent = issue.memberName;

        let bookCell = document.createElement("td");
        bookCell.textContent = issue.bookName;

        let issueDateCell = document.createElement("td");
        issueDateCell.textContent = issue.issueDate;

        let returnDateCell = document.createElement("td");
        returnDateCell.textContent = issue.returnDate;

        row.append(memberCell, bookCell, issueDateCell, returnDateCell);
        issueTable.appendChild(row);
    });
}

issueForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let memberId = memberSelect.value;
    let bookId = bookSelect.value;
    let issueDate = document.getElementById("issueDate").value;
    let returnDate = document.getElementById("returnDate").value;

    let members = getMembers();
    let books = getBooks();

    let member = members.find(function(item) {
        return String(item.memberId) === memberId;
    });

    let book = books.find(function(item) {
        return String(item.bookId) === bookId;
    });

    if (!member) {
        message.textContent = "Please select a valid member.";
        message.style.color = "red";
        return;
    }

    if (!book) {
        message.textContent = "Please select a valid book.";
        message.style.color = "red";
        return;
    }

    if (Number(book.quantity) <= 0) {
        message.textContent = "This book is not available.";
        message.style.color = "red";
        return;
    }

    if (!issueDate || !returnDate || returnDate < issueDate) {
        message.textContent = "Please select valid issue and return dates.";
        message.style.color = "red";
        return;
    }

    let issues = getIssues();

    let issue = {
        memberId: member.memberId,
        memberName: member.memberName,
        bookId: book.bookId,
        bookName: book.bookName,
        issueDate: issueDate,
        returnDate: returnDate
    };

    book.quantity = Number(book.quantity) - 1;

    issues.push(issue);

    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("issues", JSON.stringify(issues));

    message.textContent = "Book issued successfully!";
    message.style.color = "green";

    issueForm.reset();
    loadBookOptions();
    displayIssues();
});

function loadBookOptions() {
    bookSelect.innerHTML = '<option value="">Select Book</option>';
    loadBooks();
}

loadMembers();
loadBookOptions();
displayIssues();

document.getElementById("issueDate").value =
    new Date().toISOString().split("T")[0];
