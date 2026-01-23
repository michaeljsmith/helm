import { ArtifactSet } from "./boxworld/artifact-set.js";
import { Artifact } from "./boxworld/artifacts/artifact.js";
import { Camera } from "./boxworld/camera.js";
import { color3With } from "./boxworld/color.js";
import { flat } from "./boxworld/maps/layers/flat-layout.js";
import { slope } from "./boxworld/maps/layers/slope-layout.js";
import { applyLayout } from "./boxworld/maps/layouts/apply-layout.js";
import { fixed, series } from "./boxworld/maps/layouts/layout.js";
import { chunksForTerrain } from "./boxworld/maps/terrain/chunks-for-terrain.js";
import { terrain } from "./boxworld/maps/terrain/terrain-from-layers.js";
import { Terrain } from "./boxworld/maps/terrain/terrain.js";
import { addModel } from "./boxworld/models/creation/add-model.js";
import { newModel } from "./boxworld/models/creation/new-model.js";
import { aabDimensionsWith } from "./math/aab-dimensions.js";
import { direction2With } from "./math/direction.js";
import { pointWith } from "./math/point.js";
import { IDENTITY_RIGID, rigidTransformWith } from "./math/rigid-transform.js";
import { rotationAroundY } from "./math/rotation-around-axis.js";

const terrains = [
  ...applyLayout(
    terrain(
      series([
        fixed([2, 2], flat(-1)),
        fixed([2, 2], slope(-1, 0, direction2With(0, -1))),
        fixed([2, 2], flat(0)),
      ]),
    ),
  ),
];

const model = newModel((context) => {
  addModel(context, {
    type: "box-model",
    color: color3With(255, 255, 0),
    dimensions: aabDimensionsWith(1, 1, 1),
  });
});

export const world = (): ArtifactSet => {
  const artifacts: Iterable<Artifact> = [
    ...artifactsForTerrain(terrains),
    {
      type: "model-instance-artifact",
      instance: {
        model,
        transform: IDENTITY_RIGID,
      },
    },
  ];

  const cameraRotation = rotationAroundY((-1 * Math.PI) / 4);
  const cameraPosition = pointWith(-2.0, 1.0, 2.0);

  const camera: Camera = {
    transform: rigidTransformWith(cameraRotation, cameraPosition),
  };
  return {
    camera,
    artifacts,
  };
};

const artifactsForTerrain = function* (
  terrains: Iterable<Terrain>,
): Iterable<Artifact> {
  for (const terrain of terrains) {
    for (const chunkBounds of chunksForTerrain(terrain.bounds)) {
      yield {
        type: "terrain-chunk-artifact",
        chunk: { terrain, bounds: chunkBounds },
      };
    }
  }
};
