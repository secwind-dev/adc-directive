export function dcItemIsDuplicate<T>(
    items: T[],
    next: (arg: T) => any
): boolean {
    const mapItems = items.map((item) => next(item))
    const uniqueValues = new Set(mapItems)

    return uniqueValues.size != items.length
}
