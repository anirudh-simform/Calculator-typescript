import { globalHTMLElements } from "./add-event-listeners.js";
import { pinDisplayToBottom } from "./pin-display-to-bottom.js";

// Sets up new Display and answerDisplay nodes and updates the previous variables
// to refer to the new nodes
function setupNewNodes(newDisplayValue: string, newAnswerDisplayValue: string) {
  globalHTMLElements["newDisplay"] = globalHTMLElements[
    "display"
  ].cloneNode() as HTMLDivElement;

  globalHTMLElements["newAnswerDisplay"] = globalHTMLElements[
    "answerDisplay"
  ].cloneNode() as HTMLDivElement;

  globalHTMLElements["newDisplay"].textContent = newDisplayValue;
  globalHTMLElements["newAnswerDisplay"].textContent = newAnswerDisplayValue;

  // Update display and answerDisplay to refer to the latest two nodes
  globalHTMLElements["display"] = globalHTMLElements["newDisplay"];
  globalHTMLElements["answerDisplay"] = globalHTMLElements["newAnswerDisplay"];

  // Append the newly created nodes to the calculator display container
  globalHTMLElements["calculatorDisplayContainer"].append(
    globalHTMLElements["newDisplay"],
    globalHTMLElements["newAnswerDisplay"]
  );

  pinDisplayToBottom();
}

export { setupNewNodes };
