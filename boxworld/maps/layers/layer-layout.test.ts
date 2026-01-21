import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { point2With } from "../../../math/point.js";
import { layer as newLayer } from "./layer-layout.js";

describe("layerLayout", () => {
  it("creates layer with size 1", () => {
    const layerLayout = newLayer(({ position: [x, y] }) => 10 * x + y);
    const layer = layerLayout.construct([1, 2], [1, 1]);
    expect(layer.bounds.center).toEqual(point2With(1.5, 1.5));
    expect(layer.bounds.dimensions).toEqual(aabDimensions2With(0.5, 0.5));
    const height = layer.heightAt(1, 1);
    expect(height).toBe(11);
  });

  it("creates layer with larger size", () => {
    const layerLayout = newLayer(({ position: [x, y] }) => 10 * x + y);
    const layer = layerLayout.construct([1, 2], [2, 2]);
    expect(layer.bounds.center).toEqual(point2With(1, 1));
    expect(layer.bounds.dimensions).toEqual(aabDimensions2With(1, 1));
    expect(layer.heightAt(0, 0)).toBe(0);
    expect(layer.heightAt(0, 1)).toBe(1);
    expect(layer.heightAt(1, 0)).toBe(10);
    expect(layer.heightAt(1, 1)).toBe(11);
  });

  it("catches out-of-bounds lookup", () => {
    const layerLayout = newLayer(({ position: [x, y] }) => 10 * x + y);
    const layer = layerLayout.construct([1, 2], [1, 1]);
    expect(layer.bounds.center).toEqual(point2With(1.5, 1.5));
    expect(layer.bounds.dimensions).toEqual(aabDimensions2With(0.5, 0.5));
    expect(() => layer.heightAt(1, 3)).toThrow();
    expect(() => layer.heightAt(3, 1)).toThrow();
  });
});
