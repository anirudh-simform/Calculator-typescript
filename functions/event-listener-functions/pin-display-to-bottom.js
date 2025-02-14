import { globals } from "../add-event-listeners.js";

// Pins scrollbar of the calculatorDisplayContainer to the bottom
function pinDisplayToBottom() {
  const calculatorDisplayContainer = globals.getValue(
    "calculatorDisplayContainer"
  );
  // Pin scrollbar in the display to the bottom
  calculatorDisplayContainer.scrollTop =
    calculatorDisplayContainer.scrollHeight -
    calculatorDisplayContainer.clientHeight;
}

export { pinDisplayToBottom };
