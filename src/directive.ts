import _ from 'lodash'
import { CheckValue, NestedKeys } from './type'

/*------------------------------Check---------------------------------*/
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
/*-------------x----------------Check-----------------x---------------*/

/*------------------------------Validate---------------------------------*/
/**
 * @category ตรวจ key ใน payload เมื่อไม่พบ โปรแกรมจะหยุดการทำงาน throw new Error
 * @param payload  Object ที่ทำการตรวจสอบ
 * @param keys Array ที่ระบุ keyที่ต้องการตรวจสอบ
 * @param msgError  คำหรือ title ที่จะแสดง msgError
 * @example
 *
 * return dcFindPayload(payload, ['id', 'distributor.id'], 'NameTitle')
 */
export function dcFindPayload<T extends object, K extends NestedKeys<T>>(
    payload: T,
    keys: K[] | string[],
    msgError: string = ''
): T | never {
    keys = keys.map((rule) => rule.replace('.length', ''))

    keys.forEach((k) => {
        // console.log('dcNestedKey(payload, [k]) :>> ', dcNestedKey(payload, [k]))
        if (dcNestedKey(payload, [k]) === undefined)
            throw new Error(`!!${msgError}!! (${k as string} is undefined)`)
    })
    return payload
}

/**
 * @category ตรวจ key ใน payload เมื่อไม่พบจะ return undefined
 * @param payload  Object ที่ทำการตรวจสอบ
 * @param _key Array ที่ระบุ key ใช้่ได้แค่ตำแหน่งที่ 0 เท่านั้น
 * @example
 *
 * dcNestedKey(payload, ['saleOrderItems[0]'])
 */
export function dcNestedKey<T extends object, K extends NestedKeys<T>>(
    payload: T,
    _key: K[] | string[]
) {
    const key = _key[0]
    // if (key in payload) {
    //     return payload[key as keyof T]
    // }
    key.replace('.length', '')
    const keys = key
        .replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter((t) => t)
    let value: any = payload
    for (let i = 0; i < keys.length; i++) {
        value = value[keys[i] as keyof T]
        if (value === undefined) {
            break
        }
    }

    return value
}
/*-------------x----------------Validate-----------------x---------------*/
