/**
 * UI and Settings management for Shamaze3D.
 */

const settingsModal = document.getElementById("settings-modal");
const settingsButton = document.getElementById("settings-button");
const closeSettingsButton = document.getElementById("close-settings-button");
const resetBtn = document.getElementById("resetBtn");
const joystickZone = document.getElementById("joystick-zone");

function toggleJoystick(show) {
  joystickZone.style.opacity = show ? "1" : "0";
  joystickZone.style.pointerEvents = show ? "auto" : "none";
}

/**
 * Confirms with the user before resetting the high score.
 * @param {Event} event - The click event.
 */
function confirmReset(event) {
  event.preventDefault();
  if (confirm("Are you sure you want to reset your high score?")) {
    resetHighScore();
  }
  return false;
}

/**
 * Resets the high score in local storage and updates the UI.
 */
function resetHighScore() {
  localStorage.removeItem("highScore");
  $("#highScore").html("High Score cleared!");
}

// Event Listeners
if (resetBtn) {
    resetBtn.addEventListener("click", confirmReset);
}

if (settingsButton) {
    settingsButton.addEventListener("click", () => {
        settingsModal.style.display = "block";
        toggleJoystick(false);
    });
}

if (closeSettingsButton) {
    closeSettingsButton.addEventListener("click", () => {
        settingsModal.style.display = "none";
        toggleJoystick(true);
    });
}

window.addEventListener("click", (event) => {
    if (event.target == settingsModal) {
        settingsModal.style.display = "none";
        toggleJoystick(true);
    }
});
