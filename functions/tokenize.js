function tokenize(input) {
  let str = "";
  let arr = [];
  let openParaCount = 0;
  let closedParaCount = 0;

  for (let i = 0; i <= input.length - 1; i++) {
    if ("*+-/^%()!".indexOf(input[i]) > -1) {
      if (input[i] == "(") {
        openParaCount += 1;
      }

      if (input[i] == ")") {
        closedParaCount += 1;
      }

      if (str.length > 0) {
        arr.push(str);
        if (arr[arr.length - 3] == "sqrt") {
          arr.push(")");
        }
      }

      arr.push(input[i]);
      str = "";
    } else {
      str += input[i];
    }
  }

  if (str.length > 0) {
    arr.push(str);
  }

  for (let i = 0; i < openParaCount - closedParaCount; i++) {
    arr.push(")");
  }

  if (arr[arr.length - 2] == "sqrt") {
    arr.push(")");
  }

  let newArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "-") {
      const operand = arr[i + 1];
      newArr[i + 1] = `-${operand}`;

      if (i == 0) {
        newArr.shift();
      } else {
        newArr.splice(i, 1, "+", `-${operand}`);
      }
    }
  }
  return newArr;
}

export { tokenize };
