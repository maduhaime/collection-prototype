type ByType<T, Value> = {
  readonly [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

type Nullable<T> = {
  readonly [P in keyof T as null extends T[P] ? P : never]: T[P];
};

type Optional<T> = {
  readonly [P in keyof T as undefined extends T[P] ? P : never]: T[P];
};
