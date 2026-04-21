document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("state-input");
  const button = document.getElementById("fetch-button"); // must match test ID
  const displayDiv = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  button.addEventListener("click", async () => {
    const state = input.value.trim();
    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    try {
      // Clear any previous error
      errorDiv.classList.add("hidden");
      errorDiv.textContent = "";

      // Fetch alerts
      const response = await fetch(url);
      const data = await response.json();

      // Display alerts
      displayDiv.innerHTML = `Weather Alerts: ${data.features.length}`;
      data.features.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        displayDiv.appendChild(p);
      });

      // Clear input field
      input.value = "";

    } catch (error) {
      // Show error message
      errorDiv.classList.remove("hidden");
      errorDiv.textContent = `Network issue: ${error.message}`;
    }
  });
});
