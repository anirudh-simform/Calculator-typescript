function setupDarkMode() {
  const theme = document.querySelector("#theme") as HTMLLinkElement;
  // Dark mode button
  const toggleDarkModeButton = document.querySelector(".toggle-dark-mode");
  if (toggleDarkModeButton && theme) {
    toggleDarkModeButton.addEventListener("click", () => {
      if (theme.getAttribute("href") == "light.css") {
        toggleDarkModeButton.textContent = "Light Mode";
        theme.href = "dark.css";
      } else {
        toggleDarkModeButton.textContent = "Dark Mode";
        theme.href = "light.css";
      }
    });
  }
}

export { setupDarkMode };
