var playStartSound = function () {
  var e = document.getElementById("start");
  var joystickZone = document.getElementById("joystick-zone");

  if (e) {
    e.currentTime = 0;

    e.addEventListener("ended", function () {
      if (joystickZone) {
        joystickZone.style.opacity = "1";
        joystickZone.style.pointerEvents = "auto";
      }
    }, { once: true });

    e.play().catch(() => {
      // fallback if audio autoplay is blocked
      if (joystickZone) {
        joystickZone.style.opacity = "1";
        joystickZone.style.pointerEvents = "auto";
      }
    });
  }
};

window.addEventListener("load", function () {
  setTimeout(playStartSound, 3500);
});
