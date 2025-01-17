function tokenize(input) {
  let str = "";
  let arr = [];

  for (let i = 0; i <= input.length - 1; i++) {
    if ("*+-/^%()".indexOf(input[i]) > -1) {
      if (str.length > 0) {
        arr.push(str);
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

  return arr;
}

export { tokenize };
