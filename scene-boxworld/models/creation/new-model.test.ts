import { pointWith } from "../../../math/point.js";
import { rigidTransformWith } from "../../../math/rigid-transform.js";
import { IDENTITY_UNIT_QUATERNION } from "../../../math/unit-quaternion.js";
import { addTag } from "./add-tag.js";
import { newModel } from "./new-model.js";
import { pushTransform } from "./push-transform.js";

describe("newModel", () => {
  it("creates empty model", () => {
    const model = newModel(() => {});
    expect(model).toMatchSnapshot();
  });

  it("creates tag model", () => {
    const model = newModel<string>((context) => {
      addTag(context, "tag");
    });
    expect(model).toMatchSnapshot();
  });

  it("creates two models", () => {
    const model = newModel<string>((context) => {
      addTag(context, "tag1");
      addTag(context, "tag2");
    });
    expect(model).toMatchSnapshot();
  });

  it("creates transformed model", () => {
    const model = newModel<string>((context) => {
      pushTransform(
        context,
        rigidTransformWith(IDENTITY_UNIT_QUATERNION, pointWith(1.0, 0.0, 0.0)),
      );
      addTag(context, "tag");
    });
    expect(model).toMatchSnapshot();
  });

  it("creates two transformed models", () => {
    const model = newModel<string>((context) => {
      pushTransform(
        context,
        rigidTransformWith(IDENTITY_UNIT_QUATERNION, pointWith(1.0, 0.0, 0.0)),
      );
      addTag(context, "tag1");
      addTag(context, "tag2");
    });
    expect(model).toMatchSnapshot();
  });

  it("creates nested transforms", () => {
    const model = newModel<string>((context) => {
      pushTransform(
        context,
        rigidTransformWith(IDENTITY_UNIT_QUATERNION, pointWith(1.0, 0.0, 0.0)),
      );
      pushTransform(
        context,
        rigidTransformWith(IDENTITY_UNIT_QUATERNION, pointWith(0.0, 1.0, 0.0)),
      );
      addTag(context, "tag");
    });
    expect(model).toMatchSnapshot();
  });
});
