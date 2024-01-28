/*------------------------------Title---------------------------------*/
// function run of loop
/*-------------x----------------Title-----------------x---------------*/

/**
 * @category เสมือน forEach แต่สามารถกำหนด Loop Indexได้
 * @example
 *
 *  index = 5
 *  runProcess(items, (item, index) => {
    },[2,3])
 */
export function runProcess<T>(
    items: T[],
    next: (args: T, i?: number) => void,
    startIndex: number | [number, number] = 0
): void {
    // ทำตาม TOC ประหยัดพื้นที่ JS ไม่เรียก func ตัวเองซ้ำๆ
    return _runProcess(items, next, startIndex)
}

function _runProcess<T>(
    items: T[],
    next: (args: T, i?: number) => void,
    startIndex: number | [number, number] = 0
): void {
    const [index, length] = Array.isArray(startIndex)
        ? startIndex
        : [startIndex, items.length]
    const n = Array.isArray(startIndex) ? 1 : 0
    if (index < length + n && index < items.length) {
        const data = items[index]
        next(data, index)

        _runProcess(items, next, [index + 1, length])
    }
}
