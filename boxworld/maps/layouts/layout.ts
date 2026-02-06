export type LiteralLayout<T> = {
  type: "literal-layout";
  construct: (
    /**
     * Start location, where z is at the leading edge of the area
     * (heading in negative direction) and x is in the middle.
     */
    start: [x: number, z: number],
    size: [x: number, z: number],
  ) => T;
};

export type ConvertedLayout<Input, Output> = {
  type: "converted-layout";
  convert: (input: Iterable<Input>) => Output;
  input: Layout<Input>;
};

export function converted<Input, Output>(
  convert: (input: Iterable<Input>) => Output,
  input: Layout<Input>,
): Layout<Output> {
  const result: ConvertedLayout<Input, Output> = {
    type: "converted-layout",
    convert,
    input,
  };
  return result as Layout<Output>;
}

export type FixedLayout<T> = {
  type: "fixed-layout";
  size: [x: number | undefined, z: number | undefined];
  contents: Layout<T>;
};

export function fixed<T>(
  size: [x: number | undefined, z: number | undefined],
  contents: Layout<T>,
): FixedLayout<T> {
  return { type: "fixed-layout", size, contents };
}

export type SeriesLayout<T> = {
  type: "series-layout";
  children: Layout<T>[];
};

export function series<T>(children: Layout<T>[]): SeriesLayout<T> {
  return {
    type: "series-layout",
    children,
  };
}

export type Layout<T> =
  | LiteralLayout<T>
  | ConvertedLayout<unknown, T>
  | FixedLayout<T>
  | SeriesLayout<T>;
