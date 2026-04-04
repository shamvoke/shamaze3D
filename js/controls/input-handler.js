/**
 * Keyboard and Touch input handling for Shamaze3D.
 */

var keyAxis = [0, 0];

/**
 * Updates the movement axis based on input.
 * @param {Array} e - The new axis values.
 */
function onMoveKey(e) {
  keyAxis = e.slice(0);
}

// Touch indicator logic
const indicator = document.getElementById("touch-indicator");

if (indicator) {
    document.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        indicator.style.left = touch.clientX + "px";
        indicator.style.top = touch.clientY + "px";
        indicator.style.display = "block";
    });

    document.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        indicator.style.left = touch.clientX + "px";
        indicator.style.top = touch.clientY + "px";
    });

    document.addEventListener("touchend", () => {
        indicator.style.display = "none";
    });

    document.addEventListener("touchcancel", () => {
        indicator.style.display = "none";
    });
}

// Disable context menu to prevent interference with controls
document.addEventListener("contextmenu", e => e.preventDefault());
