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
        id: 4,
        name: 'Zoo',
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
    it('check.checkItemDuplicate expect false', () => {
        const isCheck = check.checkItemDuplicate(USERS, (v) => v.name)
        expect(isCheck).toBe(false)
    })
    it('check.checkItemDuplicate expect true', () => {
        const newItems = [...USERS, { id: 1, name: 'Max' }]
        const isCheck = check.checkItemDuplicate(newItems, (v) => v.name + v.id)
        expect(isCheck).toBe(true)
    })

    it('check.checkItemDuplicate Item = Array<string> expect true', () => {
        const newItems = ['red', 'blue', 'green', 'green']
        const isCheck = check.checkItemDuplicate(newItems, (v) => v)
        expect(isCheck).toBe(true)
    })
})
