/*------------------------------Title---------------------------------*/
// โหมด To แปลว่า fn จะมีค่า Default ที่ถูก return ออกไปเสมอเป็น type เดียว โดยไม่สนว่าจะจะเกิด error หรือไม่
/*-------------x----------------Title-----------------x---------------*/

/**
 * @category combine Array ให้อยู่ในรูปแบบ string
 * @param prefix join dataตัวละตัวด้วย prefix /default = ' '
 * @example
 *
 * let text = dcToCombineText([brand, model,year],'/')
 */
export function dcToCombineText<
    T extends Array<string | number | null | undefined>
>(items?: T, prefix: string = ' '): string {
    if (!Array.isArray(items)) return ''
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
export function dcToHasKey(text: string | number | null): string {
    if (typeof text != 'string' || typeof text != 'number') return ''
    let str = String(text || '').replace(/[^a-zA-Z0-9_\u0E00-\u0E7F ]/g, '')
    return str.replace(/ /g, '').toLocaleLowerCase()
}

/**
 * @category จัด format ตัวเลขให้แสดง comma และ decimal
 * @example
 *
 * dcToCurrency(3500.78,2)
 */
export function dcToCurrency(
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

/**
 * @category random จำนวน ระหว่างจำนวน
 * @example
 *
 * dcRandom(1000,9999)
 * dcRandom(100) =  random 0 - 100
 */
export function dcToRandomNumber(number1: number, number2: number = 0): number {
    const n1 = typeof number1 == 'number' ? number1 : 0
    const n2 = typeof number2 == 'number' ? number2 : 0
    const min = Math.min(n1, n2)
    const res = Math.abs(n1 - n2)
    const result = Math.round(Math.random() * res + min)
    return result || 0
}

/**
 * @category random word
 * @example
 *
 * dcToUid(8)
 *
 */
export function dcToUid(count: number = 13, _character?: string): string {
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
export function dcToChangePositionArray<T>(items: T[]): T[] {
    if (!Array.isArray(items)) return []
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
