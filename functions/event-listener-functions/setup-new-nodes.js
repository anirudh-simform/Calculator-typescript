import { globals } from "../add-event-listeners.js";
import { pinDisplayToBottom } from "./pin-display-to-bottom.js";

// Sets up new Display and answerDisplay nodes and updates the previous variables
// to refer to the new nodes
function setupNewNodes(newDisplayValue, newAnswerDisplayValue) {
  globals.setValue("newDisplay", globals.getValue("display").cloneNode());
  globals.setValue(
    "newAnswerDisplay",
    globals.getValue("answerDisplay").cloneNode()
  );

  globals.getValue("newDisplay").textContent = newDisplayValue;
  globals.getValue("newAnswerDisplay").textContent = newAnswerDisplayValue;

  // Update display and answerDisplay to refer to the latest two nodes
  globals.setValue("display", globals.getValue("newDisplay"));
  globals.setValue("answerDisplay", globals.getValue("newAnswerDisplay"));

  // Append the newly created nodes to the calculator display container
  globals
    .getValue("calculatorDisplayContainer")
    .append(
      globals.getValue("newDisplay"),
      globals.getValue("newAnswerDisplay")
    );

  pinDisplayToBottom();
}

export { setupNewNodes };
