import { describe, it, expect } from 'vitest'
import { dcCheckItemDuplicate } from '../index/index'
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
    it('dcCheckItemDuplicate expect 0', () => {
        const isCheck = dcCheckItemDuplicate(items, (v) => v.name)
        console.log('isCheck :>> ', isCheck)
        expect(isCheck).toBe(0)
    })
    it('dcCheckItemDuplicate expect 1', () => {
        const newItems = [...items, { id: 7, name: 'Max' }]
        const isCheck = dcCheckItemDuplicate(newItems, (v) => v.name)
        expect(isCheck).toBe(1)
    })

    it('dcCheckItemDuplicate Item = Array<string> expect 1', () => {
        const newItems = ['red', 'blue', 'green', 'green']
        const isCheck = dcCheckItemDuplicate(newItems, (v) => v)
        expect(isCheck).toBe(1)
    })
})
