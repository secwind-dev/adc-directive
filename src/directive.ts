import _ from 'lodash'
import { NestedKeys } from './type'

export function dcDelay(next: () => void, time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(next())
        }, time)
    })
}

export function dcUid(count: number, _character?: string): string {
    let result = ''
    let characters =
        _character ||
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

/**
 * @category  สลับตำแหน่ง array  dcRandomItem(['A','B','C'])
 * @category ผลลัพธ์ ['B','C','A']
 * @example
 *
 * dcRandomItem(['A','B','C'])
 */
export function dcChangePositionItems<T extends Array<any>>(items: T): T {
    for (
        let j, x, i = items.length;
        i;
        j = parseInt(Math.random() * i + ''),
            x = items[--i],
            items[i] = items[j],
            items[j] = x
    );
    return items
}

/*------------------------------Modal & Element---------------------------------*/
/**
 * @category เป็นการ trigger body ให้เกิด overflow hidden
 * @example
 *
 * dcModal(true)
 */
export function dcModal(is_active: boolean = false): void {
    if (typeof window !== 'undefined') {
        const body: HTMLElement = document.body
        if (is_active) {
            body.style.overflow = 'hidden'
            // body?.classList.add('open-modal')
        } else {
            body.style.overflow = 'auto'
            // body?.classList.remove('open-modal')
        }
    }
}

// export function dcLoader(
//     is_active: boolean,
//     title: string = 'รอสักครู่...'
// ): void {
//     const loader = new swLoader(title)
//     if (is_active) {
//         loader.render()
//     } else {
//         loader.stop()
//     }
// }

// export function dcOverlay(_text?: string, _time?: number): void {
//     const text = _text || 'บันทึกสำเร็จ'
//     const time = _time || 1
//     const start = () => {
//         if (typeof window !== 'undefined') {
//             const elRoot: Element | null = document.querySelector(
//                 '#use_overlay_by_secwind'
//             )

//             elRoot?.classList.add('active')
//             let title = elRoot?.querySelector('.overlay-text') as
//                 | HTMLSpanElement
//                 | undefined
//             if (title) {
//                 title.innerHTML = text
//             }
//             setTimeout(() => {
//                 stop()
//             }, time * 1000)
//         }
//     }
//     const stop = () => {
//         if (typeof window !== 'undefined') {
//             const elRoot: Element | null = document.querySelector(
//                 '#use_overlay_by_secwind'
//             )
//             elRoot?.classList.remove('active')
//         }
//     }
//     start()
// }
/*-------------x----------------Modal & Element-----------------x---------------*/

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

/**
 * @category จัด format ตัวเลขให้แสดง comma และ decimal
 * @example
 *
 * dcCurrency(3500.78,2)
 */
export function dcCurrency(
    _number: string | number | null,
    decimal: 0 | 2 = 0
): string {
    let value = Number(_number) || 0
    return value.toLocaleString('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2,
        minimumFractionDigits: decimal,
    })
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
/**
 * @category เสมือน forEach แต่สามารถกำหนด Loop Indexได้
 * @example
 *
 *  index = 5
 *  dcRunProcess(items, (item, index) => {
       console.log(item.name)
    },index)
 */
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

/**
 * @category random จำนวน ระหว่างจำนวน
 * @example
 *
 * dcRandom(1000,9999)
 */
export function dcRandomBetween(_number1: number, _number2: number): number {
    const min = Math.min(_number1, _number2)
    const res = Math.abs(_number1 - _number2)
    const result = Math.round(Math.random() * res + min)
    return result
}

/*-------------x----------------Run of Loop-----------------x---------------*/
