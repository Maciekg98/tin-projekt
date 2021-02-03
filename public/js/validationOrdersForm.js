function abc() {

    const usernameInput = document.getElementById('userId');
    const titleInput = document.getElementById('movie_id');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    var radios = document.getElementsByName("isPaid")


    const errorUsername = document.getElementById('errorUsername')
    const errorTitle = document.getElementById('errorTitle');
    const errorDateFrom = document.getElementById('errorFrom');
    const errorDateTo = document.getElementById('errorTo');
    const errorWrap = document.getElementById('errorWrap');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([usernameInput, titleInput, dateFromInput, dateToInput, errorWrap], [errorUsername, errorTitle, errorDateFrom, errorDateTo, errorWrap], errorsSummary);

    let valid = true;

    if (!checkRequired(usernameInput.value)) {
        valid = false;
        usernameInput.classList.add("error-input");
        errorUsername.innerText = "Field is required";
    }
    if (!checkRequired(titleInput.value)) {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Field is required";
    }
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');


    if (!checkRequired(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Field is required";
    }

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Field is required";
    } else if (!checkRequired(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Field is required";
    } else if (!checkDate(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateFromInput.value, nowString)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "The date cannot be from the future";
    } else if (checkRequired(dateToInput.value) && checkDate(dateToInput.value)
        && !checkDateIfAfter(dateToInput.value, dateFromInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "The date to should be later than the date from";
    }

    if (!checkRadio(radios)) {
        valid = false;
        errorWrap.innerText = "Field is required";
    }

    return valid;

}