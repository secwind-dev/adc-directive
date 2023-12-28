/*------------------------------Title---------------------------------*/
// function run of loop
/*-------------x----------------Title-----------------x---------------*/

/**
 * @category เสมือน forEach แต่สามารถกำหนด Loop Indexได้
 * @example
 *
 *  index = 5
 *  dcRunProcess(items, (item, index) => {
       console.log(item.name)
    },index)
 *  dcRunProcess(items, (item, index) => {
       console.log(item.name)
    },[2,3])
 */
export function dcRunProcess<T>(
    items: T[],
    next: (args: T, i?: number) => void,
    _index: number | [number, number] = 0
): void {
    const [index, length] = Array.isArray(_index)
        ? _index
        : [_index, items.length]
    const n = Array.isArray(_index) ? 1 : 0
    if (index < length + n && index < items.length) {
        const data = items[index]
        next(data, index)

        dcRunProcess(items, next, [index + 1, length])
    }
}
