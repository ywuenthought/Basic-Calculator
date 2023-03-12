function receiveDigit(digit, numBuffer, oprBuffer, expBuffer) {
    let L1 = numBuffer.length;
    let L2 = oprBuffer.length;
    if (L1 === L2) {
        numBuffer.push(digit);
    }
    else if (L1 === L2 + 1) {
        let str = numBuffer.pop();
        if (digit === '.') {
            if (str.indexOf('.') === -1) {
                numBuffer.push(str + digit);
            }
            else {
                numBuffer.push(str);
            }
        }
        else {
            if (str === '0') {
                numBuffer.push(digit);
            }
            else {
                numBuffer.push(str + digit);
            }
        }
    }
    if (['+', '-', '*', '/'].includes(
        expBuffer[expBuffer.length - 1]
    )) {
        expBuffer.push(numBuffer[numBuffer.length - 1]);
    }
    else {
        expBuffer[expBuffer.length - 1] = (
            numBuffer[numBuffer.length - 1]
        );
    }
    return;
}


function receiveArith(arith, numBuffer, oprBuffer, expBuffer) {
    let L1 = numBuffer.length;
    let L2 = oprBuffer.length;
    if (L1 === L2) {
        oprBuffer.pop();
        oprBuffer.push(arith);
    }
    else if (L1 === L2 + 1) {
        _updateBuffers(arith, numBuffer, oprBuffer);
        oprBuffer.push(arith);
    }
    if (!['+', '-', '*', '/'].includes(
        expBuffer[expBuffer.length - 1]
    )) {
        expBuffer.push(arith);
    }
    else {
        expBuffer[expBuffer.length - 1] = arith;
    }
    return;
}


function receiveOther(other, numBuffer, oprBuffer, expBuffer) {
    if (other === 'c') {
        flush(numBuffer, oprBuffer, expBuffer);
        return;
    }
    if (numBuffer.length === oprBuffer.length + 1) {
        if (other === '←') {
            let str = numBuffer.pop();
            if (str.length === 1) {
                numBuffer.push('0');
            }
            else {
                numBuffer.push(str.slice(0, -1));
            }
        }
        if (other === '%') {
            numBuffer.push(
                _evaluatePercentGeneral(numBuffer.pop())
            );
        }
        expBuffer[expBuffer.length - 1] = (
            numBuffer[numBuffer.length - 1]
        );
    }
    return;
}


function _updateBuffers(arith, numBuffer, oprBuffer) {
    switch (arith) {
        case '*':
        case '/':
            if (['*', '/'].includes(
                oprBuffer[oprBuffer.length - 1]
            )) {
                let str1 = numBuffer.pop();
                let str2 = numBuffer.pop();
                numBuffer.push(
                    _evaluateExpression([str2, oprBuffer.pop(), str1])
                );
            }
            break;
        case '+':
        case '-':
        case '=':
            let items = [];
            while (oprBuffer.length) {
                items.push(numBuffer.pop());
                items.push(oprBuffer.pop());
            }
            items.push(numBuffer.pop());
            items = items.reverse();
            numBuffer.push(_evaluateExpression(items));
            break;
    }
    return;
}


function _evaluatePercentInteger(string) {
    let string_ = string.padStart(3, '0');
    return string_.slice(0, -2) + '.' + string_.slice(-2, );
}


function _evaluatePercentGeneral(string) {
    let index = string.indexOf('.');
    if (index !== -1) {
        return (
            _evaluatePercentInteger(string.slice(0, index)) +
            string.slice(index + 1, )
        );
    }
    return _evaluatePercentInteger(string);
}


function _protectPrecision(string) {
    let index = string.indexOf('.');
    if (index !== -1) {
        return 10 ** (string.length - 1 - index);
    }
    return 1;
}


function _evaluateExpression(items) {
    while (items.includes('*') || items.includes('/')) {
        for (let i = 1; i < items.length; i += 2) {
            if (items[i] !== '*' && items[i] !== '/') {
                continue;
            }
            let f1 = _protectPrecision(items[i - 1]);
            let f2 = _protectPrecision(items[i + 1]);
            let value = eval(
                `(${items[i - 1]}*${f1})` + items[i] +
                `(${items[i + 1]}*${f2})`
            );
            if (items[i] === '*') {
                value /= f1 * f2;
            }
            if (items[i] === '/') {
                value *= f2 / f1;
            }
            items = items.slice(0, i-1)
                    .concat([value.toString()])
                    .concat(items.slice(i+2, ));
            break;
        }
    }
    let factor = 1;
    for (let i = 0; i < items.length; i += 2) {
        factor = Math.max(factor, _protectPrecision(items[i]));
    }
    for (let i = 0; i < items.length; i += 2) {
        items[i] += `*${factor}`;
    }
    let expr = `(${items.join('')})/${factor}`;
    let result = eval(expr).toString();
    return result;
}
