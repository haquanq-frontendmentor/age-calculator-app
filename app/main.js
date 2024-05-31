import { intervalToDuration } from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");
const dayErrorMessage = document.querySelector("#day-input + .error-message");
const monthErrorMessage = document.querySelector("#month-input + .error-message");
const yearErrorMessage = document.querySelector("#year-input + .error-message");
const dayText = document.querySelector(".day-text");
const monthText = document.querySelector(".month-text");
const yearText = document.querySelector(".year-text");

let usingControlKey = false;
let fieldsValidated = true;

window.onkeyup = (e) => {
    if (e.keyCode == 17) usingControlKey = false;
};

document.querySelectorAll(".text-field input").forEach((element) => {
    element.addEventListener("focus", () => {
        dayErrorMessage.textContent = "";
        monthErrorMessage.textContent = "";
        yearErrorMessage.textContent = "";

        document.querySelectorAll(".text-field").forEach((e) => e.classList.remove("error"));

        fieldsValidated = true;
    });

    element.addEventListener("keydown", (e) => {
        if (e.keyCode == 17) usingControlKey = true;
        if (!/\d/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab" && !usingControlKey) {
            e.preventDefault();
        }
    });
});

document.querySelector(".calculator-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const errorMessages = {
        FIELD_EMPTY: "This field is required",
        mustBe: (name) => `Must be a valid ${name}`,
    };

    const isEmpty = (value) => value === "";

    if (isEmpty(yearInput.value)) {
        yearErrorMessage.textContent = errorMessages.FIELD_EMPTY;
        fieldsValidated = false;
    } else if (parseInt(yearInput.value) > new Date().getYear() + 1900) {
        yearErrorMessage.textContent = errorMessages.mustBe("year");
        fieldsValidated = false;
    }

    if (isEmpty(monthInput.value)) {
        monthErrorMessage.textContent = errorMessages.FIELD_EMPTY;
        fieldsValidated = false;
    } else if (parseInt(monthInput.value) > 12) {
        monthErrorMessage.textContent = errorMessages.mustBe("month");
        fieldsValidated = false;
    }

    if (isEmpty(dayInput.value)) {
        dayErrorMessage.textContent = errorMessages.FIELD_EMPTY;
        fieldsValidated = false;
    } else if (
        new Date(parseInt(yearInput.value), parseInt(monthInput.value), 0).getDate() >=
        parseInt(dayInput.value)
    ) {
        dayErrorMessage.textContent = errorMessages.mustBe("day");
        fieldsValidated = false;
    }

    if (fieldsValidated) {
        const { years, months, days } = intervalToDuration({
            start: new Date(
                parseInt(yearInput.value),
                parseInt(monthInput.value),
                parseInt(dayInput.value)
            ),
            end: new Date(),
        });

        dayText.textContent = days;
        monthText.textContent = months;
        yearText.textContent = years;
    } else {
        document.querySelectorAll(".text-field").forEach((e) => e.classList.add("error"));
    }
});
