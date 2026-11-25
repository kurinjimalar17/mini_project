// GET ELEMENTS

let memberForm = document.getElementById("memberForm");

let memberTableBody =
    document.getElementById("memberTableBody");

let memberFormSection =
    document.getElementById("memberFormSection");

let showMemberForm =
    document.getElementById("showMemberForm");

let cancelMember =
    document.getElementById("cancelMember");

let editIndex = -1;


// SHOW FORM

showMemberForm.addEventListener("click", function () {

    editIndex = -1;

    document.getElementById("formTitle").textContent =
        "➕ Add New Member";

    document.getElementById("formSubtitle").textContent =
        "Enter member details";

    document.getElementById("saveMember").textContent =
        "Save Member";

    memberFormSection.style.display = "block";

    memberFormSection.scrollIntoView({
        behavior: "smooth"
    });

});


// CANCEL

cancelMember.addEventListener("click", function () {

    memberForm.reset();

    editIndex = -1;

    clearErrors();

    document.getElementById("successMessage").textContent = "";

    memberFormSection.style.display = "none";

});


// GET MEMBERS FROM LOCAL STORAGE

function getMembers() {

    let members =
        localStorage.getItem("members");

    if (members) {

        return JSON.parse(members);

    } else {

        return [];

    }

}


// SAVE MEMBER

memberForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let memberId =
        document.getElementById("memberId")
        .value.trim();

    let memberName =
        document.getElementById("memberName")
        .value.trim();

    let department =
        document.getElementById("department")
        .value.trim();

    let email =
        document.getElementById("memberEmail")
        .value.trim();

    let mobile =
        document.getElementById("mobile")
        .value.trim();


    // MEMBER ID VALIDATION

    if (memberId === "") {

        document.getElementById("memberIdError")
            .textContent =
            "❌ Member ID is required.";

        return;
    }


    // NAME VALIDATION

    if (memberName === "") {

        document.getElementById("memberNameError")
            .textContent =
            "❌ Name is required.";

        return;
    }


    if (!/^[A-Za-z ]+$/.test(memberName)) {

        document.getElementById("memberNameError")
            .textContent =
            "❌ Name should contain only letters.";

        return;
    }


    // DEPARTMENT VALIDATION

    if (department === "") {

        document.getElementById("departmentError")
            .textContent =
            "❌ Department is required.";

        return;
    }


    // EMAIL VALIDATION

    if (email === "") {

        document.getElementById("memberEmailError")
            .textContent =
            "❌ Email is required.";

        return;
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        document.getElementById("memberEmailError")
            .textContent =
            "❌ Enter a valid email address.";

        return;
    }


    // MOBILE VALIDATION

    if (mobile === "") {

        document.getElementById("mobileError")
            .textContent =
            "❌ Mobile number is required.";

        return;
    }


    if (!/^[0-9]{10}$/.test(mobile)) {

        document.getElementById("mobileError")
            .textContent =
            "❌ Mobile number must contain exactly 10 digits.";

        return;
    }


    // GET EXISTING MEMBERS

    let members = getMembers();


    // CHECK DUPLICATE MEMBER ID

    let existingMember =
        members.findIndex(function (member) {

            return member.memberId === memberId;

        });


    if (
        editIndex === -1 &&
        existingMember !== -1
    ) {

        document.getElementById("memberIdError")
            .textContent =
            "❌ Member ID must be unique.";

        return;
    }


    // EDIT DUPLICATE CHECK

    if (
        editIndex !== -1 &&
        existingMember !== -1 &&
        existingMember !== editIndex
    ) {

        document.getElementById("memberIdError")
            .textContent =
            "❌ This Member ID already exists.";

        return;
    }


    // CREATE MEMBER OBJECT

    let memberObject = {

        memberId: memberId,

        memberName: memberName,

        department: department,

        email: email,

        mobile: mobile

    };


    // EDIT MEMBER

    if (editIndex !== -1) {

        members[editIndex] =
            memberObject;

        localStorage.setItem(
            "members",
            JSON.stringify(members)
        );

        document.getElementById("successMessage")
            .textContent =
            "✅ Member updated successfully!";

    }


    // ADD MEMBER

    else {

        members.push(memberObject);

        localStorage.setItem(
            "members",
            JSON.stringify(members)
        );

        document.getElementById("successMessage")
            .textContent =
            "✅ Member added successfully!";

    }


    // DISPLAY TABLE

    displayMembers();


    // CLEAR FORM

    memberForm.reset();

    editIndex = -1;


    // RESET FORM TITLE

    document.getElementById("formTitle").textContent =
        "➕ Add New Member";

    document.getElementById("formSubtitle").textContent =
        "Enter member details";

    document.getElementById("saveMember").textContent =
        "Save Member";


    // HIDE FORM

    setTimeout(function () {

        memberFormSection.style.display = "none";

        document.getElementById("successMessage")
            .textContent = "";

    }, 1500);

});


