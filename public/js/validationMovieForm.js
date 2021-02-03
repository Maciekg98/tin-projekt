function validateForm() {


    const titleInput = document.getElementById('title');
    const directorInput = document.getElementById('director');
    const priceInput = document.getElementById('price');

    const errorTitle = document.getElementById('errorTitle');
    const errorDirector = document.getElementById('errorDirector');
    const errorPrice = document.getElementById('errorPrice');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([titleInput, directorInput, priceInput], [errorTitle, errorDirector, errorPrice], errorsSummary);

    let valid = true;


    // title
    if (!checkRequired(titleInput.value)) {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Field is required";
    } else if (!checkTextLengthRange(titleInput.value, 2, 60)) {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "The field should contain from 2 to 60 characters";
    }

    // director
    if (!checkRequired(directorInput.value)) {
        valid = false;
        directorInput.classList.add("error-input");
        errorDirector.innerText = "Field is required";
    } else if (!checkTextLengthRange(directorInput.value, 2, 60)) {
        valid = false;
        directorInput.classList.add("error-input");
        errorDirector.innerText = "The field should contain from 2 to 60 characters";
    }

    //price

    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Field is required";
    } else if (!checkNumberRange(priceInput.value, 10, 100000)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Price min : 10zl"

    }


    return valid;

}