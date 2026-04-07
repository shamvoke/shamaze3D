/**
 * Main game engine for Shamaze3D.
 * Orchestrates physics, rendering, and game state.
 */

var doneSound = document.getElementById("done");

/**
 * The main game loop, called via requestAnimationFrame.
 */
function gameLoop() {
  switch (gameState) {
    case "initialize":
      ((maze = generateSquareMaze(mazeDimension))[mazeDimension - 1][
        mazeDimension - 2
      ] = !1),
        createPhysicsWorld(),
        createRenderWorld(),
        camera.position.set(5, 5, 20),
        light.position.set(1, 1, 9),
        (light.intensity = 0);
      var e = Math.floor((mazeDimension - 1) / 2 - 4);
      $("#level").html("Level: " + e);
      var highScore = localStorage.getItem("highScore");
      if (highScore === null) {
        highScore = e;
      } else {
        highScore = parseInt(highScore);
        if (e > highScore) {
          highScore = e;
        }
      }
      localStorage.setItem("highScore", highScore);
      $("#highScore").html("Level " + highScore);
      gameState = "fade in";
      break;
    case "fade in":
      (light.intensity += 0.1 * (1 - light.intensity)),
        renderer.render(scene, camera),
        Math.abs(light.intensity - 1) < 0.05 &&
        ((light.intensity = 1.2), (gameState = "play"));
      break;
    case "play":
      updatePhysicsWorld();
      updateRenderWorld();
      renderer.render(scene, camera);
      var i = Math.floor(ballMesh.position.x + 0.5);
      var t = Math.floor(ballMesh.position.y + 0.5);
      if (i == mazeDimension && t == mazeDimension - 2) {
        if (doneSound) {
            doneSound.currentTime = 0;
            doneSound.play();
        }
        mazeDimension += 2;
        gameState = "fade out";
      }
      break;
    case "fade out":
      updatePhysicsWorld(),
        updateRenderWorld(),
        (light.intensity += 0.1 * (0 - light.intensity)),
        renderer.render(scene, camera),
        Math.abs(light.intensity - 0) < 0.1 &&
        ((light.intensity = 0),
          renderer.render(scene, camera),
          (gameState = "initialize"));
  }
  requestAnimationFrame(gameLoop);
}

// Initialization on document ready
$(document).ready(function () {
    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(window.innerWidth * dpr, window.innerHeight * dpr, false);

    renderer.domElement.style.width = window.innerWidth + "px";
    renderer.domElement.style.height = window.innerHeight + "px";

    // Bind controls
    if (window.KeyboardJS) {
        KeyboardJS.bind.axis("left", "right", "down", "up", onMoveKey);
        KeyboardJS.bind.axis("a", "d", "s", "w", onMoveKey);
    }

    $(window).resize(onResize);

    // Start the game
    gameState = "initialize";
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, 1800);
});
