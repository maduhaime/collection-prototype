type ByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

type Nullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P];
};

type Optional<T> = {
  [P in keyof T as undefined extends T[P] ? P : never]: T[P];
};
