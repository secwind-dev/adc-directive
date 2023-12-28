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
