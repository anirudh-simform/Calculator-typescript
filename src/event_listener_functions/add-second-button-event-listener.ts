import {
  globalHTMLElements,
  globalNodeListElements,
} from "./add-event-listeners.js";
function addSecondButtonEventListener() {
  const trignometricFunctions = globalNodeListElements["trignometricFunctions"];
  const secondButton = globalHTMLElements["secondButton"];
  const angleToggle = globalHTMLElements["angleToggle"];

  // 2nd button lets us access the inverse trignometric functions
  secondButton.addEventListener("click", () => {
    trignometricFunctions.forEach((trig) => {
      if (trig.classList.contains("inverse")) {
        const datasetValue = trig.dataset.value;
        // Only execute if trignometric function DOM nodes are present
        if (datasetValue) {
          trig.innerHTML = datasetValue;
          angleToggle.style.pointerEvents = "auto";
        } else {
          throw new Error("trignometric DOM nodes not found");
        }
      } else {
        const datasetValue = trig.dataset.value;
        // Only execute if trignometric function DOM nodes are present
        if (datasetValue) {
          trig.innerHTML = trig.dataset.value + "<sup>-1</sup>";
          angleToggle.style.pointerEvents = "none";
        } else {
          throw new Error("trignometric DOM nodes not found");
        }
      }
      trig.classList.toggle("inverse");
    });
  });
}

export { addSecondButtonEventListener };