// DISPLAY MEMBERS

function displayMembers() {

    let members = getMembers();

    memberTableBody.innerHTML = "";


    if (members.length === 0) {

        memberTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No members available.
                    Click "Add Member" to add a member.
                </td>
            </tr>
        `;

        return;
    }


    members.forEach(function (member, index) {

        let row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${member.memberId}
            </td>

            <td>
                ${member.memberName}
            </td>

            <td>
                ${member.department}
            </td>

            <td>
                ${member.email}
            </td>

            <td>
                ${member.mobile}
            </td>

            <td class="action-buttons">

                <button
                    class="view-button"
                    onclick="viewMember(${index})">
                    View
                </button>

                <button
                    class="edit-button"
                    onclick="editMember(${index})">
                    Edit
                </button>

                <button
                    class="delete-button"
                    onclick="deleteMember(${index})">
                    Delete
                </button>

            </td>

        `;

        memberTableBody.appendChild(row);

    });

}


// VIEW MEMBER

function viewMember(index) {

    let members = getMembers();

    let member = members[index];


    if (!member) {

        return;

    }


    alert(
        "Member ID: " + member.memberId +
        "\nName: " + member.memberName +
        "\nDepartment: " + member.department +
        "\nEmail: " + member.email +
        "\nMobile: " + member.mobile
    );

}


// EDIT MEMBER

function editMember(index) {

    let members = getMembers();

    let member = members[index];


    if (!member) {

        return;

    }


    document.getElementById("memberId").value =
        member.memberId;

    document.getElementById("memberName").value =
        member.memberName;

    document.getElementById("department").value =
        member.department;

    document.getElementById("memberEmail").value =
        member.email;

    document.getElementById("mobile").value =
        member.mobile;


    editIndex = index;


    document.getElementById("formTitle").textContent =
        "✏️ Edit Member";

    document.getElementById("formSubtitle").textContent =
        "Modify member details and save changes";

    document.getElementById("saveMember").textContent =
        "Update Member";


    memberFormSection.style.display = "block";

    memberFormSection.scrollIntoView({
        behavior: "smooth"
    });

}


// DELETE MEMBER

function deleteMember(index) {

    let members = getMembers();

    let member = members[index];


    if (!member) {

        return;

    }


    let confirmDelete =
        confirm(
            "Are you sure you want to delete \"" +
            member.memberName +
            "\"?"
        );


    if (!confirmDelete) {

        return;

    }


    members.splice(index, 1);


    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );


    displayMembers();

}


// CLEAR ERRORS

function clearErrors() {

    document.getElementById("memberIdError")
        .textContent = "";

    document.getElementById("memberNameError")
        .textContent = "";

    document.getElementById("departmentError")
        .textContent = "";

    document.getElementById("memberEmailError")
        .textContent = "";

    document.getElementById("mobileError")
        .textContent = "";

}


// INITIAL DISPLAY

displayMembers();