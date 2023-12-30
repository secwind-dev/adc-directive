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

/**
 * @category ตรวจ key ใน payload เมื่อไม่พบจะ return undefined
 * @param payload  Object ที่ทำการตรวจสอบ
 * @param _key Array ที่ระบุ key ใช้่ได้แค่ตำแหน่งที่ 0 เท่านั้น
 * @example
 *
 * checkObject(payload, ['saleOrderItems[0]'])
 */
export function checkObject<T extends object, K extends NestedKeys<T>>(
    payload: T,
    _key: K[] | string[]
): 1 | 0 | -1 {
    if (typeof payload != 'object' || payload == null) return -1
    const key = _key[0]
    key.replace('.length', '')
    const keys = key
        .replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter((t) => t)
    let value: 1 | 0 | -1 = 0
    for (let i = 0; i < keys.length; i++) {
        value = payload[keys[i] as keyof T] ? 1 : 0
        if (value === 0) {
            break
        }
    }

    return value
}
