import { dotProduct2 } from "./dot-product.js";
import { Offset2 } from "./offset.js";

export const vectorSize2Squared = (v: Offset2): number => dotProduct2(v, v);
