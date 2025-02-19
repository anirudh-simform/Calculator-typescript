import { CalculationHistoryObject } from "../event_listener_functions/modal-event-listeners";
function getCalculationObject(expression: string, result: string) {
  const calculationObject: CalculationHistoryObject = {
    expression: "",
    result: "",
  };

  calculationObject["expression"] = expression;
  calculationObject["result"] = result;
  return calculationObject;
}

export { getCalculationObject };
