let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else if (num === '.' && currentValue.includes('.')) {
            return;
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 0 : prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    display.value = currentValue;
}

// Initialize display
updateDisplay();
