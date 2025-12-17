import { Direction, directionWith } from "./direction.js";

export const directionNegate = (direction: Direction): Direction =>
  directionWith(-direction[0], -direction[1], -direction[2]);
