export type CheckValue = 1 | 0 | -1

export type AddType<T, N> = T extends object
    ? {
          [K in keyof T]: T[K] | N
      }
    : T extends string | number
    ? T | N
    : never

export type SwPrefix<T extends string> = T extends '' ? '' : `.${T}`

export type NestedKeys<T> = (
    T extends object
        ? {
              [K in Exclude<keyof T, symbol>]: `${K}${SwPrefix<
                  NestedKeys<T[K]>
              >}`
          }[Exclude<keyof T, symbol>]
        : ''
) extends infer D
    ? Extract<D, string>
    : never
