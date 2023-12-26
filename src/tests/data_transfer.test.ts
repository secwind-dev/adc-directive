import { describe, it, expect } from 'vitest'
import { dcCombineText, dcHasKey } from '../directive'

const res = dcCombineText(['red', null, 'blue', undefined, 'green'], '@')
describe('ADC Data Transfer', () => {
    it('dcCombineText expect red@blue@green', () => {
        expect(res).toBe('red@blue@green')
    })

    it('dcHasKey expect redbluegreen', () => {
        const _res = dcHasKey(res)
        expect(_res).toBe('redbluegreen')
    })
})
