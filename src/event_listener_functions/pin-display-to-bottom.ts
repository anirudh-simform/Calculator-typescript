import { globalHTMLElements } from "./add-event-listeners.js";

// Pins scrollbar of the calculatorDisplayContainer to the bottom
function pinDisplayToBottom() {
  const calculatorDisplayContainer =
    globalHTMLElements["calculatorDisplayContainer"];
  // Pin scrollbar in the display to the bottom
  calculatorDisplayContainer.scrollTop =
    calculatorDisplayContainer.scrollHeight -
    calculatorDisplayContainer.clientHeight;
}

export { pinDisplayToBottom };
