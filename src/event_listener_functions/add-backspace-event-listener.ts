import { globalHTMLElements } from "./add-event-listeners.js";
import { calculator } from "../index.js";
function addBackspaceEventListener() {
  // Backspace button (deletes the last character)
  const backspace = document.querySelector(".backspace");

  // Check if backspace is present in the DOM
  if (backspace !== null) {
    backspace.addEventListener("click", () => {
      if (globalHTMLElements["answerDisplay"].textContent !== "") {
        return;
      }
      const display = globalHTMLElements["display"];
      let currDisplay = String(display.textContent);
      // if the display contains a function at the end remove all characters
      // of the function till it encounters a binary operator
      if (currDisplay.charAt(currDisplay.length - 1) == "(") {
        while (
          !("+-*/".indexOf(currDisplay.charAt(currDisplay.length - 1)) > -1)
        ) {
          calculator.removeLastChar();
          display.textContent = currDisplay.slice(0, currDisplay.length - 1);
          currDisplay = String(display.textContent);
        }
      } else {
        calculator.removeLastChar();
        display.textContent = currDisplay.slice(0, currDisplay.length - 1);
      }
    });
  }
}

export { addBackspaceEventListener };
