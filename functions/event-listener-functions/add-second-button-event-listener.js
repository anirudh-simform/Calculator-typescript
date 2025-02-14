import { globals } from "../add-event-listeners.js";
function addSecondButtonEventListener() {
  const trignometricFunctions = globals.getValue("trignometricFunctions");
  const secondButton = globals.getValue("secondButton");
  const angleToggle = globals.getValue("angleToggle");

  // 2nd button lets us access the inverse trignometric functions
  secondButton.addEventListener("click", () => {
    trignometricFunctions.forEach((trig) => {
      if (trig.classList.contains("inverse")) {
        trig.innerHTML = trig.dataset.value;
        angleToggle.style.pointerEvents = "auto";
      } else {
        trig.innerHTML = trig.dataset.value + "<sup>-1</sup>";
        angleToggle.style.pointerEvents = "none";
      }
      trig.classList.toggle("inverse");
    });
  });
}

export { addSecondButtonEventListener };
