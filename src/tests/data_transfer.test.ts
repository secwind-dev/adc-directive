import { describe, it, expect } from 'vitest'
import { dcCombineText, dcCurrency, dcHasKey } from '../directive'

const res = dcCombineText(['red', null, 'blue', undefined, 'green'], '@')
describe('ADC Data Transfer', () => {
    it('dcCombineText expect red@blue@green', () => {
        expect(res).toBe('red@blue@green')
    })

    it('dcHasKey expect redbluegreen', () => {
        const _res = dcHasKey(res)
        expect(_res).toBe('redbluegreen')
    })
    it('dcCurrency an decimal 2 expect 3,500.00', () => {
        const res = dcCurrency(3500, 2)
        expect(res).toBe('3,500.00')
    })
    it('dcCurrency an decimal 0 expect 3,500', () => {
        const res = dcCurrency(3500, 0)
        expect(res).toBe('3,500')
    })
})
