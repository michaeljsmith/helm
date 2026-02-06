import { vectorAdd } from "../math/vector-add.js";
import { vectorScale } from "../math/vector-scale.js";
import { PhysicsBody } from "./physics-body.js";

export const updatePhysics = (dt: number, bodies: PhysicsBody[]): void => {
  for (const body of bodies) {
    updatePhysicsBody(dt, body);
  }
};

const updatePhysicsBody = (dt: number, body: PhysicsBody): void => {
  const { position, velocity } = body.dynamics.value;
  const newPosition = vectorAdd(position, vectorScale(velocity, dt));
  body.dynamics.set({ ...body.dynamics.value, position: newPosition });
};
