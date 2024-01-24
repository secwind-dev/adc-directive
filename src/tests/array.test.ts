import { describe, it, expect } from 'vitest'
import { chunkArray, mapArray } from '../fnArray'
import { toCombineText } from '../fnTo'

describe('ADC Array', () => {
    it('mapArray expect [1,2,3,4,5,6]', () => {
        const test = [1, [2, 3, [4, 5, [6]]]]
        const res = mapArray(test).toString()
        expect(res).toBe('1,2,3,4,5,6')
    })
    it('chunkArray expect 3', () => {
        const test = [1, [2, 3, [4, 5, [6]]]]
        const res = chunkArray(mapArray(test), 2).length
        expect(res).toBe(3)
    })
    it('chunkArray expect 2', () => {
        const test = [1, [2, 3, [4, 5, [6]]]]
        const res = chunkArray(mapArray(test), 3).length
        expect(res).toBe(2)
    })
})
