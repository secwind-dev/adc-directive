import _ from 'lodash'
import { CheckValue, NestedKeys } from './type'

export function dcDelay(next: () => void, time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(next())
        }, time)
    })
}

/*------------------------------Data Transfer---------------------------------*/
/**
 * @category combine Array ให้อยู่ในรูปแบบ string
 * @param prefix join dataตัวละตัวด้วย prefix /default = ' '
 * @example
 *
 * let text = dcCombineText([brand, model,year],'/')
 */
export function dcCombineText<
    T extends Array<string | number | null | undefined>
>(items: T, prefix: string = ' '): string {
    return items
        .filter((v) => (v && typeof v === 'string') || typeof v === 'number')
        .join(prefix)
}

/**
 * @category ลบ อักขระพิเศษ ช่องว่างออกให้เหลือ text number th . และกลายเป็นตัวเล็ก
 * @example
 *
 * dcHasKey('19-55 77_88*99 aBC') = '195577_8899abc'
 */
export function dcHasKey(text: string | number | null): string {
    let str = String(text || '').replace(/[^a-zA-Z0-9_\u0E00-\u0E7F ]/g, '')
    // let str = String(text || '').replace(/[^a-zA-Z0-9_-]/g, '')

    return str.replace(/ /g, '').toLocaleLowerCase()
}
/*-------------x----------------Data Transfer-----------------x---------------*/

/*------------------------------Check---------------------------------*/
/**
 * @category Find Array ค้นหาค่าซ้ำ 1>ซ้ำ | 0>ไม่ซ้ำ
 * @example
 * let isCheck = dcCheckDuplicates(items, (v) => v.name)
 * let isCheck = dcCheckDuplicates(item, (v) => dcCombineText([v.id,v.name]))
 */
export function dcCheckItemDuplicate<T>(
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
 * dcCheckObject(payload, ['saleOrderItems[0]'])
 */
export function dcCheckObject<T extends object, K extends NestedKeys<T>>(
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
): void {
    keys = keys.map((rule) => rule.replace('.length', ''))

    keys.forEach((k) => {
        if (dcCheckObject(payload, [k]) !== 1)
            throw new Error(`!!${msgError}!! (${k as string} is undefined)`)
    })
}

/*-------------x----------------Validate-----------------x---------------*/

/*------------------------------Run of Loop---------------------------------*/
export function dcRunProcess<T>(
    items: T[],
    next: (args: T, i?: number) => void,
    index: number = 0
): void {
    if (index < items.length) {
        const data = items[index]
        next(data, index)

        dcRunProcess(items, next, index + 1)
    }
}
/*-------------x----------------Run of Loop-----------------x---------------*/
