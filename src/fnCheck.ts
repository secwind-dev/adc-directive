/*------------------------------Title---------------------------------*/
//เป็น function ที่ใช้สำหรับตรวจสอบและจะ return boolean เท่านั้น

/*-------------x----------------Title-----------------x---------------*/

/**
 * @category Find Array ค้นหาค่าซ้ำ 1>ซ้ำ | 0>ไม่ซ้ำ
 * @example
 * let isCheck = checkDuplicates(items, (v) => v.name)
 * let isCheck = checkDuplicates(item, (v) => toCombineText([v.id,v.name]))
 */
export function checkItemDuplicate<T>(
    items: Readonly<T[]>,
    next: (arg: T) => any
): boolean {
    const mapItems = items.map(next)
    const uniqueValues = new Set(mapItems)

    return uniqueValues.size !== items.length
}
