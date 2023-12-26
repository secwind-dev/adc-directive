import { describe, it, expect } from 'vitest'
import { dcCombineText, dcRunProcess } from '../directive'
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

describe('ADC Run of Loop', () => {
    it('dcRunProcess expect (Index)2_(id)3(Index)3_(id)99', () => {
        let res = ''
        dcRunProcess(
            USERS,
            (item, index) => {
                res = res += dcCombineText(
                    ['(Index)' + index, '(id)' + item.id],
                    '_'
                )
            },
            2
        )
        expect(res).toBe('(Index)2_(id)3(Index)3_(id)99')
    })
    it('dcRunProcess expect Total All Salary', () => {
        let val = 0
        dcRunProcess(USERS, (item, index) => {
            val = val += item.salary
        })
        expect(val).toBe(86500)
    })
})
