const precedence = {};

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

const unaryOperators = new Set(["sin", "cos", "tan", "log", "sqrt", "%"]);

export { precedence, unaryOperators };
