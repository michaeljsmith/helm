import { layer as newLayer } from "./layer-layout.js";

describe("layerLayout", () => {
  it("creates layer with size 1", () => {
    const layerLayout = newLayer((x, y) => 10 * x + y);
    const layer = layerLayout.construct([1, 2], [1, 1]);
    expect(layer.origin).toEqual([1, 1]);
    expect(layer.dimensions).toEqual([1, 1]);
    const height = layer.heightAt(1, 1);
    expect(height).toBe(11);
  });

  it("creates layer with larger size", () => {
    const layerLayout = newLayer((x, y) => 10 * x + y);
    const layer = layerLayout.construct([1, 2], [2, 2]);
    expect(layer.origin).toEqual([0, 0]);
    expect(layer.dimensions).toEqual([2, 2]);
    expect(layer.heightAt(0, 0)).toBe(0);
    expect(layer.heightAt(0, 1)).toBe(1);
    expect(layer.heightAt(1, 0)).toBe(10);
    expect(layer.heightAt(1, 1)).toBe(11);
  });

  it("catches out-of-bounds lookup", () => {
    const layerLayout = newLayer((x, y) => 10 * x + y);
    const layer = layerLayout.construct([1, 2], [1, 1]);
    expect(layer.origin).toEqual([1, 1]);
    expect(layer.dimensions).toEqual([1, 1]);
    expect(() => layer.heightAt(1, 2)).toThrow();
    expect(() => layer.heightAt(2, 1)).toThrow();
  });
});
