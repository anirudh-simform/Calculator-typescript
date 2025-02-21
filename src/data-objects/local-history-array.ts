import { CalculationHistoryObject } from "../event_listener_functions/modal-event-listeners";
function getHistoryArray() {
  const historyArrayJSON = localStorage.getItem("history");
  let history: CalculationHistoryObject[] = [];
  if (historyArrayJSON !== null) {
    history = JSON.parse(historyArrayJSON);
  }
  return history;
}
export { getHistoryArray };
