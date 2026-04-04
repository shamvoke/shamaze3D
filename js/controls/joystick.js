/**
 * Virtual joystick controller for Shamaze3D.
 */

class JoystickController {
  constructor(e, i, t) {
    this.id = e;
    let n = document.getElementById(e);
    let joystickContainer = document.getElementById("shamstick"); 
    (this.dragStart = null),
      (this.touchId = null),
      (this.active = !1),
      (this.value = { x: 0, y: 0 });
    let a = this;

    function o(e) {
      if (e.type === 'touchstart' || (e.type === 'mousedown' && e.button === 0)) {
        // e.preventDefault(); // Moved to conditional to avoid issues with other buttons
        if (e.target.closest('#settings-button') || e.target.closest('.modal')) return;

        a.active = true;
        n.style.transition = "0s";
        joystickContainer.style.transition = "0s";

        let clientX, clientY;
        if (e.changedTouches) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
          a.touchId = e.changedTouches[0].identifier;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        a.dragStart = { x: clientX, y: clientY };
        joystickContainer.style.display = "flex";
        joystickContainer.style.opacity = "1"; 
        joystickContainer.style.left = `${clientX - joystickContainer.offsetWidth / 2}px`;
        joystickContainer.style.top = `${clientY - joystickContainer.offsetHeight / 2}px`;
      }
    }

    function s(e) {
      if (!a.active) return;
      let o = null;
      if (e.changedTouches) {
        for (let i = 0; i < e.changedTouches.length; i++)
          a.touchId == e.changedTouches[i].identifier &&
            ((o = i),
              (e.clientX = e.changedTouches[i].clientX),
              (e.clientY = e.changedTouches[i].clientY));
        if (null == o) return;
      }
      const s = e.clientX - a.dragStart.x,
        r = e.clientY - a.dragStart.y,
        l = Math.atan2(r, s),
        d = Math.min(i, Math.hypot(s, r)),
        c = d * Math.cos(l),
        h = d * Math.sin(l);
      n.style.transform = `translate3d(${c}px, ${h}px, 0px)`;
      const m = Math.min(d, i); 
        const u = m * Math.cos(l),
        p = m * Math.sin(l),
        y = parseFloat((u / i).toFixed(4)),
        x = parseFloat((p / i).toFixed(4));
      a.value = { x: y, y: x };
    }

    function r(e) {
      if (a.active) {
        if (e.changedTouches && a.touchId != e.changedTouches[0].identifier) {
          return;
        }
        n.style.transition = ".2s";
        n.style.transform = "translate3d(0px, 0px, 0px)";
        a.value = { x: 0, y: 0 };
        a.touchId = null;
        a.active = false;

        joystickContainer.style.transition = "opacity 0.3s ease-out";
        joystickContainer.style.opacity = "0";
        setTimeout(() => {
          if (!a.active) {
            joystickContainer.style.display = "none";
          }
        }, 300);
      }
    }

    document.addEventListener("mousedown", o); 
    document.addEventListener("touchstart", o, { passive: false });
    document.addEventListener("mousemove", s, { passive: false });
    document.addEventListener("touchmove", s, { passive: false });
    document.addEventListener("mouseup", r);
    document.addEventListener("touchend", r);
  }
}

// Global joystick instance
let joystick = new JoystickController("shamstickgear", 15, 2);
document.getElementById("shamstick").style.display = "none";

/**
 * Polls the joystick value and updates the global keyAxis.
 */
function updateJoystick() {
  if (joystick.active) {
    if (joystick.value.x > 0.5) {
      keyAxis[0] = 1;
    } else if (joystick.value.x < -0.5) {
      keyAxis[0] = -1;
    } else {
      keyAxis[0] = 0;
    }

    if (joystick.value.y > 0.5) {
      keyAxis[1] = -1;
    } else if (joystick.value.y < -0.5) {
      keyAxis[1] = 1;
    } else {
      keyAxis[1] = 0;
    }
  }
  requestAnimationFrame(updateJoystick);
}

updateJoystick();
