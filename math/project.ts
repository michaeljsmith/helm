import { dotProduct2 } from "./dot-product.js";
import { Offset2 } from "./offset.js";
import { Vector2 } from "./vector.js";

// These functions exist because many applications of dot products don't make
// sense with Points - e.g. it doesn't usually make sense to compute a dot product
// of two Points. However, in the case of projecting along a normal, e.g. computing
// the distance from a plane, it can make sense to compute the dot product of a
// point and a normal. To help make the semantics clear this function was given a
// different name.
// TODO: Maybe other use cases of dot products should be given their own name?

export function project2(offset: Offset2, vector: Vector2): number {
  return dotProduct2(offset, vector as unknown as Offset2);
}
