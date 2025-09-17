import { setupTextField } from "./libs/setupTextField";
// @ts-ignore
import { intervalToDuration } from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

const dayResult = document.querySelector("#days") as HTMLElement;
const yearResult = document.querySelector("#years") as HTMLElement;
const monthResult = document.querySelector("#months") as HTMLElement;

const calculatorForm = document.querySelector(".calculator__form") as HTMLFormElement;

const dayTextField = setupTextField("#day-text-field", (day) => {
    console.log(new Date(yearTextField.getValue() as number, monthTextField.getValue() as number, 0).getDate());
    if (day && new Date(yearTextField.getValue() as number, monthTextField.getValue() as number, 0).getDate() < day) {
        return "Must be a valid day";
    }
    return "";
});

const monthTextField = setupTextField("#month-text-field", (value) => {
    if (value !== null && value > 12) return "Must be a valid month";
    return "";
});

const yearTextField = setupTextField("#year-text-field", (year) => {
    if (year && year > new Date().getFullYear() + 1900) {
        return "must be a valid year";
    }
    return "";
});

calculatorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const validated = [dayTextField.validate(), monthTextField.validate(), yearTextField.validate()].every((v) => v);

    if (validated) {
        const { years, months, days } = intervalToDuration({
            start: new Date(
                yearTextField.getValue() as number,
                monthTextField.getValue() as number,
                dayTextField.getValue() as number
            ),
            end: new Date(),
        });

        dayResult.textContent = days;
        monthResult.textContent = months;
        yearResult.textContent = years;
    }
});
