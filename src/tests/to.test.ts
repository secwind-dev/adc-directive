import { describe, it, expect } from 'vitest'
import * as to from '../fnTo'

const res = to.toCombineText(['red', null, 'blue', undefined, 'green'], '@')
describe('ADC Data Transfer', () => {
    it('to.toCombineText expect red@blue@green', () => {
        expect(res).toBe('red@blue@green')
    })

    it('to.toHasKey expect redbluegreen', () => {
        const _res = to.toHasKey(res)
        console.log('_res :>> ', _res)
        expect(_res).toBe('redbluegreen')
    })
    it('to.toCurrency an decimal 2 expect 3,500.00', () => {
        const res = to.toCurrency(3500, 2)
        expect(res).toBe('3,500.00')
    })
    it('to.toCurrency an decimal 0 expect 3,500', () => {
        const res = to.toCurrency(3500, 0)
        expect(res).toBe('3,500')
    })
    it('to.toUid default count = 13 expect length = 13', () => {
        const res = to.toUid()
        expect(res.length).toBe(13)
    })
    it('toDate expect 31/6/2023', () => {
        const res = to.toDate('31/07/2023')
        expect(
            to.toCombineText(
                [res.getDate(), res.getMonth(), res.getFullYear()],
                '/'
            )
        ).toBe('31/6/2023')
    })
    it('toDate expect 31-6-2023', () => {
        const res = to.toDate('31-07-2023')
        expect(
            to.toCombineText(
                [res.getDate(), res.getMonth(), res.getFullYear()],
                '-'
            )
        ).toBe('31-6-2023')
    })
    it('toDate expect 5_11_2023', () => {
        const res = to.toDate('2023-12-05')
        expect(
            to.toCombineText(
                [res.getDate(), res.getMonth(), res.getFullYear()],
                '_'
            )
        ).toBe('5_11_2023')
    })
})
