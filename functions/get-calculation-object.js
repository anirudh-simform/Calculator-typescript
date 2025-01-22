function getCalculationObject(expression, result) {
  const calculationObject = {};

  calculationObject["expression"] = expression;
  calculationObject["result"] = result;
  return calculationObject;
}

export { getCalculationObject };
