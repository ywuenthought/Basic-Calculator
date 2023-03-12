main = document.querySelector('.main-screen');
traceback = document.querySelector('.traceback-screen');


function displayMain(numBuffer) {
    if (numBuffer.length) {
        main.innerText = numBuffer[
            numBuffer.length - 1
        ].slice(0, 12);
    }
    else {
        main.innerText = '0';
    }
    return;
}


function displayTraceback(expBuffer) {
    let expBuffer_ = [...expBuffer];
    for (let i = 0; i < expBuffer_.length; i++) {
        switch (expBuffer_[i]) {
            case '*':
                expBuffer_[i] = '×';
                break;
            case '/':
                expBuffer_[i] = '÷';
                break
        }
    }
    traceback.innerText = expBuffer_.join('').slice(-29, );
    return;
}
