/**
 * Keyboard and Touch input handling for Shamaze3D.
 */

var keyAxis = [0, 0];
var keyboardActive = false;

document.addEventListener("keydown", function (e) {
  keyboardActive = true;
});

document.addEventListener("keyup", function () {
  keyboardActive = false;
});

/**
 * Updates the movement axis based on input.
 * @param {Array} e - The new axis values.
 */
function onMoveKey(e) {
  keyAxis = e.slice(0);
}

document.addEventListener("contextmenu", e => e.preventDefault());