/**
 * UI and Settings management for Shamaze3D.
 */

const settingsModal = document.getElementById("settings-modal");
const settingsButton = document.getElementById("settings-button");
const closeSettingsButton = document.getElementById("close-settings-button");
const resetBtn = document.getElementById("resetBtn");

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
    });
}

if (closeSettingsButton) {
    closeSettingsButton.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });
}

window.addEventListener("click", (event) => {
    if (event.target == settingsModal) {
        settingsModal.style.display = "none";
    }
});

/**
 * jQuery helper to center elements.
 */
(jQuery.fn.centerv = function () {
  return (
    (wh = window.innerHeight),
    (h = this.outerHeight()),
    this.css("position", "absolute"),
    this.css("top", Math.max(0, (wh - h) / 2) + "px"),
    this
  );
}),
  (jQuery.fn.centerh = function () {
    return (
      (ww = window.innerWidth),
      (w = this.outerWidth()),
      this.css("position", "absolute"),
      this.css("left", Math.max(0, (ww - w) / 2) + "px"),
      this
    );
  }),
  (jQuery.fn.center = function () {
    return this.centerv(), this.centerh(), this;
  });
