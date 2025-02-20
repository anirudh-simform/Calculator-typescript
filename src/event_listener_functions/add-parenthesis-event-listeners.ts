import { calculator } from "../index.js";
import { globalHTMLElements } from "./add-event-listeners.js";
function addParentthesisEventListeners() {
  // Parenthesis
  const openPara = document.querySelector(".open-para") as HTMLDivElement;
  const closedPara = document.querySelector(".close-para") as HTMLDivElement;

  // Check if openPara is present in the DOM
  if (openPara !== null) {
    openPara.addEventListener("click", () => {
      const value = String(openPara.dataset.value);
      calculator.appendChar(value);
      globalHTMLElements["display"].textContent += value;
    });
  }

  // Check if closedPara is present in the DOM
  if (closedPara !== null) {
    closedPara.addEventListener("click", () => {
      const value = String(closedPara.dataset.value);
      calculator.appendChar(value);
      globalHTMLElements["display"].textContent += value;
    });
  }
}

export { addParentthesisEventListeners };
