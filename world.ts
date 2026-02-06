import { ArtifactSet } from "./boxworld/artifact-set.js";
import { Artifact } from "./boxworld/artifacts/artifact.js";
import { Camera } from "./boxworld/camera.js";
import { color3With } from "./boxworld/color.js";
import { noise } from "./boxworld/maps/layers/noise-layout.js";
import { applyLayout } from "./boxworld/maps/layouts/apply-layout.js";
import { fixed, series } from "./boxworld/maps/layouts/layout.js";
import { chunksForTerrain } from "./boxworld/maps/terrain/chunks-for-terrain.js";
import { terrain } from "./boxworld/maps/terrain/terrain-from-layers.js";
import { Terrain } from "./boxworld/maps/terrain/terrain.js";
import { addModel } from "./boxworld/models/creation/add-model.js";
import { newModel } from "./boxworld/models/creation/new-model.js";
import { aabDimensionsWith } from "./math/aab-dimensions.js";
import { directionWith } from "./math/direction.js";
import { Offset } from "./math/offset.js";
import { Point, pointWith } from "./math/point.js";
import { rigidTransformWith } from "./math/rigid-transform.js";
import { rotationAroundY } from "./math/rotation-around-axis.js";
import { IDENTITY_UNIT_QUATERNION } from "./math/unit-quaternion.js";

const terrains = [
  ...applyLayout(
    terrain(
      series([
        fixed(
          [32, 32],
          noise(25, [
            { frequency: 1.0 / 8, amplitude: 1.2 },
            { frequency: 1.0 / 4, amplitude: 0.6 },
            { frequency: 1.0 / 2, amplitude: 0.3 },
          ]),
        ),
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

type Creature = {
  position: Point;
  velocity: Offset;
};

type WorldState = {
  creatures: Creature[];
};

export function newWorld(): WorldState {
  return {
    creatures: [
      {
        position: pointWith(0, 2, -2),
        velocity: directionWith(0, 0, -0.5),
      },
    ],
  };
}

export function world(state: WorldState): ArtifactSet {
  const artifacts: Iterable<Artifact> = [
    ...artifactsForTerrain(terrains),
    ...artifactsForCreatures(state.creatures),
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
}

function* artifactsForTerrain(terrains: Iterable<Terrain>): Iterable<Artifact> {
  for (const terrain of terrains) {
    for (const chunkBounds of chunksForTerrain(terrain.bounds)) {
      yield {
        type: "terrain-chunk-artifact",
        chunk: { terrain, bounds: chunkBounds },
      };
    }
  }
}

function* artifactsForCreatures(creatures: Creature[]): Iterable<Artifact> {
  for (const creature of creatures) {
    yield* artifactForCreature(creature);
  }
}

function* artifactForCreature(creature: Creature): Iterable<Artifact> {
  yield {
    type: "model-instance-artifact",
    instance: {
      model,
      transform: rigidTransformWith(
        IDENTITY_UNIT_QUATERNION,
        creature.position,
      ),
    },
  };

  yield {
    type: "physics-body-artifact",
    body: {
      dynamics: {
        value: {
          position: creature.position,
          velocity: creature.velocity,
        },
        set: (newState) => {
          creature.position = newState.position;
        },
      },
    },
  };
}
