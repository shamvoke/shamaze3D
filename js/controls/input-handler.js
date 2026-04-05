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

// Disable context menu to prevent interference with controls
document.addEventListener("contextmenu", e => e.preventDefault());