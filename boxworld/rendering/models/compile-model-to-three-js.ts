import { BufferAttribute, BufferGeometry } from "three";
import { Model } from "../../models/model.js";
import { compileModel } from "./compile-model.js";

export const compileModelToThreeJs = (
  model: Model<unknown>,
): BufferGeometry => {
  const results = compileModel(model);

  const geometry = new BufferGeometry();
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(results.positions), 3),
  );
  geometry.setAttribute(
    "normal",
    new BufferAttribute(new Float32Array(results.normals), 3),
  );
  geometry.setAttribute(
    "color",
    new BufferAttribute(new Float32Array(results.colors), 3),
  );
  geometry.setIndex(results.indices);
  return geometry;
};
