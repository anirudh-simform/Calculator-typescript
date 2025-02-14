import { calculator } from "../../index.js";
import { globals } from "../add-event-listeners.js";
function addParentthesisEventListeners() {
  // Parenthesis
  const openPara = document.querySelector(".open-para");
  const closedPara = document.querySelector(".close-para");

  openPara.addEventListener("click", () => {
    const value = String(openPara.dataset.value);
    calculator.appendChar(value);
    globals.getValue("display").textContent += value;
  });

  closedPara.addEventListener("click", () => {
    const value = String(closedPara.dataset.value);
    calculator.appendChar(value);
    globals.getValue("display").textContent += value;
  });
}

export { addParentthesisEventListeners };
