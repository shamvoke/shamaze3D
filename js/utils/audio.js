/**
 * Audio handling for Shamaze3D.
 */

var rollSound = document.getElementById("roll");
var rolling = false;

/**
 * Adjusts the roll sound pitch and volume based on speed.
 * @param {number} speed - Current velocity of the ball.
 */
function adjustSound(speed) {
  var minSpeed = 0.5;
  var maxSpeed = 4.5;
  var minPitch = 0.5;
  var maxPitch = 2.0;
  var minVolume = 0.1;
  var maxVolume = 1.0;
  var pitch = mapRange(speed, minSpeed, maxSpeed, minPitch, maxPitch);
  var volume = mapRange(speed, minSpeed, maxSpeed, minVolume, maxVolume);
  rollSound.playbackRate = pitch;
  rollSound.volume = volume;
}

/**
 * Plays the rolling sound.
 */
function playRollSound() {
  rollSound.currentTime = 0;
  rollSound.play();
}

/**
 * Stops the rolling sound.
 */
function stopRollSound() {
  rollSound.pause();
  rollSound.currentTime = 0;
}

/**
 * Plays the level start sound.
 */
var playStartSound = function () {
  var e = document.getElementById("start");
  if (e) {
    e.currentTime = 0;
    e.play();
  }
};

// Initial startup audio setup
window.addEventListener('load', function() {
    setTimeout(playStartSound, 3500);
});
