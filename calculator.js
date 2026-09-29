const display = document.getElementById("display");


// Add value to display
function addToDisplay(value) {

    if (
        display.value === "0" ||
        display.value === "Error"
    ) {
        display.value = value;
    }

    else {
        display.value += value;
    }
}


// Clear display
function clearDisplay() {

    display.value = "0";
}


// Delete last character
function deleteLast() {

    if (display.value.length > 1) {

        display.value =
            display.value.slice(0, -1);

    }

    else {

        display.value = "0";
    }
}


// Calculate result
function calculate() {

    try {

        let expression = display.value;

        // Allow only calculator characters
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error();
        }

        let result = Function(
            '"use strict"; return (' +
            expression +
            ')'
        )();

        if (!isFinite(result)) {
            throw new Error();
        }

        display.value = result;

    }

    catch {

        display.value = "Error";
    }
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;


    // Numbers and operators
    if (/[0-9+\-*/%.]/.test(key)) {

        addToDisplay(key);
    }


    // Enter or =
    else if (
        key === "Enter" ||
        key === "="
    ) {

        calculate();
    }


    // Backspace
    else if (key === "Backspace") {

        deleteLast();
    }


    // Escape
    else if (key === "Escape") {

        clearDisplay();
    }

});