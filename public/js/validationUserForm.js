function validateForm() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const errorUsername = document.getElementById('errorUsername');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([usernameInput, passwordInput, emailInput], [errorUsername, errorEmail, errorPassword], errorsSummary);

    let valid = true;

    // username
    if (!checkRequired(usernameInput.value)) {
        valid = false;
        usernameInput.classList.add("error-input");
        errorUsername.innerText = "Field is required";
    } else if (!checkTextLengthRange(usernameInput.value, 2, 60)) {
        valid = false;
        usernameInput.classList.add("error-input");
        errorUsername.innerText = "The field should contain from 2 to 60 characters";
    }

    //mail
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Field is required";
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "The field should contain from 5 to 60 characters";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "The field should contain a valid email address";
    }

    // password
    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = "Field is required";
    } else if (!checkPassword(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = "The field should contain from 7 to 15 characters which contain at least one numeric digit and a special character";
    }

    if (!valid) {
        errorsSummary.innerText = "Form contains errors";
    }

    return valid;
}