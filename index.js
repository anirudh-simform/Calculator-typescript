import { Calculator } from "./functions/calculator.js";
import { addEventListeners } from "./functions/add-event-listeners.js";
import { setupDarkMode } from "./functions/setup-dark-mode.js";
import { addModalEventListeners } from "./functions/modal-event-listeners.js";
// main script

// Initialize history array for localStorage
const history = [];
localStorage.setItem("history", JSON.stringify(history));

// Dark Mode
setupDarkMode();

// Setup modal
addModalEventListeners();

// Set Constants

// PI
const pi = document.querySelector(".pi");
pi.dataset.value = Math.PI;

// e
const e = document.querySelector(".e");
e.dataset.value = Math.E;

addEventListeners();

const calculator = new Calculator("");

export { calculator };
