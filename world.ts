import { Artifact } from "./boxworld/artifacts/artifact.js";
import { color3With } from "./boxworld/color.js";
import { addModel } from "./boxworld/models/creation/add-model.js";
import { newModel } from "./boxworld/models/creation/new-model.js";
import { aabDimensionsWith } from "./math/aab-dimensions.js";
import { IDENTITY_RIGID } from "./math/rigid-transform.js";

const model = newModel((context) => {
  addModel(context, {
    type: "box-model",
    color: color3With(255, 255, 0),
    dimensions: aabDimensionsWith(1, 1, 1),
  });
});

export const world = (): Iterable<Artifact> => [
  {
    type: "model-instance-artifact",
    instance: {
      model,
      transform: IDENTITY_RIGID,
    },
  },
];
