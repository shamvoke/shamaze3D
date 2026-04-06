class JoystickController {
  constructor(stickID, maxDistance, deadzone) {
    this.id = stickID;
    this.stick = document.getElementById(stickID);
    this.base = document.getElementById("joystick-base");
    this.zone = document.getElementById("joystick-zone");

    this.maxDistance = maxDistance;
    this.deadzone = deadzone;

    this.dragStart = null;
    this.touchId = null;
    this.active = false;
    this.value = { x: 0, y: 0 };

    // remember original base position (home position)
    this.homeRight = this.base.style.right || "0px";
    this.homeBottom = this.base.style.bottom || "0px";

    // base center inside its own box
    this.baseRadius = 64;

    let self = this;

    function getEventPosition(event) {
      if (event.changedTouches) {
        for (let i = 0; i < event.changedTouches.length; i++) {
          if (self.touchId === null || self.touchId === event.changedTouches[i].identifier) {
            return {
              x: event.changedTouches[i].clientX,
              y: event.changedTouches[i].clientY,
              id: event.changedTouches[i].identifier
            };
          }
        }
        return null;
      } else {
        return {
          x: event.clientX,
          y: event.clientY,
          id: null
        };
      }
    }

    function isInsideZone(x, y) {
      const rect = self.zone.getBoundingClientRect();
      return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );
    }

    function moveBaseTo(x, y) {
      const zoneRect = self.zone.getBoundingClientRect();

      // place base centered under finger, clamped inside zone
      let newLeft = x - zoneRect.left - self.baseRadius;
      let newTop = y - zoneRect.top - self.baseRadius;

      const maxLeft = zoneRect.width - 128;
      const maxTop = zoneRect.height - 128;

      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      self.base.style.left = `${newLeft}px`;
      self.base.style.top = `${newTop}px`;
      self.base.style.right = "auto";
      self.base.style.bottom = "auto";
    }

    function handleDown(event) {
      event.preventDefault();

      const pos = getEventPosition(event);
      if (!pos) return;

      if (!isInsideZone(pos.x, pos.y)) return;

      self.active = true;
      self.touchId = pos.id;

      // move base to touch point (SEMI behavior)
      moveBaseTo(pos.x, pos.y);

      self.dragStart = { x: pos.x, y: pos.y };

      self.stick.style.transition = "0s";
    }

    function handleMove(event) {
      if (!self.active) return;

      const pos = getEventPosition(event);
      if (!pos) return;

      const xDiff = pos.x - self.dragStart.x;
      const yDiff = pos.y - self.dragStart.y;
      const angle = Math.atan2(yDiff, xDiff);
      const distance = Math.min(self.maxDistance, Math.hypot(xDiff, yDiff));

      const xPosition = distance * Math.cos(angle);
      const yPosition = distance * Math.sin(angle);

      // move red stick
      self.stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;

      // deadzone adjustment
      const distance2 =
        distance < self.deadzone
          ? 0
          : self.maxDistance / (self.maxDistance - self.deadzone) * (distance - self.deadzone);

      const xPosition2 = distance2 * Math.cos(angle);
      const yPosition2 = distance2 * Math.sin(angle);

      const xPercent = parseFloat((xPosition2 / self.maxDistance).toFixed(4));
      const yPercent = parseFloat((yPosition2 / self.maxDistance).toFixed(4));

      self.value = { x: xPercent, y: yPercent };
    }

    function handleUp(event) {
      if (!self.active) return;

      if (event.changedTouches) {
        let valid = false;
        for (let i = 0; i < event.changedTouches.length; i++) {
          if (event.changedTouches[i].identifier === self.touchId) {
            valid = true;
            break;
          }
        }
        if (!valid) return;
      }

      // reset thumb
      self.stick.style.transition = ".2s";
      self.stick.style.transform = `translate3d(0px, 0px, 0px)`;

      // clean reset
      self.value = { x: 0, y: 0 };
      self.touchId = null;
      self.active = false;

      setTimeout(() => {
        self.base.style.transition = "0s";
      }, 200);
    }

    this.zone.addEventListener("mousedown", handleDown);
    this.zone.addEventListener("touchstart", handleDown, { passive: false });

    document.addEventListener("mousemove", handleMove, { passive: false });
    document.addEventListener("touchmove", handleMove, { passive: false });

    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchend", handleUp);
  }
}

setTimeout(() => {
  const joystickZone = document.getElementById("joystick-zone");
  joystickZone.style.opacity = "1";
  joystickZone.style.pointerEvents = "auto";
}, 3600);

let joystick1 = new JoystickController("stick1", 64, 8);

function updateJoystick() {
  if (joystick1.active) {
    keyAxis[0] = joystick1.value.x > 0.5 ? 1 : (joystick1.value.x < -0.5 ? -1 : 0);
    keyAxis[1] = joystick1.value.y > 0.5 ? -1 : (joystick1.value.y < -0.5 ? 1 : 0);
  } else {
    keyAxis[0] = 0;
    keyAxis[1] = 0;
  }
}

function loop() {
  requestAnimationFrame(loop);
  updateJoystick();
}

loop();