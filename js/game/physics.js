/**
 * Physics engine management for Shamaze3D.
 * Relies on Box2dWeb.min.js.
 */

var b2World = Box2D.Dynamics.b2World,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Settings = Box2D.Common.b2Settings,
    b2Vec2 = Box2D.Common.Math.b2Vec2,
    wWorld,
    wBall;

/**
 * Initializes the Box2D physics world and the maze boundaries.
 */
function createPhysicsWorld() {
  wWorld = new b2World(new b2Vec2(0, 0), !0);
  var e = new b2BodyDef();
  (e.type = b2Body.b2_dynamicBody),
    e.position.Set(1, 1),
    (wBall = wWorld.CreateBody(e));
  var i = new b2FixtureDef();
  (i.density = 1),
    (i.friction = 0),
    (i.restitution = 0.6),
    (i.shape = new b2CircleShape(ballRadius)),
    wBall.CreateFixture(i),
    (e.type = b2Body.b2_staticBody),
    (i.shape = new b2PolygonShape()),
    i.shape.SetAsBox(0.5, 0.5);
  for (var t = 0; t < maze.dimension; t++)
    for (var n = 0; n < maze.dimension; n++)
      maze[t][n] &&
        ((e.position.x = t),
          (e.position.y = n),
          wWorld.CreateBody(e).CreateFixture(i));
  var listener = new Box2D.Dynamics.b2ContactListener();
  listener.BeginContact = function (contact) {
    var bodyA = contact.GetFixtureA().GetBody();
    var bodyB = contact.GetFixtureB().GetBody();
    if (bodyA === wBall || bodyB === wBall) {
      var velocity = wBall.GetLinearVelocity().Length();
      if (velocity > 4.5) {
        var hitSound = document.getElementById("hit");
        if (hitSound) {
            hitSound.currentTime = 0;
            hitSound.play();
        }
      }
    }
  };
  wWorld.SetContactListener(listener);
}

/**
 * Updates the physics simulation for the current frame.
 */
function updatePhysicsWorld() {
  var e = wBall.GetLinearVelocity();
  e.Multiply(0.96), wBall.SetLinearVelocity(e);
  var i = new b2Vec2(
    keyAxis[0] * wBall.GetMass() * 0.28,
    keyAxis[1] * wBall.GetMass() * 0.28
  );
  wBall.ApplyImpulse(i, wBall.GetPosition()),
    (keyAxis = [0, 0]),
    wWorld.Step(1 / 60, 8, 3);
}
