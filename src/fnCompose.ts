/*------------------------------Title---------------------------------*/
//เป็น function ในรูปแบบ functional compose 1parameter
/*-------------x----------------Title-----------------x---------------*/

import { addDate, addHour, addMinute, addMonth, dateDiff } from './fnMoment'

type ParamsFn<T extends (...args: any) => any> = Parameters<T> extends [
    d: infer D,
    n: infer N
]
    ? D | N
    : never
type DateOrNumber<T> = T extends Date ? number : Date

type AS = ParamsFn<typeof dateDiff>

export const withDateDiff = (a: Date) => (b: Date) => dateDiff(a, b)

export function withAddMonth<A extends ParamsFn<typeof addMonth>>(a: A) {
    return function <B extends DateOrNumber<A>>(b: B) {
        if (a instanceof Date && typeof b === 'number') return addMonth(a, b)
        else return addMonth(b as Date, +a)
    }
}

export function withAddDate<A extends ParamsFn<typeof addDate>>(a: A) {
    return function <B extends DateOrNumber<A>>(b: B) {
        if (a instanceof Date && typeof b === 'number') return addDate(a, b)
        else return addDate(b as Date, +a)
    }
}
export function withAddHour<A extends ParamsFn<typeof addHour>>(a: A) {
    return function <B extends DateOrNumber<A>>(b: B) {
        if (a instanceof Date && typeof b === 'number') return addHour(a, b)
        else return addHour(b as Date, +a)
    }
}
export function withAddMinute<A extends ParamsFn<typeof addMinute>>(a: A) {
    return function <B extends DateOrNumber<A>>(b: B) {
        if (a instanceof Date && typeof b === 'number') return addMinute(a, b)
        else return addMinute(b as Date, +a)
    }
}
