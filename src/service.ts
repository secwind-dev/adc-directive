import { toRegExp } from './fnTo'

export const isObject = (v: unknown): boolean =>
    typeof v === 'object' && v != null

export const isNumber = (v: unknown): boolean =>
    toRegExp('number').test(String(v))
