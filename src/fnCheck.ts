/*------------------------------Title---------------------------------*/
//เป็น function ที่ใช้สำหรับตรวจสอบและจะ return 1 0 -1 เท่านั้น
//    1 = yes | 0 = no | -1 = fail
/*-------------x----------------Title-----------------x---------------*/

import { NestedKeys } from './type'

/**
 * @category Find Array ค้นหาค่าซ้ำ 1>ซ้ำ | 0>ไม่ซ้ำ
 * @example
 * let isCheck = checkDuplicates(items, (v) => v.name)
 * let isCheck = checkDuplicates(item, (v) => toCombineText([v.id,v.name]))
 */
export function checkItemDuplicate<T>(
    items: T[],
    next: (arg: T) => any
): 1 | 0 | -1 {
    if (!Array.isArray(items)) return -1
    const mapItems = items.map((item) => next(item))
    const uniqueValues = new Set(mapItems)

    return uniqueValues.size !== items.length ? 1 : 0
}
