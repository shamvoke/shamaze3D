/**
 * Global variables for Shamaze3D.
 * These are shared across multiple modules.
 */

var camera,
    scene,
    renderer,
    light,
    mouseX,
    mouseY,
    maze,
    mazeMesh,
    mazeDimension = 11,
    planeMesh,
    ballMesh,
    ballRadius = 0.25,
    gameState;

// keyAxis is defined in input-handler.js but used here too. 
// We'll declare it there and ensure it's global.
