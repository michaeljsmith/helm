export type Unwrap<T> = T extends [infer Child] ? Child : never;
