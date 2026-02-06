import { Direction, directionWith } from "./direction.js";

export function directionNegate(direction: Direction): Direction {
  return directionWith(-direction[0], -direction[1], -direction[2]);
}
