/**
 * @category แปลงให้ Array ทุกตัวอยู่ในระดับที่เท่ากัน
 * @example
 * mapArray([1, [2, 3, [4, 5, [6]]]])
 * @returns [1,2,3,4,5,6]
 */
export function mapArray(items: Readonly<any[]>): any[] {
    return items.reduce((pre, cur) => {
        if (Array.isArray(cur)) pre.push(...mapArray(cur))
        else pre.push(cur)
        return pre
    }, [])
}

/**
 * @category Array slice
 * @example
 * chunkArray([1,2,3,4,5],2)
 * @returns [[1,2],[3,4],[5]]
 */
export function chunkArray<T>(items: Readonly<T[]>, n: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i <= items.length; i += n) {
        result.push(items.slice(i, i + n))
    }
    return result.filter((v) => v.length)
}
