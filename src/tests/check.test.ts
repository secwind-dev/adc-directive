import { describe, it, expect } from 'vitest'
import * as check from '../fnCheck'
const payload = {
    id: 99,
    name: 'Lisa',
    age: 27,
    salary: 35000,
    likes: ['cat', 'car', 'football'],
}

const USERS = [
    {
        id: 1,
        name: 'Max',
        age: 25,
        salary: 17500,
    },
    {
        id: 2,
        name: 'Jam',
        age: 15,
        salary: 9000,
    },
    {
        id: 3,
        name: 'Bar',
        age: 30,
        salary: 25000,
    },
    {
        id: 99,
        name: 'Lisa',
        age: 27,
        salary: 35000,
    },
]

describe('ADC Check', () => {
    it('check.dcCheckItemDuplicate expect 0', () => {
        const isCheck = check.dcCheckItemDuplicate(USERS, (v) => v.name)
        console.log('isCheck :>> ', isCheck)
        expect(isCheck).toBe(0)
    })
    it('check.dcCheckItemDuplicate expect 1', () => {
        const newItems = [...USERS, { id: 7, name: 'Max' }]
        const isCheck = check.dcCheckItemDuplicate(newItems, (v) => v.name)
        expect(isCheck).toBe(1)
    })

    it('check.dcCheckItemDuplicate Item = Array<string> expect 1', () => {
        const newItems = ['red', 'blue', 'green', 'green']
        const isCheck = check.dcCheckItemDuplicate(newItems, (v) => v)
        expect(isCheck).toBe(1)
    })

    it('check.dcCheckObject Has Key expect 1', () => {
        const res = check.dcCheckObject(payload, ['name'])
        expect(res).toBe(1)
    })
    it('check.dcCheckObject Not Has Key expect 0', () => {
        const res = check.dcCheckObject(payload, ['notName'])
        expect(res).toBe(0)
    })
})
