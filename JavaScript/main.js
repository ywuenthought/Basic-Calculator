let numBuffer = ['0'];
let oprBuffer = [   ];
let expBuffer = ['0'];
let count = 0;
let prev = '';
let curr = '';


function init() {
    const buttons = document.querySelector('.button-layout');
    buttons.addEventListener('mousedown', function (event) {
        let text = convertString(event.target.innerText);
        let list = event.target.classList;
        if (list.contains('digit-button')) {
            receiveDigit(text, numBuffer, oprBuffer, expBuffer);
            count = 0;
            prev = '';
            curr = '';
        }
        if (list.contains('arith-button')) {
            receiveArith(text, numBuffer, oprBuffer, expBuffer);
            count += 1;
            if (count == 1) {
                prev = text;
            }
            if (count == 2) {
                curr = text;
                if (['+', '-'].includes(prev) && ['*', '/'.includes(curr)]) {
                    arith = expBuffer.pop();
                    expBuffer = ['(', ...expBuffer, ')', arith];
                }
            }
        }
        if (list.contains('other-button')) {
            receiveOther(text, numBuffer, oprBuffer, expBuffer);
        }
        displayMain(numBuffer);
        displayTraceback(expBuffer);
        if (text === '=') {
            flush(numBuffer, oprBuffer, expBuffer);
        }
    })
    buttons.addEventListener('mouseup', function (event) {
        event.target.blur();
    });
    window.addEventListener('keydown', function (event) {
        let text = event.key;
        if (text === 'Backspace') {
            text = '←';
        }
        if (text === 'Enter') {
            text = '=';
        }
        let element = getElementByText(text);
        if (element !== undefined) {
            element.focus();
            let list = element.classList;
            if (list.contains('digit-button')) {
                receiveDigit(text, numBuffer, oprBuffer, expBuffer);
                count = 0;
                prev = '';
                curr = '';
            }
            if (list.contains('arith-button')) {
                receiveArith(text, numBuffer, oprBuffer, expBuffer);
                count += 1;
                if (count == 1) {
                    prev = text;
                }
                if (count == 2) {
                    curr = text;
                    if (['+', '-'].includes(prev) && ['*', '/'.includes(curr)]) {
                        arith = expBuffer.pop();
                        expBuffer = ['(', ...expBuffer, ')', arith];
                    }
                }
            }
            if (list.contains('other-button')) {
                receiveOther(text, numBuffer, oprBuffer, expBuffer);
            }
            displayMain(numBuffer);
            displayTraceback(expBuffer);
            if (text === '=') {
                flush(numBuffer, oprBuffer, expBuffer);
            }
        }
    });
    window.addEventListener('keyup', function (event) {
        let text = event.key;
        if (text === 'Backspace') {
            text = '←';
        }
        if (text === 'Enter') {
            text = '=';
        }
        let element = getElementByText(text);
        if (element !== undefined) {
            element.blur();
        }
    });
    return;
}


init();
