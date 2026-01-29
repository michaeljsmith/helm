import { dotProduct, dotProduct2 } from "./dot-product.js";
import { Offset, Offset2 } from "./offset.js";

export const vectorSizeSquared = (v: Offset): number => dotProduct(v, v);

export const vectorSize2Squared = (v: Offset2): number => dotProduct2(v, v);
