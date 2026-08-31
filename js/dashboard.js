const links = document.querySelectorAll(".nav-menu a");
const cards = document.querySelector(".cards");

const title = document.getElementById("pageTitle");
const description = document.getElementById("pageDescription");
const content = document.getElementById("contentArea");


links.forEach(function(link) {

    link.addEventListener("click", function(event) {

        if (link.textContent.trim() === "Logout") {
            return;
        }

        event.preventDefault();
        

        let page = link.getAttribute("data-page");
        if (page === "Dashboard") {
    cards.style.display = "grid";
} else {
    cards.style.display = "none";
}


        // Dashboard
        if (page === "Dashboard") {

            title.textContent = "Dashboard";

            description.textContent =
                "Welcome to Digital Library Management System";

            content.innerHTML = `
                <h2>📊 Library Overview</h2>
                <p>Welcome to your library dashboard.</p>
                <p>Total Books: 500</p>
                <p>Total Members: 120</p>
                <p>Issued Books: 75</p>
            `;
        }


        // Books
        else if (page === "Books") {

            title.textContent = "Books";

            description.textContent =
                "Manage library books";

            content.innerHTML = `
                <h2>📚 Books Management</h2>
                <p>Here you can manage all library books.</p>

                <ul>
                    <li>JavaScript Basics</li>
                    <li>HTML and CSS</li>
                    <li>Python Programming</li>
                    <li>Database Management</li>
                </ul>
            `;
        }


        // Members
        else if (page === "Members") {

            title.textContent = "Members";

            description.textContent =
                "Manage library members";

            content.innerHTML = `
                <h2>👥 Members</h2>
                <p>Registered library members:</p>

                <ul>
                    <li>Malar</li>
                    <li>Priya</li>
                    <li>Kavya</li>
                </ul>
            `;
        }


        // Issue Book
        else if (page === "Issue Book") {

            title.textContent = "Issue Book";

            description.textContent =
                "Issue books to members";

            content.innerHTML = `
                <h2>📖 Issue Book</h2>

                <p>Select a member and issue a book.</p>

                <label>Member Name</label>
                <select>
                    <option>Select Member</option>
                    <option>Malar</option>
                    <option>Priya</option>
                </select>

                <br><br>

                <label>Book Name</label>
                <select>
                    <option>Select Book</option>
                    <option>JavaScript Basics</option>
                    <option>HTML and CSS</option>
                </select>

                <br><br>

                <button>Issue Book</button>
            `;
        }


        // Return Book
        else if (page === "Return Book") {

            title.textContent = "Return Book";

            description.textContent =
                "Return books to the library";

            content.innerHTML = `
                <h2>↩️ Return Book</h2>

                <p>Manage returned books.</p>

                <label>Member Name</label>
                <select>
                    <option>Select Member</option>
                    <option>Malar</option>
                    <option>Priya</option>
                </select>

                <br><br>

                <label>Book Name</label>
                <select>
                    <option>Select Book</option>
                    <option>JavaScript Basics</option>
                    <option>HTML and CSS</option>
                </select>

                <br><br>

                <button>Return Book</button>
            `;
        }


        // Reports
        else if (page === "Reports") {

            title.textContent = "Reports";

            description.textContent =
                "View library reports";

            content.innerHTML = `
                <h2>📊 Library Reports</h2>

                <p>Total Books: 500</p>
                <p>Total Members: 120</p>
                <p>Issued Books: 75</p>
                <p>Returned Books: 425</p>

                <h3>Recent Activity</h3>

                <p>JavaScript Basics - Issued to Malar</p>
                <p>HTML and CSS - Returned by Priya</p>
            `;
        }


        // About
        else if (page === "About") {

            title.textContent = "About";

            description.textContent =
                "About Digital Library Management System";

            content.innerHTML = `
                <h2>📚 About DLM</h2>

                <p>
                    Digital Library Management System
                    helps manage books and members easily.
                </p>

                <h3>Features</h3>

                <ul>
                    <li>Manage Books</li>
                    <li>Manage Members</li>
                    <li>Issue Books</li>
                    <li>Return Books</li>
                    <li>View Reports</li>
                </ul>

                <h3>Technologies</h3>

                <p>HTML, CSS and JavaScript</p>
            `;
        }

    });

});