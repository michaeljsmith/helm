export type Mutable<T> = {
  value: T;
  set: (newValue: T) => void;
};
