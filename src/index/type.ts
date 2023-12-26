export type CheckValue = 1 | 0 | -1

export type AddType<T, N> = T extends object
    ? {
          [K in keyof T]: T[K] | N
      }
    : T extends string | number
    ? T | N
    : never
