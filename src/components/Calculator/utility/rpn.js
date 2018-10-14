function yardCalc(expr) {
  const operations = {
    add: (a, b) => a + b,
    substract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
  };

  let symbolOperations = {};

  const defineSymbolOperation = (symbol, func = null, precedence = 0, left = true) => {
    symbolOperations[symbol] = {
      func,
      precedence,
      left
    };
  };

  defineSymbolOperation('+', operations.add, 2);
  defineSymbolOperation('-', operations.substract, 2);
  defineSymbolOperation('*', operations.multiply, 3);
  defineSymbolOperation('/', operations.divide, 3);
  defineSymbolOperation('(');
  defineSymbolOperation(')');


  const rpn = (input) => {
    let
      match,
      output = [],
      stack = [],
      pattern = new RegExp(
        `\\d+(?:\\.\\d+)?(?:e\\+\\d+)?|` +         // match float
        Object.keys(symbolOperations)
          .map(symbol => `\\${symbol}`)
          .join('|') +                  // match operators
        `|(\\S)`, 'g');               // catch syntax error

    while ((match = pattern.exec(input)) !== null) {
      let [token, error] = match;
      // check for syntax error
      if (error) {
        return;
      }
      // if number
      if (!isNaN(token)) {
        output.push(+token);
      } else { // else operator
        // push open parenthesis
        if (token === '(') {
          stack.push(token);
          continue;
        }

        // pop operators till we find open parenthesis
        if (token === ')') {
          // search for '('
          const parIndex = stack.lastIndexOf('(');
          if (parIndex >= 0) {
            // push all operators onto output
            output.push(...stack.splice(parIndex + 1).reverse());
            // pop '('
            stack.pop();
          } else {
            return;
          }
          continue;
        }

        // pop operators with higher or equal precedence then token and push onto output
        while (stack.length &&
          symbolOperations[stack[stack.length - 1]].precedence >= symbolOperations[token].precedence
        ) {
          output.push(stack.pop());
        }

        stack.push(token);
      }
    }
    // pop left operators from stack and push onto output
    output.push(...stack.reverse());
    return output;
  };

  // eval rpn
  const calculate = (input) =>
    input.reduce((value, token) => {
      if (!isNaN(token)) {
        value.push(token);
      } else {
        const arg2 = value.pop();
        const arg1 = value.pop();
        value.push(symbolOperations[token].func(arg1, arg2));
      }
      return value;
    }, [])[0];


  return calculate(rpn(expr));
}

export default yardCalc;