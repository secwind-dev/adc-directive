import { describe, it, expect } from 'vitest'
import * as to from '../fnTo'

const res = to.dcToCombineText(['red', null, 'blue', undefined, 'green'], '@')
describe('ADC Data Transfer', () => {
    it('to.dcToCombineText expect red@blue@green', () => {
        expect(res).toBe('red@blue@green')
    })

    it('to.dcToHasKey expect redbluegreen', () => {
        const _res = to.dcToHasKey(res)
        expect(_res).toBe('redbluegreen')
    })
    it('to.dcToCurrency an decimal 2 expect 3,500.00', () => {
        const res = to.dcToCurrency(3500, 2)
        expect(res).toBe('3,500.00')
    })
    it('to.dcToCurrency an decimal 0 expect 3,500', () => {
        const res = to.dcToCurrency(3500, 0)
        expect(res).toBe('3,500')
    })
    it('to.dcToUid default count = 13 expect length = 13', () => {
        const res = to.dcToUid()
        expect(res.length).toBe(13)
    })
})
