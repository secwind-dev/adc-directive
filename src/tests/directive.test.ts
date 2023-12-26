import { describe, it, expect } from 'vitest'
import { dcCheckItemDuplicate } from '../directive'
import { USERS } from '../data'

describe('ADC', () => {
    it('dcCheckItemDuplicate expect 0', () => {
        const isCheck = dcCheckItemDuplicate(USERS, (v) => v.name)
        console.log('isCheck :>> ', isCheck)
        expect(isCheck).toBe(0)
    })
    it('dcCheckItemDuplicate expect 1', () => {
        const newItems = [...USERS, { id: 7, name: 'Max' }]
        const isCheck = dcCheckItemDuplicate(newItems, (v) => v.name)
        expect(isCheck).toBe(1)
    })

    it('dcCheckItemDuplicate Item = Array<string> expect 1', () => {
        const newItems = ['red', 'blue', 'green', 'green']
        const isCheck = dcCheckItemDuplicate(newItems, (v) => v)
        expect(isCheck).toBe(1)
    })
})
