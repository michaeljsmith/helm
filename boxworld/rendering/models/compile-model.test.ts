import { aabDimensionsWith } from "../../../math/aab-dimensions.js";
import { pointWith } from "../../../math/point.js";
import { rigidTransformWith } from "../../../math/rigid-transform.js";
import { IDENTITY_UNIT_QUATERNION } from "../../../math/unit-quaternion.js";
import { color3With } from "../../color.js";
import { addModel } from "../../models/creation/add-model.js";
import { newModel } from "../../models/creation/new-model.js";
import { pushTransform } from "../../models/creation/push-transform.js";
import { compileModel } from "./compile-model.js";

describe("newModel", () => {
  it("compiles box", () => {
    const model = newModel((context) =>
      addModel(context, {
        type: "box-model",
        color: color3With(255, 255, 0),
        dimensions: aabDimensionsWith(2, 4, 6),
      }),
    );
    const results = compileModel(model);
    expect(results).toMatchSnapshot();
  });

  it("compiles transform", () => {
    const model = newModel((context) => {
      pushTransform(
        context,
        rigidTransformWith(IDENTITY_UNIT_QUATERNION, pointWith(1.0, 0.0, 0.0)),
      );
      addModel(context, {
        type: "box-model",
        color: color3With(255, 255, 0),
        dimensions: aabDimensionsWith(1, 1, 1),
      });
    });
    const results = compileModel(model);
    expect(results).toMatchSnapshot();
  });

  it("compiles union", () => {
    const model = newModel((context) => {
      addModel(context, {
        type: "box-model",
        color: color3With(255, 255, 0),
        dimensions: aabDimensionsWith(1, 1, 1),
      });
      pushTransform(
        context,
        rigidTransformWith(IDENTITY_UNIT_QUATERNION, pointWith(1.0, 0.0, 0.0)),
      );
      addModel(context, {
        type: "box-model",
        color: color3With(255, 255, 0),
        dimensions: aabDimensionsWith(1, 1, 1),
      });
    });
    const results = compileModel(model);
    expect(results).toMatchSnapshot();
  });
});
