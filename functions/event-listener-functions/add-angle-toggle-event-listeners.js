import { calculator } from "../../index.js";
function addAngleToggleEventListener() {
  const secondButton = document.querySelector(".second-row");
  const angleToggle = document.querySelector(".angle-toggle");
  // Toggle angle between degree and radian
  angleToggle.addEventListener("click", () => {
    if (angleToggle.classList.contains("deg")) {
      angleToggle.textContent = "rad";
      angleToggle.classList.remove("deg");
      // Disable 2nd row button when angle toggle is set to radians
      secondButton.style.pointerEvents = "none";
    } else {
      angleToggle.textContent = "deg";
      angleToggle.classList.add("deg");
      // Enable 2nd row button when angle toggle is set to degree
      secondButton.style.pointerEvents = "auto";
    }
    calculator.toggleAngleInput();
  });
}

export { addAngleToggleEventListener };
