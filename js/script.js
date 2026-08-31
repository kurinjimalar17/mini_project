
// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    const password = document.getElementById("password");

    // Password conditions
    password.addEventListener("input", function () {

        let value = password.value;

        document.getElementById("length").textContent =
            value.length >= 8
                ? "✔ Minimum 8 characters"
                : "✖ Minimum 8 characters";

        document.getElementById("uppercase").textContent =
            /[A-Z]/.test(value)
                ? "✔ One uppercase letter"
                : "✖ One uppercase letter";

        document.getElementById("lowercase").textContent =
            /[a-z]/.test(value)
                ? "✔ One lowercase letter"
                : "✖ One lowercase letter";

        document.getElementById("number").textContent =
            /[0-9]/.test(value)
                ? "✔ One number"
                : "✖ One number";

        document.getElementById("special").textContent =
            /[^A-Za-z0-9]/.test(value)
                ? "✔ One special character"
                : "✖ One special character";

    });


    // LOGIN
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let username =
            document.getElementById("username").value.trim();

        let passwordValue =
            document.getElementById("password").value;

        let message =
            document.getElementById("loginMessage");


        // Empty fields
        if (username === "" || passwordValue === "") {

            message.style.color = "red";

            message.textContent =
                "Please enter username and password.";

            return;
        }


        // Password validation
        let validPassword =
            passwordValue.length >= 8 &&
            /[A-Z]/.test(passwordValue) &&
            /[a-z]/.test(passwordValue) &&
            /[0-9]/.test(passwordValue) &&
            /[^A-Za-z0-9]/.test(passwordValue);


        if (!validPassword) {

            message.style.color = "red";

            message.textContent =
                "Password does not meet the conditions.";

            return;
        }


        // Correct login details
        if (
            username === "admin" &&
            passwordValue === "Admin@123"
        ) {

            message.style.color = "green";

            message.textContent =
                "✓ Login Successful!";


            // Dashboard after 2 seconds
            setTimeout(function () {

                window.location.href = "dashboard.html";

            }, 2000);

        }

        else {

            message.style.color = "red";

            message.textContent =
                "✖ Invalid Credentials";

        }

    });

}


// ================= REGISTRATION =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let name =
            document.getElementById("name").value.trim();

        let username =
            document.getElementById("regUsername").value.trim();

        let email =
            document.getElementById("email").value.trim();

        let password =
            document.getElementById("regPassword").value;

        let message =
            document.getElementById("registerMessage");


        // Empty field validation
        if (
            name === "" ||
            username === "" ||
            email === "" ||
            password === ""
        ) {

            message.style.color = "red";

            message.textContent =
                "Please fill all the fields.";

            return;
        }


        // Password validation
        let validPassword =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);


        if (!validPassword) {

            message.style.color = "red";

            message.textContent =
                "Password must contain 8 characters, uppercase, lowercase, number and special character.";

            return;
        }


        // Registration success
        message.style.color = "green";

        message.textContent =
            "✓ Registration Successful!";


        // Clear form
        registerForm.reset();

    });

}
