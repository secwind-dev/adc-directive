export function dcCheckItemDuplicate<T>(
    items: T[],
    next: (arg: T) => any
): number {
    if (!Array.isArray(items)) return -1
    const mapItems = items.map((item) => next(item))
    const uniqueValues = new Set(mapItems)

    return uniqueValues.size !== items.length ? 0 : 1
}
