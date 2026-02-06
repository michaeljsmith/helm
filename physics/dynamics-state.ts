import { Offset } from "../math/offset.js";
import { Point } from "../math/point.js";

export type DynamicsState = {
  position: Point;
  velocity: Offset;
};
