import _ from 'lodash'
import { CheckValue } from './type'

/**
 * @category Find Array ค้นหาค่าซ้ำ 1>ซ้ำ | 0>ไม่ซ้ำ
 * @example
 * let isCheck = dcCheckDuplicates(items, (v) => v.name)
 * let isCheck = dcCheckDuplicates(item, (v) => dcCombineText([v.id,v.name]))
 * @returns 1 | 0 | -1
 */
export function dcCheckItemDuplicate<T>(
    items: T[],
    next: (arg: T) => any
): CheckValue {
    if (!Array.isArray(items)) return -1
    const mapItems = items.map((item) => next(item))
    const uniqueValues = new Set(mapItems)

    return uniqueValues.size !== items.length ? 1 : 0
}
