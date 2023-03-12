function convertString(string) {
    let string_ = string;
    switch (string) {
        case '∙':
            string_ = '.';
            break;
        case '÷':
            string_ = '/';
            break;
        case '×':
            string_ = '*';
            break;
        case '−':
            string_ = '-';
            break;
    }
    return string_;
}


function flush(numBuffer, oprBuffer, expBuffer) {
    while (numBuffer.length) {
        numBuffer.pop();
    }
    numBuffer.push('0');
    while (oprBuffer.length) {
        oprBuffer.pop();
    }
    while (expBuffer.length) {
        expBuffer.pop();
    }
    expBuffer.push('0');
    return;
}


function getElementByText(text) {
    let elements = document.querySelectorAll('.button');
    for (let element of elements) {
        let innerText = convertString(element.innerText);
        if (innerText == text) {
            return element;
        }
    }
    return;
}
