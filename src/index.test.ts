import { describe, it, expect } from 'vitest'
import { dcItemIsDuplicate } from '.'
const items = [
    {
        id: 1,
        name: 'Max',
    },
    {
        id: 2,
        name: 'Jam',
    },
    {
        id: 3,
        name: 'Bar',
    },
]

describe('ADC', () => {
    it('dcItemIsDuplicate expect false', () => {
        const isCheck = dcItemIsDuplicate(items, (v) => v.name)
        expect(isCheck).toBe(false)
    })
    it('dcItemIsDuplicate expect true', () => {
        const newItems = [...items, { id: 7, name: 'Max' }]
        const isCheck = dcItemIsDuplicate(newItems, (v) => v.name)
        expect(isCheck).toBe(true)
    })
    it('dcItemIsDuplicate Item = Array<string> expect true', () => {
        const newItems = ['red', 'blue', 'green', 'green']
        const isCheck = dcItemIsDuplicate(newItems, (v) => v)
        expect(isCheck).toBe(true)
    })
})
