const precedence = {
  "+": 2,
  "-": 2,
  "*": 3,
  "/": 3,
  "^": 4,
  "%": 10,
  sin: 10,
  cos: 10,
  tan: 10,
  log: 10,
  sqrt: 10,
  ln: 10,
};

precedence["+"] = 2;
precedence["-"] = 2;
precedence["*"] = 3;
precedence["/"] = 3;
precedence["^"] = 4;
precedence["%"] = 10;
precedence["sin"] = 10;
precedence["cos"] = 10;
precedence["tan"] = 10;
precedence["log"] = 10;
precedence["sqrt"] = 10;

const unaryOperators = new Set([
  "sin",
  "cos",
  "tan",
  "log",
  "sqrt",
  "%",
  "ln",
  "-",
]);

export { precedence, unaryOperators };
