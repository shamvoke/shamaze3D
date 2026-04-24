/**
 * Rendering management for Shamaze3D.
 * Relies on Three.js.
 */

var ballImage = new Image();
ballImage.src = 'img/ball.webp';
var floorImage = new Image();
floorImage.src = 'img/concrete.webp';
var brickImage = new Image();
brickImage.src = 'img/Brick.webp';

var ballTexture = new THREE.Texture(ballImage);
var floorTexture = new THREE.Texture(floorImage);
var brickTexture = new THREE.Texture(brickImage);

ballTexture.needsUpdate = true;
floorTexture.needsUpdate = true;
brickTexture.needsUpdate = true;

/**
 * Generates the 3D mesh for the maze based on its 2D representation.
 * @param {Array} e - The 2D maze array.
 * @returns {THREE.Mesh} The combined mesh for the maze.
 */
function generate_maze_mesh(e) {
  for (var i = new THREE.Geometry(), t = 0; t < e.dimension; t++)
    for (var n = 0; n < e.dimension; n++)
      if (e[t][n]) {
        var a = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1),
          o = new THREE.Mesh(a);
        (o.position.x = t),
          (o.position.y = n),
          (o.position.z = 0.5),
          THREE.GeometryUtils.merge(i, o);
      }
  var s = new THREE.MeshPhongMaterial({ map: brickTexture });
  return new THREE.Mesh(i, s);
}

/**
 * Initializes the Three.js scene, camera, lights, and objects.
 */
function createRenderWorld() {
  (scene = new THREE.Scene()),
    (light = new THREE.PointLight(16777215, 1)).position.set(1, 1, 1.3),
    scene.add(light),
    (g = new THREE.SphereGeometry(ballRadius, 32, 16)),
    (m = new THREE.MeshPhongMaterial({ map: ballTexture })),
    (ballMesh = new THREE.Mesh(g, m)).position.set(1, 1, ballRadius),
    scene.add(ballMesh);
  var e = window.innerWidth / window.innerHeight;
  (camera = new THREE.PerspectiveCamera(63, e, 1, 1e3)).position.set(
    1,
    1,
    5
  ),
    scene.add(camera),
    (mazeMesh = generate_maze_mesh(maze)),
    scene.add(mazeMesh),
    (g = new THREE.PlaneGeometry(
      10 * mazeDimension,
      10 * mazeDimension,
      mazeDimension,
      mazeDimension
    )),
    (floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping),
    floorTexture.repeat.set(5 * mazeDimension, 5 * mazeDimension),
    (m = new THREE.MeshPhongMaterial({ map: floorTexture })),
    (planeMesh = new THREE.Mesh(g, m)).position.set(
      (mazeDimension - 1) / 2,
      (mazeDimension - 1) / 2,
      0
    ),
    planeMesh.rotation.set(Math.PI / 2, 0, 0),
    scene.add(planeMesh);
}

/**
 * Updates the 3D scene based on physics data and camera interpolation.
 */
function updateRenderWorld() {
  var e = wBall.GetPosition().x - ballMesh.position.x,
    i = wBall.GetPosition().y - ballMesh.position.y;
  (ballMesh.position.x += e), (ballMesh.position.y += i);
  var t = new THREE.Matrix4();
  t.makeRotationAxis(new THREE.Vector3(0, 1, 0), e / ballRadius),
    t.multiplySelf(ballMesh.matrix),
    (ballMesh.matrix = t),
    (t = new THREE.Matrix4()).makeRotationAxis(
      new THREE.Vector3(1, 0, 0),
      -i / ballRadius
    ),
    t.multiplySelf(ballMesh.matrix),
    (ballMesh.matrix = t),
    ballMesh.rotation.getRotationFromMatrix(ballMesh.matrix),
    (camera.position.x +=
      0.1 * (ballMesh.position.x - camera.position.x)),
    (camera.position.y +=
      0.1 * (ballMesh.position.y - camera.position.y)),
    (camera.position.z += 0.1 * (5 - camera.position.z)),
    (light.position.x = camera.position.x),
    (light.position.y = camera.position.y),
    (light.position.z = camera.position.z - 3.3);
}

/**
 * Handles window resize events.
 */
function onResize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    renderer.setSize(window.innerWidth * dpr, window.innerHeight * dpr, false);
    renderer.domElement.style.width = window.innerWidth + "px";
    renderer.domElement.style.height = window.innerHeight + "px";

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
