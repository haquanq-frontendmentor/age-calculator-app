export const setupTextField = (id: string, customValidate?: (value: number | null) => string) => {
    const wrapper = document.querySelector(id) as HTMLElement;
    const input = wrapper.querySelector(".text-field__input") as HTMLInputElement;
    const hint = wrapper.querySelector(".text-field__hint") as HTMLParagraphElement;

    const validate = () => {
        let errorMessages = "";

        if (input.value === "") {
            errorMessages = "Can't be empty";
        } else if (customValidate) {
            errorMessages = customValidate(getValue());
        }

        if (errorMessages !== "") {
            showError(errorMessages);
            return false;
        }

        hideError();
        return true;
    };

    const showError = (message: string) => {
        wrapper.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-invalid", "true");
        hint.textContent = message;
    };

    const hideError = () => {
        wrapper.setAttribute("aria-invalid", "false");
        input.setAttribute("aria-invalid", "false");
        hint.textContent = "";
    };

    const getName = () => {
        return input.name;
    };

    const getValue = () => {
        if (input.value === "") return null;
        return parseFloat(input.value.replaceAll(",", ""));
    };

    const focus = () => {
        input.focus();
    };

    const reset = () => {
        wrapper.setAttribute("aria-invalid", "false");
        input.setAttribute("aria-invalid", "false");
        hint.textContent = "";
        input.value = "";
    };

    const handleInputEvent = () => {
        input.value = input.value.replaceAll(/[^0-9.]/g, "");
    };

    const handleBlurEvent = () => {
        validate();
    };

    input.addEventListener("input", handleInputEvent);
    input.addEventListener("blur", handleBlurEvent);
    return { validate, getName, focus, reset, getValue };
};
