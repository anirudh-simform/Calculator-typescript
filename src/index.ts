import { Calculator } from "./calculator.js";
import { addEventListeners } from "./event_listener_functions/add-event-listeners.js";
import { setupDarkMode } from "./helper_functions/setup-dark-mode.js";
import { addModalEventListeners } from "./event_listener_functions/modal-event-listeners.js";
import { CalculationHistoryObject } from "./event_listener_functions/modal-event-listeners.js";
// main script

// Initialize history array for localStorage
const history: CalculationHistoryObject[] = [];
if (!localStorage.getItem("history")) {
  localStorage.setItem("history", JSON.stringify(history));
}

// Dark Mode
setupDarkMode();

// Setup modal
addModalEventListeners();

// Set Constants

// PI
const pi = document.querySelector(".pi") as HTMLDivElement;
if (pi) {
  pi.dataset.value = String(Math.PI);
}

// e
const e = document.querySelector(".e") as HTMLDivElement;
if (e) {
  e.dataset.value = String(Math.E);
}

addEventListeners();
// Instatiate Calculator object
const calculator = new Calculator();

export { calculator };
