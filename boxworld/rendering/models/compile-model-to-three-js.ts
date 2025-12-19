import {
  BufferAttribute,
  BufferGeometry,
  Material,
  MeshPhongMaterial,
} from "three";
import { Model } from "../../models/model.js";
import { compileModel } from "./compile-model.js";

const material = new MeshPhongMaterial({ color: 0x00ff00 });

export const compileModelToThreeJs = (
  model: Model<unknown>,
): { geometry: BufferGeometry; material: Material } => {
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
  return { geometry, material };
};
