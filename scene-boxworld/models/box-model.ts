import { AabDimensions } from "../../math/aab-dimensions.js";
import { Color3 } from "../color.js";

export type BoxModel = {
  type: "box-model";
  dimensions: AabDimensions;
  color: Color3;
};
