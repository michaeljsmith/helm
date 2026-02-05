import { directionWith } from "../math/direction.js";
import { vectorAdd } from "../math/vector-add.js";
import { vectorScale } from "../math/vector-scale.js";
import { PhysicsBody } from "./physics-body.js";

export const updatePhysics = (dt: number, bodies: PhysicsBody[]): void => {
  for (const body of bodies) {
    updatePhysicsBody(dt, body);
  }
};

const updatePhysicsBody = (dt: number, body: PhysicsBody): void => {
  const SPEED = 0.5;
  const DIRECTION = directionWith(0, 0, -1);
  const VELOCITY = vectorScale(DIRECTION, SPEED);

  const { position } = body.dynamics.value;
  const newPosition = vectorAdd(position, vectorScale(VELOCITY, dt));
  body.dynamics.set({ ...body.dynamics.value, position: newPosition });
};
